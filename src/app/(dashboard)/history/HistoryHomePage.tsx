"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Search,
  Heart,
  Download,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  RefreshCcw,
  Calendar,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useGetContentHistory,
  useGetModels,
  useGetContentById,
  useDeleteContentById,
  useToggleFavoriteContent,
} from "@/api";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function HistoryHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModel, setFilterModel] = useState("all");
  const [limit, setLimit] = useState(20);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedSections, setCopiedSections] = useState<Record<string, boolean>>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<{
    id: string;
    topic: string;
  } | null>(null);

  const { data, isLoading, error, refetch, isFetching } = useGetContentHistory({
    limit,
  });

  const { data: modelsData, isLoading: isLoadingModels } = useGetModels();

  // Fetch content details when a content ID is selected
  const {
    data: contentDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
  } = useGetContentById(selectedContentId || "", {
    enabled: !!selectedContentId && isDialogOpen,
  });

  // Delete content mutation
  const deleteMutation = useDeleteContentById({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Content deleted successfully!");
      }
      setDeleteConfirmOpen(false);
      setContentToDelete(null);
      // Refetch the content history to update the list
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete content");
    },
  });

  // Toggle favorite mutation
  const toggleFavoriteMutation = useToggleFavoriteContent({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Favorite status updated!");
        // Refetch the content history to update the list
        refetch();
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update favorite status");
    },
  });

  const availableModels = modelsData?.data || [];

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titles.some((title) => title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesModel =
        filterModel === "all" || item.aiModel.toLowerCase().includes(filterModel.toLowerCase());

      return matchesSearch && matchesModel;
    });
  }, [data, searchQuery, filterModel]);

  const handleDownload = (item: NonNullable<typeof data>["data"][number]) => {
    const content = `
TOPIC: ${item.topic}

TITLES:
${item.titles.map((t: string, i: number) => `${i + 1}. ${t}`).join("\n")}

DESCRIPTION:
${item.description}

TAGS:
${item.tags.join(", ")}

THUMBNAIL IDEAS:
${item.thumbnailIdeas.map((t: string, i: number) => `${i + 1}. ${t}`).join("\n")}

SCRIPT OUTLINE:
${item.scriptOutline.map((t: string, i: number) => `${i + 1}. ${t}`).join("\n")}

AI MODEL: ${item.aiModel}
CREATED: ${format(new Date(item.createdAt), "PPP")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.topic.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Downloaded successfully!");
  };

  const handleViewDetails = (contentId: string) => {
    setSelectedContentId(contentId);
    setIsDialogOpen(true);
    setCopiedSections({});
  };

  const handleCopyToClipboard = async (text: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSections((prev) => ({ ...prev, [sectionId]: true }));
      toast.success("Copied to clipboard!");
      setTimeout(() => {
        setCopiedSections((prev) => ({ ...prev, [sectionId]: false }));
      }, 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDeleteClick = (id: string, topic: string) => {
    setContentToDelete({ id, topic });
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (contentToDelete) {
      deleteMutation.mutate(contentToDelete.id);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setContentToDelete(null);
  };

  const handleToggleFavorite = (id: string, currentStatus: boolean) => {
    if (currentStatus) {
      // Already a favorite, show info message
      toast.info("This content is already in your favorites!");
      return;
    }
    // Toggle favorite status
    toggleFavoriteMutation.mutate(id);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="cursor-pointer" />
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
        </div>

        <Card className="glass glow border-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-full sm:w-[180px]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="cursor-pointer" />
          <div>
            <h1 className="text-3xl font-bold">Content History</h1>
            <p className="text-muted-foreground">View and manage all your generated content.</p>
          </div>
        </div>

        <Card className="glass border-destructive/50">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading History</AlertTitle>
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

  const historyItems = data?.data || [];

  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="cursor-pointer" />
          <div>
            <h1 className="text-3xl font-bold">Content History</h1>
            <p className="text-muted-foreground">View and manage all your generated content.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredData.length} / {historyItems.length} items
          </Badge>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Card className="glass glow border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by topic, title, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Select value={filterModel} onValueChange={setFilterModel} disabled={isLoadingModels}>
              <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
                <SelectValue
                  placeholder={isLoadingModels ? "Loading models..." : "Filter by model"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {availableModels.map((modelOption) => (
                  <SelectItem key={modelOption.id} value={modelOption.id}>
                    {modelOption.name} {modelOption.isDefault && "(Recommended)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={limit.toString()} onValueChange={(val) => setLimit(Number(val))}>
              <SelectTrigger className="w-full sm:w-[120px] bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 items</SelectItem>
                <SelectItem value="20">20 items</SelectItem>
                <SelectItem value="50">50 items</SelectItem>
                <SelectItem value="100">100 items</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {historyItems.length === 0 ? "No Content Yet" : "No Results Found"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {historyItems.length === 0
                  ? "Generate some content to see it appear here."
                  : "Try adjusting your search or filter criteria."}
              </p>
              {searchQuery || filterModel !== "all" ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterModel("all");
                  }}
                >
                  Clear Filters
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Topic</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item._id} className="group">
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium line-clamp-1">{item.topic}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.titles[0]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">
                          <Sparkles className="mr-1 h-3 w-3" />
                          {item.aiModel.split("/").pop()?.split(":")[0] || "AI"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(item.createdAt), "MMM dd, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.isFavorite && (
                          <Badge variant="outline" className="text-xs">
                            <Heart className="mr-1 h-3 w-3 fill-red-500 text-red-500" />
                            Favorite
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => handleViewDetails(item._id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-8 w-8",
                              item.isFavorite ? "cursor-not-allowed" : "cursor-pointer"
                            )}
                            onClick={() => handleToggleFavorite(item._id, item.isFavorite)}
                            disabled={item.isFavorite || toggleFavoriteMutation.isPending}
                          >
                            {toggleFavoriteMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Heart
                                className={cn(
                                  "h-4 w-4",
                                  item.isFavorite && "fill-red-500 text-red-500"
                                )}
                              />
                            )}
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
                            onClick={() => handleDeleteClick(item._id, item.topic)}
                            disabled={deleteMutation.isPending}
                          >
                            {deleteMutation.isPending && contentToDelete?.id === item._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Content Details</DialogTitle>
            <DialogDescription>
              View the complete details of your generated content
            </DialogDescription>
          </DialogHeader>

          {isLoadingDetails ? (
            <div className="space-y-4 py-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : detailsError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{detailsError.message}</AlertDescription>
            </Alert>
          ) : contentDetails ? (
            <ScrollArea className="max-h-[calc(90vh-12rem)] pr-4">
              <div className="space-y-6">
                {/* Topic Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Topic
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyToClipboard(contentDetails.topic, "topic")}
                    >
                      {copiedSections["topic"] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-base bg-card/50 p-4 rounded-lg">{contentDetails.topic}</p>
                </div>

                <Separator />

                {/* Titles Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Video Titles</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(contentDetails.titles.join("\n\n"), "titles")
                      }
                    >
                      {copiedSections["titles"] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {contentDetails.titles.map((title, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-card/50 p-3 rounded-lg">
                        <Badge variant="secondary" className="mt-1">
                          {idx + 1}
                        </Badge>
                        <p className="flex-1">{title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Description Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(contentDetails.description, "description")
                      }
                    >
                      {copiedSections["description"] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm bg-card/50 p-4 rounded-lg leading-relaxed">
                    {contentDetails.description}
                  </p>
                </div>

                <Separator />

                {/* Tags Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Tags</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyToClipboard(contentDetails.tags.join(" "), "tags")}
                    >
                      {copiedSections["tags"] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {contentDetails.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Thumbnail Ideas Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Thumbnail Ideas</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          contentDetails.thumbnailIdeas.join("\n"),
                          "thumbnails"
                        )
                      }
                    >
                      {copiedSections["thumbnails"] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {contentDetails.thumbnailIdeas.map((idea, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-card/50 p-3 rounded-lg">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <p className="flex-1 text-sm">{idea}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Script Outline Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Script Outline</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          contentDetails.scriptOutline
                            .map((item, idx) => `${idx + 1}. ${item}`)
                            .join("\n"),
                          "script"
                        )
                      }
                    >
                      {copiedSections["script"] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {contentDetails.scriptOutline.map((outline, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-card/50 p-3 rounded-lg">
                        <Badge variant="secondary" className="mt-1">
                          {idx + 1}
                        </Badge>
                        <p className="flex-1 text-sm">{outline}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Metadata Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">AI Model</p>
                    <Badge variant="secondary" className="font-mono">
                      <Sparkles className="mr-1 h-3 w-3" />
                      {contentDetails.aiModel.split("/").pop()?.split(":")[0] || "AI"}
                    </Badge>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Created</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <p className="text-sm font-medium">
                        {format(new Date(contentDetails.createdAt), "PPP")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    {contentDetails.isFavorite ? (
                      <Badge variant="outline" className="text-xs">
                        <Heart className="mr-1 h-3 w-3 fill-red-500 text-red-500" />
                        Favorite
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Saved
                      </Badge>
                    )}
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Content ID</p>
                    <p className="text-xs font-mono text-muted-foreground truncate">
                      {contentDetails._id}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the content{" "}
              <span className="font-semibold text-foreground">
                &quot;{contentToDelete?.topic}&quot;
              </span>{" "}
              from your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel} disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
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
