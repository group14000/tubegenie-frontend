import { apiClient } from "../client/apiClient";
import {
  GenerateContentRequest,
  GenerateContentResponse,
  generateContentRequestSchema,
  generateContentResponseSchema,
  GetContentByIdResponse,
  getContentByIdResponseSchema,
  DeleteContentByIdResponse,
  deleteContentByIdResponseSchema,
} from "../schemas/content.schema";

export class ContentApi {
  /**
   * Generate content based on topic and AI model
   * @param data - The request payload containing topic and model
   * @param token - Clerk authentication token
   * @returns Promise with the generated content response
   */
  static async generateContent(
    data: GenerateContentRequest,
    token: string
  ): Promise<GenerateContentResponse> {
    // Validate request data
    const validatedData = generateContentRequestSchema.parse(data);

    // Set auth token
    apiClient.setAuthToken(token);

    try {
      const response = await apiClient
        .getClient()
        .post<GenerateContentResponse>("/api/content/generate", validatedData);

      // Validate response data
      const validatedResponse = generateContentResponseSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      // Handle validation or network errors
      if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
      }
      throw error;
    } finally {
      // Clean up auth token
      apiClient.removeAuthToken();
    }
  }

  /**
   * Get content by ID
   * @param id - The content ID to fetch
   * @param token - Clerk authentication token
   * @returns Promise with the content data response
   */
  static async getContentById(id: string, token: string): Promise<GetContentByIdResponse> {
    // Set auth token
    apiClient.setAuthToken(token);

    try {
      const response = await apiClient
        .getClient()
        .get<GetContentByIdResponse>(`/api/content/${id}`);

      // Validate response data
      const validatedResponse = getContentByIdResponseSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      // Handle validation or network errors
      if (error instanceof Error) {
        throw new Error(`Failed to fetch content: ${error.message}`);
      }
      throw error;
    } finally {
      // Clean up auth token
      apiClient.removeAuthToken();
    }
  }

  /**
   * Delete content by ID
   * @param id - The content ID to delete
   * @param token - Clerk authentication token
   * @returns Promise with the delete response
   */
  static async deleteContentById(id: string, token: string): Promise<DeleteContentByIdResponse> {
    // Set auth token
    apiClient.setAuthToken(token);

    try {
      const response = await apiClient
        .getClient()
        .delete<DeleteContentByIdResponse>(`/api/content/${id}`);

      // Validate response data
      const validatedResponse = deleteContentByIdResponseSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      // Handle validation or network errors
      if (error instanceof Error) {
        throw new Error(`Failed to delete content: ${error.message}`);
      }
      throw error;
    } finally {
      // Clean up auth token
      apiClient.removeAuthToken();
    }
  }
}
