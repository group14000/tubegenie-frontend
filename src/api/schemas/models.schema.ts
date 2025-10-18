import { z } from "zod";

// Model Schema
export const aiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
  isDefault: z.boolean(),
});

export type AIModel = z.infer<typeof aiModelSchema>;

// Success Response Schema
export const getModelsSuccessSchema = z.object({
  success: z.literal(true),
  data: z.array(aiModelSchema),
  defaultModel: z.string(),
});

export type GetModelsSuccessResponse = z.infer<typeof getModelsSuccessSchema>;

// Error Response Schema
export const getModelsErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type GetModelsErrorResponse = z.infer<typeof getModelsErrorSchema>;

// Union Response Schema
export const getModelsResponseSchema = z.union([getModelsSuccessSchema, getModelsErrorSchema]);

export type GetModelsResponse = z.infer<typeof getModelsResponseSchema>;
