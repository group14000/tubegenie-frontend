'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Eye, Trash2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const favoriteContent = [
    {
        id: 1,
        title: "10 Tips for Better YouTube Thumbnails",
        description: "Learn the art of creating eye-catching thumbnails that boost click-through rates...",
        model: "DeepSeek",
        date: "2024-01-15",
        tags: ["Thumbnails", "Design", "CTR"],
    },
    {
        id: 2,
        title: "Ultimate Guide to Video SEO",
        description: "Master the fundamentals of video SEO to rank higher in search results...",
        model: "DeepSeek",
        date: "2024-01-14",
        tags: ["SEO", "Ranking", "Optimization"],
    },
    {
        id: 3,
        title: "Building a Loyal Community",
        description: "Strategies for fostering engagement and building a dedicated audience...",
        model: "Gemini",
        date: "2024-01-12",
        tags: ["Community", "Engagement", "Growth"],
    },
];

export default function FavoritesHomePage() {
    return (
        <div className="min-h-screen p-6 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                    <h1 className="text-3xl font-bold">Favorites</h1>
                    <p className="text-muted-foreground">Your bookmarked content for quick access.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {favoriteContent.map((item) => (
                    <Card key={item.id} className="glass glow border-border hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <Badge variant="secondary" className="mb-2">
                                    {item.model}
                                </Badge>
                                <Heart className="h-4 w-4 fill-primary text-primary" />
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-border">
                                <span className="text-xs text-muted-foreground">{item.date}</span>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
