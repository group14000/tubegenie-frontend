import { apiClient } from "../client/apiClient";
import {
  GetContentHistoryRequest,
  GetContentHistoryResponse,
  getContentHistoryRequestSchema,
  getContentHistoryResponseSchema,
} from "../schemas/history.schema";

export class HistoryApi {
  /**
   * Fetch content history with optional limit
   * @param params - Optional parameters including limit (default: 20)
   * @param token - Clerk authentication token
   * @returns Promise with the content history response
   */
  static async getContentHistory(
    params: GetContentHistoryRequest = {},
    token: string
  ): Promise<GetContentHistoryResponse> {
    // Validate request parameters
    const validatedParams = getContentHistoryRequestSchema.parse(params);

    // Set auth token
    apiClient.setAuthToken(token);

    try {
      // Build query string only if limit is provided
      const queryParams = new URLSearchParams();
      if (validatedParams?.limit !== undefined) {
        queryParams.append("limit", validatedParams.limit.toString());
      }

      const queryString = queryParams.toString();
      const url = `/api/content/history${queryString ? `?${queryString}` : ""}`;

      const response = await apiClient.getClient().get<GetContentHistoryResponse>(url);

      // Validate response data
      const validatedResponse = getContentHistoryResponseSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      // Handle validation or network errors
      if (error instanceof Error) {
        throw new Error(`Failed to fetch content history: ${error.message}`);
      }
      throw error;
    } finally {
      // Clean up auth token
      apiClient.removeAuthToken();
    }
  }
}
