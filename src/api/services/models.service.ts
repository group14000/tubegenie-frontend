import { apiClient } from "../client/apiClient";
import { GetModelsResponse, getModelsResponseSchema } from "../schemas/models.schema";

export class ModelsApi {
  /**
   * Get available AI models
   * @param token - Clerk authentication token
   * @returns Promise with the models response
   */
  static async getModels(token: string): Promise<GetModelsResponse> {
    // Set auth token
    apiClient.setAuthToken(token);

    try {
      const response = await apiClient.getClient().get<GetModelsResponse>("/api/content/models");

      // Validate response data
      const validatedResponse = getModelsResponseSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      // Handle validation or network errors
      if (error instanceof Error) {
        throw new Error(`Failed to fetch models: ${error.message}`);
      }
      throw error;
    } finally {
      // Clean up auth token
      apiClient.removeAuthToken();
    }
  }
}
