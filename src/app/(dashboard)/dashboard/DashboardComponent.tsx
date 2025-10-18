"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Heart, TrendingUp } from "lucide-react";
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

const statsData = [
  { label: "Total Generated", value: "1,284", icon: FileText, change: "+12.5%" },
  { label: "Favorites", value: "156", icon: Heart, change: "+8.2%" },
  { label: "This Week", value: "47", icon: Sparkles, change: "+23.1%" },
  { label: "Success Rate", value: "94.2%", icon: TrendingUp, change: "+2.4%" },
];

const chartData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 25 },
  { name: "Fri", value: 22 },
  { name: "Sat", value: 18 },
  { name: "Sun", value: 20 },
];

const recentActivity = [
  { title: "10 Tips for Better YouTube Thumbnails", model: "DeepSeek", time: "2 hours ago" },
  { title: "How to Grow Your Channel in 2024", model: "Gemini", time: "5 hours ago" },
  { title: "Ultimate Guide to Video SEO", model: "DeepSeek", time: "1 day ago" },
  { title: "Content Calendar Planning Strategies", model: "GLM", time: "1 day ago" },
];
export default function DashboardComponent() {
  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="cursor-pointer" />
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Your content&apos;s been getting some love! Keep the momentum going.
            </p>
          </div>
        </div>
      </div>

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
              <p className="text-xs text-primary">{stat.change} from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
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
                    backgroundColor: "hsl(217 33% 17%)",
                    border: "1px solid hsl(217 33% 22%)",
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
          </CardContent>
        </Card>

        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        {item.model}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
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
