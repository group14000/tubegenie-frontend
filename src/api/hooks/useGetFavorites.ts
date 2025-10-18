import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { ContentApi } from "../services/content.service";
import { GetFavoritesErrorResponse, GetFavoritesSuccessResponse } from "../schemas/content.schema";

type UseGetFavoritesOptions = {
  enabled?: boolean;
} & Omit<
  UseQueryOptions<GetFavoritesSuccessResponse, Error, GetFavoritesSuccessResponse>,
  "queryKey" | "queryFn"
>;

/**
 * Custom hook to fetch user's favorite content using TanStack Query
 * Automatically handles Clerk authentication token
 */
export function useGetFavorites(options?: UseGetFavoritesOptions) {
  const { getToken } = useAuth();
  const { enabled = true, ...queryOptions } = options || {};

  return useQuery<GetFavoritesSuccessResponse, Error>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await ContentApi.getFavorites(token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as GetFavoritesErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response as GetFavoritesSuccessResponse;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...queryOptions,
  });
}
