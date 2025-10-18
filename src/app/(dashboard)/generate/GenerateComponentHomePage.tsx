"use client";

import { useState, useEffect } from "react";
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
import { Sparkles, Heart, Download, Copy, Loader2, AlertCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useGenerateContent, useGetModels } from "@/api";

export default function GenerateComponentHomePage() {
  const [topic, setTopic] = useState("");
  const [model, setModel] = useState("");

  const { data: modelsData, isLoading: isLoadingModels, error: modelsError } = useGetModels();

  // Set default model when models are loaded
  useEffect(() => {
    if (modelsData?.defaultModel && !model) {
      setModel(modelsData.defaultModel);
    }
  }, [modelsData, model]);

  const availableModels = modelsData?.data || [];

  const { mutate, isPending, data, error } = useGenerateContent({
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Content Generated!", {
          description: "Your AI-powered content is ready to use.",
        });
      }
    },
    onError: (error) => {
      toast.error("Generation Failed", {
        description: error.message || "Failed to generate content. Please try again.",
      });
    },
  });

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast.error("Topic Required", {
        description: "Please enter a topic or keywords to generate content.",
      });
      return;
    }

    mutate({ topic: topic.trim(), model });
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!", {
        description: "Content copied to clipboard.",
      });
    } catch {
      toast.error("Copy Failed", {
        description: "Failed to copy to clipboard.",
      });
    }
  };

  const generatedData = data?.success ? data.data : null;

  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="cursor-pointer" />
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
              <Select
                value={model}
                onValueChange={setModel}
                disabled={isLoadingModels || !!modelsError}
              >
                <SelectTrigger className="bg-card border-border">
                  <SelectValue
                    placeholder={
                      isLoadingModels
                        ? "Loading models..."
                        : modelsError
                          ? "Error loading models"
                          : "Select a model"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((modelOption) => (
                    <SelectItem key={modelOption.id} value={modelOption.id}>
                      {modelOption.name} {modelOption.isDefault && "(Recommended)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {modelsError && <p className="text-xs text-destructive">Failed to load models</p>}
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full gradient-primary hover:opacity-90"
              disabled={!topic || !model || isPending || isLoadingModels}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="glass border-destructive/50">
            <CardContent className="pt-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error.message || "Failed to generate content. Please try again."}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isPending && (
          <Card className="glass glow border-border lg:col-span-1">
            <CardHeader>
              <CardTitle>Generating Content...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Skeleton className="h-20 w-full" />
              </div>
              <Separator />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {generatedData && (
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
                  {generatedData.titles.map((title, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-card/50 hover:bg-card transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm flex-1">{title}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopyToClipboard(title)}
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
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs text-muted-foreground">DESCRIPTION</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => handleCopyToClipboard(generatedData.description)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm leading-relaxed">{generatedData.description}</p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs text-muted-foreground">TAGS</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => handleCopyToClipboard(generatedData.tags.join(", "))}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {generatedData.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleCopyToClipboard(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-xs text-muted-foreground">THUMBNAIL IDEAS</Label>
                <div className="mt-2 space-y-2">
                  {generatedData.thumbnailIdeas.map((idea, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm flex-1">{idea}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopyToClipboard(idea)}
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
                <Label className="text-xs text-muted-foreground">SCRIPT OUTLINE</Label>
                <ol className="mt-2 space-y-2 list-decimal list-inside">
                  {generatedData.scriptOutline.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>Model: {generatedData.aiModel}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7"
                  onClick={() => {
                    const fullContent = `
TITLES:
${generatedData.titles.map((t, i) => `${i + 1}. ${t}`).join("\n")}

DESCRIPTION:
${generatedData.description}

TAGS:
${generatedData.tags.join(", ")}

THUMBNAIL IDEAS:
${generatedData.thumbnailIdeas.map((t, i) => `${i + 1}. ${t}`).join("\n")}

SCRIPT OUTLINE:
${generatedData.scriptOutline.map((t, i) => `${i + 1}. ${t}`).join("\n")}
                                        `.trim();
                    handleCopyToClipboard(fullContent);
                  }}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy All Content
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
