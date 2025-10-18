import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { HistoryApi } from "../services/history.service";
import {
  GetContentHistoryRequest,
  GetContentHistoryErrorResponse,
  GetContentHistorySuccessResponse,
} from "../schemas/history.schema";

type UseGetContentHistoryOptions = {
  limit?: number;
  enabled?: boolean;
} & Omit<
  UseQueryOptions<GetContentHistorySuccessResponse, Error, GetContentHistorySuccessResponse>,
  "queryKey" | "queryFn"
>;

/**
 * Custom hook to fetch content history using TanStack Query
 * Automatically handles Clerk authentication token
 * @param options - Optional configuration including limit (default: 20)
 */
export function useGetContentHistory(options?: UseGetContentHistoryOptions) {
  const { getToken } = useAuth();
  const { limit, enabled = true, ...queryOptions } = options || {};

  return useQuery<GetContentHistorySuccessResponse, Error>({
    queryKey: ["contentHistory", limit],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const params: GetContentHistoryRequest = limit ? { limit } : {};
      const response = await HistoryApi.getContentHistory(params, token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as GetContentHistoryErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response as GetContentHistorySuccessResponse;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...queryOptions,
  });
}
