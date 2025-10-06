'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, Heart, Download, Trash2, Eye } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const historyData = [
    {
        id: 1,
        title: "10 Tips for Better YouTube Thumbnails",
        model: "DeepSeek",
        date: "2024-01-15",
        favorite: true,
    },
    {
        id: 2,
        title: "How to Grow Your Channel in 2024",
        model: "Gemini",
        date: "2024-01-14",
        favorite: false,
    },
    {
        id: 3,
        title: "Ultimate Guide to Video SEO",
        model: "DeepSeek",
        date: "2024-01-14",
        favorite: true,
    },
    {
        id: 4,
        title: "Content Calendar Planning Strategies",
        model: "GLM",
        date: "2024-01-13",
        favorite: false,
    },
    {
        id: 5,
        title: "Engaging Your Audience: Best Practices",
        model: "DeepSeek",
        date: "2024-01-12",
        favorite: false,
    },
];

export default function HistoryHomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterModel, setFilterModel] = useState("all");

    return (
        <div className="min-h-screen p-6 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="cursor-pointer"/>
                <div>
                    <h1 className="text-3xl font-bold">Content History</h1>
                    <p className="text-muted-foreground">View and manage all your generated content.</p>
                </div>
            </div>

            <Card className="glass glow border-border">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-card border-border"
                            />
                        </div>
                        <Select value={filterModel} onValueChange={setFilterModel}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
                                <SelectValue placeholder="Filter by model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Models</SelectItem>
                                <SelectItem value="deepseek">DeepSeek</SelectItem>
                                <SelectItem value="gemini">Gemini</SelectItem>
                                <SelectItem value="glm">GLM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{item.model}</Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Heart
                                                    className={`h-4 w-4 ${item.favorite ? "fill-primary text-primary" : ""
                                                        }`}
                                                />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

