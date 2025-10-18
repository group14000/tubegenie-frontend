import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { ContentApi } from "../services/content.service";
import {
  ToggleFavoriteContentResponse,
  ToggleFavoriteContentErrorResponse,
} from "../schemas/content.schema";

type UseToggleFavoriteContentOptions = Omit<
  UseMutationOptions<ToggleFavoriteContentResponse, Error, string>,
  "mutationFn"
>;

/**
 * Custom hook to toggle favorite status for content by ID using TanStack Query
 * Automatically handles Clerk authentication token
 */
export function useToggleFavoriteContent(options?: UseToggleFavoriteContentOptions) {
  const { getToken } = useAuth();

  return useMutation<ToggleFavoriteContentResponse, Error, string>({
    mutationFn: async (id: string) => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await ContentApi.toggleFavoriteContent(id, token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as ToggleFavoriteContentErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response;
    },
    ...options,
  });
}
