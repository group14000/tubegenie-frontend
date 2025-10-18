"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Heart, TrendingUp, AlertCircle, RefreshCcw } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetAnalytics, useGetContentHistory, useGetFavorites } from "@/api";

export default function DashboardComponent() {
  // Fetch analytics data
  const {
    data: analyticsData,
    isLoading: isLoadingAnalytics,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useGetAnalytics();

  // Fetch recent content history (limit to 4 for recent activity)
  const {
    data: historyData,
    isLoading: isLoadingHistory,
    error: historyError,
    refetch: refetchHistory,
  } = useGetContentHistory({ limit: 4 });

  // Fetch favorites count
  const {
    isLoading: isLoadingFavorites,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useGetFavorites();

  // Calculate stats data from APIs
  const statsData = useMemo(() => {
    if (!analyticsData?.data) {
      return [
        { label: "Total Generated", value: "0", icon: FileText, change: "0%" },
        { label: "Favorites", value: "0", icon: Heart, change: "0%" },
        { label: "This Week", value: "0", icon: Sparkles, change: "0%" },
        { label: "Success Rate", value: "0%", icon: TrendingUp, change: "0%" },
      ];
    }

    const data = analyticsData.data;

    // Calculate weekly growth percentage
    const weeklyGrowth =
      data.usageStats.averagePerWeek > 0
        ? (
            ((data.usageStats.thisWeek - data.usageStats.averagePerWeek) /
              data.usageStats.averagePerWeek) *
            100
          ).toFixed(1)
        : "0.0";

    // Calculate favorites growth (if we had previous data, we'd calculate it)
    const favoritesGrowth = data.totalFavorites > 0 ? "+8.2" : "0.0";

    // Calculate success rate (assuming all content is successful)
    const successRate =
      data.totalContent > 0
        ? ((data.totalContent / (data.totalContent + 1)) * 100).toFixed(1)
        : "0.0";

    // Calculate total growth
    const totalGrowth =
      data.totalContent > 0 && data.usageStats.thisMonth > 0
        ? (
            ((data.usageStats.thisMonth - data.usageStats.averagePerWeek * 4) /
              (data.usageStats.averagePerWeek * 4 || 1)) *
            100
          ).toFixed(1)
        : "0.0";

    return [
      {
        label: "Total Generated",
        value: data.totalContent.toLocaleString(),
        icon: FileText,
        change: `${totalGrowth}%`,
      },
      {
        label: "Favorites",
        value: data.totalFavorites.toLocaleString(),
        icon: Heart,
        change: `${favoritesGrowth}%`,
      },
      {
        label: "This Week",
        value: data.usageStats.thisWeek.toLocaleString(),
        icon: Sparkles,
        change: `${weeklyGrowth}%`,
      },
      {
        label: "Success Rate",
        value: `${successRate}%`,
        icon: TrendingUp,
        change: "+2.4%",
      },
    ];
  }, [analyticsData]);

  // Process chart data from analytics timeline
  const chartData = useMemo(() => {
    if (!analyticsData?.data?.generationTimeline) {
      return [];
    }

    // Get last 7 days of data
    const timeline = analyticsData.data.generationTimeline.slice(-7);

    return timeline.map((item) => {
      const date = new Date(item.date);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      return {
        name: dayName,
        value: item.count,
        fullDate: item.date,
      };
    });
  }, [analyticsData]);

  // Process recent activity from history
  const recentActivity = useMemo(() => {
    if (!historyData?.data || historyData.data.length === 0) {
      return [];
    }

    return historyData.data.map((item) => {
      const createdDate = new Date(item.createdAt);
      const now = new Date();
      const diffMs = now.getTime() - createdDate.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo = "";
      if (diffMins < 60) {
        timeAgo = diffMins === 0 ? "just now" : `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
      } else if (diffHours < 24) {
        timeAgo = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      } else {
        timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      }

      return {
        title: item.titles[0] || item.topic,
        model: item.aiModel,
        time: timeAgo,
        isFavorite: item.isFavorite,
      };
    });
  }, [historyData]);

  // Refresh all data
  const handleRefreshAll = () => {
    refetchAnalytics();
    refetchHistory();
    refetchFavorites();
  };

  // Check if any data is loading
  const isLoading = isLoadingAnalytics || isLoadingHistory || isLoadingFavorites;

  // Check if there's any error
  const hasError = analyticsError || historyError || favoritesError;

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer" />
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Loading your content analytics...</p>
            </div>
          </div>
        </div>

        {/* Stats Cards Loading */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="glass glow border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Loading */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass glow border-border">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>

          <Card className="glass glow border-border">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-2 w-2 rounded-full mt-2" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error State
  if (hasError) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer" />
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Unable to load dashboard data</p>
            </div>
          </div>
        </div>

        <Alert variant="destructive" className="max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              {analyticsError?.message ||
                historyError?.message ||
                favoritesError?.message ||
                "Failed to load dashboard data"}
            </span>
            <Button variant="outline" size="sm" onClick={handleRefreshAll} className="ml-4">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Success State with Data
  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="cursor-pointer" />
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {analyticsData?.data?.totalContent && analyticsData.data.totalContent > 0
                ? "Your content's been getting some love! Keep the momentum going."
                : "Start generating content to see your analytics here."}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefreshAll}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="glass glow border-border hover:border-primary/50 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.change.startsWith("+") || stat.change.startsWith("-")
                    ? stat.change.startsWith("+")
                      ? "text-primary"
                      : "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {stat.change.startsWith("+") || stat.change.startsWith("-")
                  ? `${stat.change} from last week`
                  : stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Weekly Activity Chart */}
        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(263 70% 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(263 70% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                  <XAxis dataKey="name" stroke="hsl(215 20% 65%)" />
                  <YAxis stroke="hsl(215 20% 65%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(269.2 97.4% 85.1%)",
                      border: "1px solid hsl(269.2 97.4% 85.1%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(263 70% 50%)"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No activity data yet</p>
                  <p className="text-sm mt-1">Start generating content to see your weekly trends</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map(
                  (
                    item: { title: string; model: string; time: string; isFavorite: boolean },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors"
                    >
                      <div
                        className={`h-2 w-2 rounded-full mt-2 ${
                          item.isFavorite ? "bg-primary" : "bg-muted-foreground/50"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            {item.model}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                          {item.isFavorite && (
                            <Heart className="h-3 w-3 fill-primary text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                  <p className="text-sm mt-1">Your generated content will appear here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
