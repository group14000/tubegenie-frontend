import { apiClient } from "../client/apiClient";
import { GetAnalyticsResponse, getAnalyticsResponseSchema } from "../schemas/analytics.schema";

export class AnalyticsApi {
  /**
   * Get analytics data for the user
   * @param token - Clerk authentication token
   * @returns Promise with the analytics response
   */
  static async getAnalytics(token: string): Promise<GetAnalyticsResponse> {
    // Set auth token
    apiClient.setAuthToken(token);

    try {
      const response = await apiClient
        .getClient()
        .get<GetAnalyticsResponse>("/api/content/analytics");

      // Validate response data
      const validatedResponse = getAnalyticsResponseSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      // Handle validation or network errors
      if (error instanceof Error) {
        throw new Error(`Failed to fetch analytics: ${error.message}`);
      }
      throw error;
    } finally {
      // Clean up auth token
      apiClient.removeAuthToken();
    }
  }
}
