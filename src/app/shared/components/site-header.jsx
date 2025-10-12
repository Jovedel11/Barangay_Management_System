import { SidebarIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/core/components/ui/breadcrumb";
import { Button } from "@/core/components/ui/button";
import { Separator } from "@/core/components/ui/separator";
import { useSidebar } from "@/core/components/ui/sidebar";
import NotificationBell from "./notifcation-bell";
import { ModeToggle } from "@/core/components/ui/mode-toggle";
import { useAuth } from "@/hooks/useAuthProvider";
import { useLocation } from "react-router-dom";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments.pop() || "dashboard";
  const pageTitle = lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const resident = user?.role === "resident";
  const admin = user?.role === "admin";

  return (
    <header className="sticky top-0 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-14 w-full items-center gap-4 px-6">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-sidebar-accent"
          onClick={toggleSidebar}
        >
          <SidebarIcon className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Breadcrumb Navigation */}
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={
                  resident
                    ? `/resident/${lastSegment}`
                    : admin
                    ? `/admin/${lastSegment}`
                    : "/"
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {pageTitle}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-2">
          <NotificationBell />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
