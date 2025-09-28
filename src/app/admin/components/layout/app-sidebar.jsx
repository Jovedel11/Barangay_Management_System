import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "../navigation/nav-documents";
import { NavMain } from "../navigation/nav-main";
import { NavSecondary } from "../navigation/nav-secondary";
import { NavUser } from "@/app/shared/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/core/components/ui/sidebar";
import { CalendarSync, HandPlatter, ScrollText, UserPen } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Manage Items",
      url: "/admin/manage-items",
      icon: IconListDetails,
    },
    {
      title: "Manage Documents",
      url: "/admin/manage-documents",
      icon: IconFolder,
    },
    {
      title: "Manage Services",
      url: "/admin/manage-services",
      icon: HandPlatter,
    },
    {
      title: "Manage Events",
      url: "/admin/manage-events",
      icon: CalendarSync,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Users List",
      url: "/admin/manage-users",
      icon: ScrollText,
    },
    {
      name: "Profile",
      url: "/admin/manage-users/profile",
      icon: UserPen,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary">
                  <img
                    src="/image/favicon-96x96.png"
                    alt="Barangay Kaypian Logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sidebar-foreground">
                    Barangay Kaypian
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Resident Portal
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
