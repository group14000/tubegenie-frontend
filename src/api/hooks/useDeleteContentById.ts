import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { ContentApi } from "../services/content.service";
import {
  DeleteContentByIdResponse,
  DeleteContentByIdErrorResponse,
} from "../schemas/content.schema";

type UseDeleteContentByIdOptions = Omit<
  UseMutationOptions<DeleteContentByIdResponse, Error, string>,
  "mutationFn"
>;

/**
 * Custom hook to delete content by ID using TanStack Query
 * Automatically handles Clerk authentication token
 */
export function useDeleteContentById(options?: UseDeleteContentByIdOptions) {
  const { getToken } = useAuth();

  return useMutation<DeleteContentByIdResponse, Error, string>({
    mutationFn: async (id: string) => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await ContentApi.deleteContentById(id, token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as DeleteContentByIdErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response;
    },
    ...options,
  });
}
