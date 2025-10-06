'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sparkles, Heart, Download, Copy } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";


export default function GenerateComponentHomePage() {
    const [topic, setTopic] = useState("");
    const [model, setModel] = useState("deepseek");
    const [generated, setGenerated] = useState(false);
    const { toast } = useToast();

    const handleGenerate = () => {
        setGenerated(true);
        toast({
            title: "Content Generated!",
            description: "Your AI-powered content is ready.",
        });
    };

    return (
        <div className="min-h-screen p-6 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="cursor-pointer"/>
                <div>
                    <h1 className="text-3xl font-bold">Generate Content</h1>
                    <p className="text-muted-foreground">Create AI-powered YouTube content in seconds.</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="glass glow border-border">
                    <CardHeader>
                        <CardTitle>Content Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="topic">Topic or Keywords</Label>
                            <Input
                                id="topic"
                                placeholder="Enter your video topic or keywords..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="bg-card border-border"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="model">AI Model</Label>
                            <Select value={model} onValueChange={setModel}>
                                <SelectTrigger className="bg-card border-border">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="deepseek">DeepSeek (Recommended)</SelectItem>
                                    <SelectItem value="gemini">Gemini Pro</SelectItem>
                                    <SelectItem value="glm">GLM-4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            className="w-full gradient-primary hover:opacity-90"
                            disabled={!topic}
                        >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Content
                        </Button>
                    </CardContent>
                </Card>

                {generated && (
                    <Card className="glass glow border-border lg:col-span-1">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Generated Content</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-xs text-muted-foreground">TITLE SUGGESTIONS</Label>
                                <div className="mt-2 space-y-2">
                                    {[
                                        "10 Proven Strategies to Boost Your Channel Growth",
                                        "The Ultimate Guide to Creating Viral Content",
                                        "How I Gained 100K Subscribers in 6 Months",
                                    ].map((title, i) => (
                                        <div
                                            key={i}
                                            className="p-3 rounded-lg bg-card/50 hover:bg-card transition-colors cursor-pointer group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <p className="text-sm flex-1">{title}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <Label className="text-xs text-muted-foreground">DESCRIPTION</Label>
                                <p className="mt-2 text-sm leading-relaxed">
                                    Discover the secrets to growing your YouTube channel with proven strategies
                                    that actually work. In this comprehensive guide, we'll cover everything from
                                    content planning to audience engagement...
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <Label className="text-xs text-muted-foreground">TAGS</Label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {["YouTube Growth", "Content Strategy", "Video Marketing", "SEO", "Viral Content"].map(
                                        (tag, i) => (
                                            <Badge key={i} variant="secondary">
                                                {tag}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
