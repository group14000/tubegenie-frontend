"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Heart, Download, Eye, Trash2, Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useGetFavorites,
  useGetContentById,
  useDeleteContentById,
  useToggleFavoriteContent,
  GetContentByIdData,
} from "@/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function FavoritesHomePage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useGetFavorites();
  const [selectedContent, setSelectedContent] = useState<GetContentByIdData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);

  // Get content by ID hook
  const { data: contentDetailsData, isLoading: isLoadingDetails } = useGetContentById(
    selectedContent?._id || "",
    {
      enabled: !!selectedContent?._id && isViewDialogOpen,
    }
  );

  // Delete content mutation
  const { mutate: deleteContent, isPending: isDeleting } = useDeleteContentById({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Content removed from favorites!");
        setIsDeleteDialogOpen(false);
        setContentToDelete(null);
        // Invalidate favorites query to refresh the list
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete content");
    },
  });

  // Toggle favorite mutation (to unfavorite)
  const { mutate: toggleFavorite, isPending: isTogglingFavorite } = useToggleFavoriteContent({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Removed from favorites!");
        // Invalidate favorites query to refresh the list
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update favorite status");
    },
  });

  // Handle view content
  const handleViewContent = (content: GetContentByIdData) => {
    setSelectedContent(content);
    setIsViewDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (contentId: string) => {
    setContentToDelete(contentId);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (contentToDelete) {
      deleteContent(contentToDelete);
    }
  };

  // Handle download content
  const handleDownload = (content: GetContentByIdData) => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${content.topic.replace(/\s+/g, "-")}-content.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded successfully!");
  };

  // Handle unfavorite
  const handleUnfavorite = (contentId: string) => {
    toggleFavorite(contentId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading State
  if (isLoading) {
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
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass glow border-border">
              <CardHeader>
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-6 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-1">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
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
            <h1 className="text-3xl font-bold">Favorites</h1>
            <p className="text-muted-foreground">Your bookmarked content for quick access.</p>
          </div>
        </div>

        <Alert variant="destructive" className="max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load favorites: {error.message}</span>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-4">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Empty State
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Favorites</h1>
            <p className="text-muted-foreground">Your bookmarked content for quick access.</p>
          </div>
        </div>

        <Card className="glass glow border-border max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start adding content to your favorites by clicking the heart icon on any content item.
            </p>
            <Button asChild>
              <a href="/history">Browse Content History</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success State with Data
  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Favorites</h1>
          <p className="text-muted-foreground">
            Your bookmarked content for quick access. ({data.count}{" "}
            {data.count === 1 ? "item" : "items"})
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((item) => (
          <Card
            key={item._id}
            className="glass glow border-border hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="mb-2">
                  {item.aiModel}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleUnfavorite(item._id)}
                  disabled={isTogglingFavorite}
                >
                  {isTogglingFavorite ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Heart className="h-4 w-4 fill-primary text-primary" />
                  )}
                </Button>
              </div>
              <CardTitle className="text-lg line-clamp-2">{item.titles[0]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, 3).map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.tags.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleViewContent(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleDownload(item)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleDeleteClick(item._id)}
                    disabled={isDeleting}
                  >
                    {isDeleting && contentToDelete === item._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Content Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Content Details</DialogTitle>
            <DialogDescription>
              {selectedContent?.topic && `Topic: ${selectedContent.topic}`}
            </DialogDescription>
          </DialogHeader>

          {isLoadingDetails ? (
            <div className="space-y-4 py-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : contentDetailsData ? (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                {/* Title Variations */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    Title Variations
                    <Badge variant="secondary">{contentDetailsData.titles.length}</Badge>
                  </h3>
                  <div className="space-y-2">
                    {contentDetailsData.titles.map((title: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/50 rounded-md text-sm hover:bg-muted transition-colors"
                      >
                        {idx + 1}. {title}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {contentDetailsData.description}
                  </p>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    Tags
                    <Badge variant="secondary">{contentDetailsData.tags.length}</Badge>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {contentDetailsData.tags.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Thumbnail Ideas */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    Thumbnail Ideas
                    <Badge variant="secondary">{contentDetailsData.thumbnailIdeas.length}</Badge>
                  </h3>
                  <div className="space-y-2">
                    {contentDetailsData.thumbnailIdeas.map((idea: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/50 rounded-md text-sm hover:bg-muted transition-colors"
                      >
                        💡 {idea}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Script Outline */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    Script Outline
                    <Badge variant="secondary">
                      {contentDetailsData.scriptOutline.length} sections
                    </Badge>
                  </h3>
                  <div className="space-y-2">
                    {contentDetailsData.scriptOutline.map((section: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/50 rounded-md text-sm hover:bg-muted transition-colors"
                      >
                        {idx + 1}. {section}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">AI Model:</span> {contentDetailsData.aiModel}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {formatDate(contentDetailsData.createdAt)}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {formatDate(contentDetailsData.updatedAt)}
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load content details</AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this content. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
