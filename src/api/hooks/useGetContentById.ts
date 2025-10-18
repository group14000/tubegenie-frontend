import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { ContentApi } from "../services/content.service";
import { GetContentByIdErrorResponse, GetContentByIdData } from "../schemas/content.schema";

type UseGetContentByIdOptions = Omit<
  UseQueryOptions<GetContentByIdData, Error, GetContentByIdData>,
  "queryKey" | "queryFn"
>;

/**
 * Custom hook to get content by ID using TanStack Query
 * Automatically handles Clerk authentication token
 */
export function useGetContentById(id: string, options?: UseGetContentByIdOptions) {
  const { getToken } = useAuth();

  return useQuery<GetContentByIdData, Error>({
    queryKey: ["content", id],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await ContentApi.getContentById(id, token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as GetContentByIdErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response.data;
    },
    enabled: !!id && !!getToken, // Only run query if id is provided and user is authenticated
    ...options,
  });
}
