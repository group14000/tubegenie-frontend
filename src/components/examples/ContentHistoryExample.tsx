"use client";

import { useGetContentHistory } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Calendar, Heart, Sparkles } from "lucide-react";
import { format } from "date-fns";

export default function ContentHistoryExample() {
  const { data, isLoading, error, refetch } = useGetContentHistory({
    limit: 20,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  const historyItems = data?.data || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content History</h1>
        <Badge variant="secondary">{historyItems.length} items</Badge>
      </div>

      {historyItems.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No content history found. Generate some content to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {historyItems.map((item) => (
            <Card key={item._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.topic}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(item.createdAt), "PPP")}
                      <span>•</span>
                      <Sparkles className="h-4 w-4" />
                      {item.aiModel.split("/").pop()?.split(":")[0]}
                    </div>
                  </div>
                  {item.isFavorite && <Heart className="h-5 w-5 fill-red-500 text-red-500" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Titles</h4>
                  <ul className="space-y-1">
                    {item.titles.slice(0, 2).map((title, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 5).map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 5} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
