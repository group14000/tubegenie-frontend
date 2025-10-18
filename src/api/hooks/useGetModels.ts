import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { ModelsApi } from "../services/models.service";
import { GetModelsSuccessResponse, GetModelsErrorResponse } from "../schemas/models.schema";

type UseGetModelsOptions = Omit<
  UseQueryOptions<GetModelsSuccessResponse, Error, GetModelsSuccessResponse>,
  "queryKey" | "queryFn"
>;

/**
 * Custom hook to fetch available AI models using TanStack Query
 * Automatically handles Clerk authentication token
 * @param options - Optional configuration for the query
 */
export function useGetModels(options?: UseGetModelsOptions) {
  const { getToken } = useAuth();

  return useQuery<GetModelsSuccessResponse, Error>({
    queryKey: ["models"],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await ModelsApi.getModels(token);

      // Check if response indicates an error
      if (!response.success) {
        const errorResponse = response as GetModelsErrorResponse;
        throw new Error(errorResponse.error);
      }

      return response;
    },
    ...options,
  });
}
