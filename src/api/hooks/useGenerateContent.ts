import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { ContentApi } from "../services/content.service";
import {
  GenerateContentRequest,
  GenerateContentResponse,
  GenerateContentErrorResponse,
} from "../schemas/content.schema";

type UseGenerateContentOptions = Omit<
  UseMutationOptions<GenerateContentResponse, Error, GenerateContentRequest>,
  "mutationFn"
>;

/**
 * Custom hook to generate content using TanStack Query
 * Automatically handles Clerk authentication token
 */
export function useGenerateContent(options?: UseGenerateContentOptions) {
  const { getToken } = useAuth();

  return useMutation<GenerateContentResponse, Error, GenerateContentRequest>({
    mutationFn: async (data: GenerateContentRequest) => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await ContentApi.generateContent(data, token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as GenerateContentErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response;
    },
    ...options,
  });
}
