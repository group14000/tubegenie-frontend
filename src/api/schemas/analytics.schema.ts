import { z } from "zod";

// Analytics Data Schemas
export const contentByModelSchema = z.object({
  modelId: z.string(),
  modelName: z.string(),
  count: z.number(),
  percentage: z.number(),
});

export const topTopicSchema = z.object({
  topic: z.string(),
  count: z.number(),
  lastGenerated: z.string(),
});

export const generationTimelineSchema = z.object({
  date: z.string(),
  count: z.number(),
});

export const recentActivitySchema = z.object({
  contentId: z.string(),
  topic: z.string(),
  createdAt: z.string(),
  aiModel: z.string(),
  isFavorite: z.boolean(),
});

export const usageStatsSchema = z.object({
  thisWeek: z.number(),
  thisMonth: z.number(),
  allTime: z.number(),
  averagePerWeek: z.number(),
});

export const tagCloudSchema = z.object({
  tag: z.string(),
  count: z.number(),
});

export const analyticsDataSchema = z.object({
  totalContent: z.number(),
  totalFavorites: z.number(),
  contentByModel: z.array(contentByModelSchema),
  topTopics: z.array(topTopicSchema),
  generationTimeline: z.array(generationTimelineSchema),
  recentActivity: z.array(recentActivitySchema),
  usageStats: usageStatsSchema,
  tagCloud: z.array(tagCloudSchema),
});

export type ContentByModel = z.infer<typeof contentByModelSchema>;
export type TopTopic = z.infer<typeof topTopicSchema>;
export type GenerationTimeline = z.infer<typeof generationTimelineSchema>;
export type RecentActivity = z.infer<typeof recentActivitySchema>;
export type UsageStats = z.infer<typeof usageStatsSchema>;
export type TagCloud = z.infer<typeof tagCloudSchema>;
export type AnalyticsData = z.infer<typeof analyticsDataSchema>;

// Success Response Schema
export const getAnalyticsSuccessSchema = z.object({
  success: z.literal(true),
  data: analyticsDataSchema,
});

export type GetAnalyticsSuccessResponse = z.infer<typeof getAnalyticsSuccessSchema>;

// Error Response Schema
export const getAnalyticsErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export type GetAnalyticsErrorResponse = z.infer<typeof getAnalyticsErrorSchema>;

// Union Response Schema
export const getAnalyticsResponseSchema = z.union([
  getAnalyticsSuccessSchema,
  getAnalyticsErrorSchema,
]);

export type GetAnalyticsResponse = z.infer<typeof getAnalyticsResponseSchema>;
