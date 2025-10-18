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

const modelData = [
  { name: "DeepSeek", value: 65 },
  { name: "Gemini", value: 25 },
  { name: "GLM", value: 10 },
];

const COLORS = ["hsl(263 70% 50%)", "hsl(200 70% 50%)", "hsl(142 71% 45%)"];

const timelineData = [
  { month: "Aug", count: 45 },
  { month: "Sep", count: 52 },
  { month: "Oct", count: 61 },
  { month: "Nov", count: 73 },
  { month: "Dec", count: 89 },
  { month: "Jan", count: 104 },
];

const topTags = [
  { tag: "YouTube Growth", count: 156 },
  { tag: "Content Strategy", count: 134 },
  { tag: "Video Marketing", count: 98 },
  { tag: "SEO", count: 87 },
  { tag: "Engagement", count: 76 },
];

export default function AnalyticsHomePage() {
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Content by Model</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={modelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                    backgroundColor: "hsl(217 33% 17%)",
                    border: "1px solid hsl(217 33% 22%)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Generation Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                <XAxis dataKey="month" stroke="hsl(215 20% 65%)" />
                <YAxis stroke="hsl(215 20% 65%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(217 33% 17%)",
                    border: "1px solid hsl(217 33% 22%)",
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
          </CardContent>
        </Card>

        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Top Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topTags} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                <XAxis type="number" stroke="hsl(215 20% 65%)" />
                <YAxis dataKey="tag" type="category" stroke="hsl(215 20% 65%)" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(217 33% 17%)",
                    border: "1px solid hsl(217 33% 22%)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(263 70% 50%)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass glow border-border">
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card/50">
                <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  1,284
                </div>
                <p className="text-sm text-muted-foreground">Total Content Generated</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50">
                <div className="text-2xl font-bold gradient-accent bg-clip-text text-transparent">
                  47
                </div>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50">
                <div className="text-2xl font-bold text-chart-3">94.2%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
