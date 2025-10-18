import { z } from "zod";

// Content History Item Schema
export const contentHistoryItemSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  topic: z.string(),
  titles: z.array(z.string()),
  description: z.string(),
  tags: z.array(z.string()),
  thumbnailIdeas: z.array(z.string()),
  scriptOutline: z.array(z.string()),
  isFavorite: z.boolean(),
  aiModel: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type ContentHistoryItem = z.infer<typeof contentHistoryItemSchema>;

// Request Schema
export const getContentHistoryRequestSchema = z
  .object({
    limit: z.number().min(1).max(100).optional(),
  })
  .optional()
  .default({});

export type GetContentHistoryRequest = z.infer<typeof getContentHistoryRequestSchema>;

// Success Response Schema
export const getContentHistorySuccessSchema = z.object({
  success: z.literal(true),
  data: z.array(contentHistoryItemSchema),
});

export type GetContentHistorySuccessResponse = z.infer<typeof getContentHistorySuccessSchema>;

// Error Response Schema
export const getContentHistoryErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type GetContentHistoryErrorResponse = z.infer<typeof getContentHistoryErrorSchema>;

// Union Response Schema
export const getContentHistoryResponseSchema = z.union([
  getContentHistorySuccessSchema,
  getContentHistoryErrorSchema,
]);

export type GetContentHistoryResponse = z.infer<typeof getContentHistoryResponseSchema>;
