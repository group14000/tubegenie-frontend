import { z } from 'zod';

// Request Schema
export const generateContentRequestSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  model: z.string().min(1, 'Model is required'),
});

export type GenerateContentRequest = z.infer<typeof generateContentRequestSchema>;

// Response Schemas
export const generateContentDataSchema = z.object({
  titles: z.array(z.string()),
  description: z.string(),
  tags: z.array(z.string()),
  thumbnailIdeas: z.array(z.string()),
  scriptOutline: z.array(z.string()),
  aiModel: z.string(),
});

export const generateContentSuccessSchema = z.object({
  success: z.literal(true),
  data: generateContentDataSchema,
});

export const generateContentErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  path: z.string().optional(),
});

export const generateContentResponseSchema = z.union([
  generateContentSuccessSchema,
  generateContentErrorSchema,
]);

export type GenerateContentData = z.infer<typeof generateContentDataSchema>;
export type GenerateContentSuccessResponse = z.infer<typeof generateContentSuccessSchema>;
export type GenerateContentErrorResponse = z.infer<typeof generateContentErrorSchema>;
export type GenerateContentResponse = z.infer<typeof generateContentResponseSchema>;
