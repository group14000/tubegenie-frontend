'use client';

import {
    LayoutDashboard,
    Sparkles,
    History,
    Heart,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";

const menuItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Generate", href: "/generate", icon: Sparkles },
    { title: "History", href: "/history", icon: History },
    { title: "Favorites", href: "/favorites", icon: Heart },
    { title: "Analytics", href: "/analytics", icon: BarChart3 },
    // { title: "Settings", href: "/settings", icon: Settings },
];

export default function AppSidebar() {
    const { open } = useSidebar();
    const pathname = usePathname() ?? "/";
    const { user } = useUser();

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center bg-indigo-900">
                        <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    {open && (
                        <div>
                            <h2 className="text-lg font-bold gradient-primary bg-clip-text font-geistSans text-indigo-900">
                                TubeGenie
                            </h2>
                            <p className="text-xs font-geistSans text-indigo-500">AI Content Studio</p>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive =
                                    pathname === item.href || pathname.startsWith(item.href + "/");

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 p-6 rounded-md",
                                                    isActive
                                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                        : "hover:bg-sidebar-accent/50"
                                                )}
                                            >
                                                <item.icon className="h-4 w-4 text-indigo-800" />
                                                {open && <span className="text-indigo-800">{item.title}</span>}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <UserButton />
                    {open && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-indigo-600">{user?.fullName || user?.firstName || "User"}</p>
                            <p className="text-xs  truncate text-indigo-400">{user?.primaryEmailAddress?.emailAddress || ""}</p>
                        </div>
                    )}
                    {open && (
                        <SignOutButton>
                            <LogOut className="h-4 w-4 cursor-pointer" />
                        </SignOutButton>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
