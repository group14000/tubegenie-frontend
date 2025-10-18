import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { AnalyticsApi } from "../services/analytics.service";
import {
  GetAnalyticsSuccessResponse,
  GetAnalyticsErrorResponse,
} from "../schemas/analytics.schema";

type UseGetAnalyticsOptions = Omit<
  UseQueryOptions<GetAnalyticsSuccessResponse, Error, GetAnalyticsSuccessResponse>,
  "queryKey" | "queryFn"
>;

/**
 * Custom hook to fetch analytics data using TanStack Query
 * Automatically handles Clerk authentication token
 * @param options - Optional configuration for the query
 */
export function useGetAnalytics(options?: UseGetAnalyticsOptions) {
  const { getToken } = useAuth();

  return useQuery<GetAnalyticsSuccessResponse, Error>({
    queryKey: ["analytics"],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await AnalyticsApi.getAnalytics(token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as GetAnalyticsErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response;
    },
    ...options,
  });
}
