import { z } from "zod";

// Request Schema
export const generateContentRequestSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  model: z.string().min(1, "Model is required"),
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

// Get Content by ID Schemas
export const getContentByIdDataSchema = z.object({
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

export const getContentByIdSuccessSchema = z.object({
  success: z.literal(true),
  data: getContentByIdDataSchema,
});

export const getContentByIdErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  path: z.string().optional(),
});

export const getContentByIdResponseSchema = z.union([
  getContentByIdSuccessSchema,
  getContentByIdErrorSchema,
]);

export type GetContentByIdData = z.infer<typeof getContentByIdDataSchema>;
export type GetContentByIdSuccessResponse = z.infer<typeof getContentByIdSuccessSchema>;
export type GetContentByIdErrorResponse = z.infer<typeof getContentByIdErrorSchema>;
export type GetContentByIdResponse = z.infer<typeof getContentByIdResponseSchema>;

// Delete Content Schemas
export const deleteContentByIdSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const deleteContentByIdErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  path: z.string().optional(),
});

export const deleteContentByIdResponseSchema = z.union([
  deleteContentByIdSuccessSchema,
  deleteContentByIdErrorSchema,
]);

export type DeleteContentByIdSuccessResponse = z.infer<typeof deleteContentByIdSuccessSchema>;
export type DeleteContentByIdErrorResponse = z.infer<typeof deleteContentByIdErrorSchema>;
export type DeleteContentByIdResponse = z.infer<typeof deleteContentByIdResponseSchema>;

// Toggle Favorite Schemas
export const toggleFavoriteContentSuccessSchema = z.object({
  success: z.literal(true),
  data: getContentByIdDataSchema,
  message: z.string(),
});

export const toggleFavoriteContentErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  path: z.string().optional(),
});

export const toggleFavoriteContentResponseSchema = z.union([
  toggleFavoriteContentSuccessSchema,
  toggleFavoriteContentErrorSchema,
]);

export type ToggleFavoriteContentSuccessResponse = z.infer<
  typeof toggleFavoriteContentSuccessSchema
>;
export type ToggleFavoriteContentErrorResponse = z.infer<typeof toggleFavoriteContentErrorSchema>;
export type ToggleFavoriteContentResponse = z.infer<typeof toggleFavoriteContentResponseSchema>;

// Get Favorites Schemas
export const getFavoritesDataSchema = z.array(getContentByIdDataSchema);

export const getFavoritesSuccessSchema = z.object({
  success: z.literal(true),
  data: getFavoritesDataSchema,
  count: z.number(),
});

export const getFavoritesErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  path: z.string().optional(),
});

export const getFavoritesResponseSchema = z.union([
  getFavoritesSuccessSchema,
  getFavoritesErrorSchema,
]);

export type GetFavoritesData = z.infer<typeof getFavoritesDataSchema>;
export type GetFavoritesSuccessResponse = z.infer<typeof getFavoritesSuccessSchema>;
export type GetFavoritesErrorResponse = z.infer<typeof getFavoritesErrorSchema>;
export type GetFavoritesResponse = z.infer<typeof getFavoritesResponseSchema>;
