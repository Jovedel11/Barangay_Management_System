import { IconHelp, IconSettings } from "@tabler/icons-react";
import {
  CalendarFold,
  FileUser,
  HandPlatter,
  ListMinus,
  UserRoundPen,
} from "lucide-react";

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

const data = {
  user: {
    name: "shadcn",
    email: "resident@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Manage Borrow Items",
      url: "/resident/manage-borrow-items",
      icon: ListMinus,
      isActive: true,
    },
    {
      title: "Barangay Documents",
      url: "/resident/barangay-documents",
      icon: FileUser,
    },
    {
      title: "Barangay Services",
      url: "/resident/barangay-services",
      icon: HandPlatter,
    },
    {
      title: "Barangay Events",
      url: "/resident/barangay-events",
      icon: CalendarFold,
    },
    {
      title: "Resident Profile",
      url: "/resident/profile",
      icon: UserRoundPen,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/resident/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/resident/help",
      icon: IconHelp,
    },
  ],
};

export function ResidentSidebar({ ...props }) {
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
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
