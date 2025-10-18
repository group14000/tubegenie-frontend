import { apiClient } from '../client/apiClient';
import {
  GenerateContentRequest,
  GenerateContentResponse,
  generateContentRequestSchema,
  generateContentResponseSchema,
} from '../schemas/content.schema';

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
      const response = await apiClient.getClient().post<GenerateContentResponse>(
        '/api/content/generate',
        validatedData
      );

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
}
