"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAnalytics } from "@/api";
import { format, parseISO } from "date-fns";

const COLORS = [
  "hsl(263 70% 50%)",
  "hsl(200 70% 50%)",
  "hsl(142 71% 45%)",
  "hsl(280 70% 50%)",
  "hsl(320 70% 50%)",
];

export default function AnalyticsHomePage() {
  const { data, isLoading, error, refetch, isFetching } = useGetAnalytics();

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="glass glow border-border">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track your content generation insights and trends.
            </p>
          </div>
        </div>

        <Card className="glass border-destructive/50">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Analytics</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
            <Button onClick={() => refetch()} className="mt-4" variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const analytics = data?.data;

  if (!analytics) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track your content generation insights and trends.
            </p>
          </div>
        </div>

        <Card className="glass border-border">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground py-8">No analytics data available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Transform data for charts
  const modelData = analytics.contentByModel.map((model) => ({
    name: model.modelName,
    value: model.count,
    percentage: model.percentage,
  }));

  const timelineData = analytics.generationTimeline.map((item) => ({
    date: format(parseISO(item.date), "MMM dd"),
    count: item.count,
  }));

  const topTags = analytics.tagCloud.slice(0, 5).map((tag) => ({
    tag: tag.tag.length > 15 ? tag.tag.substring(0, 15) + "..." : tag.tag,
    count: tag.count,
  }));

  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track your content generation insights and trends.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? (
            <RefreshCcw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Content by Model</CardTitle>
          </CardHeader>
          <CardContent>
            {modelData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={modelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    style={{
                      fill: "272.1 71.7% 47.1%",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(269.2 97.4% 85.1%)",
                      border: "1px solid hsl(269.2 97.4% 85.1%)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No model data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Generation Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {timelineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                  <XAxis dataKey="date" stroke="hsl(215 20% 65%)" />
                  <YAxis stroke="hsl(215 20% 65%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(269.2 97.4% 85.1%)",
                      border: "1px solid hsl(269.2 97.4% 85.1%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(263 70% 50%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(263 70% 50%)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No timeline data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Top Tags</CardTitle>
          </CardHeader>
          <CardContent>
            {topTags.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTags} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                  <XAxis type="number" stroke="hsl(215 20% 65%)" />
                  <YAxis dataKey="tag" type="category" stroke="hsl(215 20% 65%)" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(269.2 97.4% 85.1%)",
                      border: "1px solid hsl(269.2 97.4% 85.1%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(263 70% 50%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No tag data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card/50">
                <div className="text-2xl font-bold gradient-primary bg-clip-text text-black">
                  {analytics.totalContent.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Total Content Generated</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50">
                <div className="text-2xl font-bold gradient-accent bg-clip-text text-black">
                  {analytics.usageStats.thisWeek}
                </div>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50">
                <div className="text-2xl font-bold text-chart-3">{analytics.totalFavorites}</div>
                <p className="text-sm text-muted-foreground">Total Favorites</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50">
                <div className="text-2xl font-bold text-chart-4">
                  {analytics.usageStats.averagePerWeek}
                </div>
                <p className="text-sm text-muted-foreground">Average per Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
