import * as React from "react";
import {
  IconDashboard,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconSettings,
} from "@tabler/icons-react";

import { NavDocuments } from "../navigation/nav-documents";
import { NavMain } from "../navigation/nav-main";
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
import Logo from "@/core/components/ui/logo";

const data = {
  user: {
    name: "shadcn",
    email: "admin@example.com",
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
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/admin/get-help",
      icon: IconHelp,
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
                  <Logo to="admin/dashboard" />
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
