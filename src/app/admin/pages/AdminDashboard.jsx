import { useState, useEffect, useMemo } from "react";
import {
  Users,
  FileText,
  Package,
  Calendar,
  UserPlus,
  Plus,
  UserCheck,
} from "lucide-react";
import { IconStethoscope, IconCalendarEvent } from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Skeleton } from "@/core/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 🟢 Fetch all dashboard stats
  const { data } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () =>
      customRequest({
        path: `/api/admin/dashboard/stats`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 🟢 Centralized mapping for icons and routes
  const icons = useMemo(
    () => ({
      residents: {
        icon: Users,
        route: "/admin/manage-users",
      },
      documents: {
        icon: FileText,
        route: "/admin/manage-documents",
      },
      services: {
        icon: IconStethoscope,
        route: "/admin/manage-services",
      },
      borrowRequests: {
        icon: Package,
        route: "/admin/manage-items",
      },
      events: {
        icon: IconCalendarEvent,
        route: "/admin/manage-events",
      },
      accounts: {
        icon: Calendar,
        route: "/admin/manage-users",
      },
    }),
    []
  );

  // 🟢 Dynamically match icons order
  const dashboardStats = [
    {
      key: "residents",
      title: "Total Residents",
      description: "Registered residents",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      key: "documents",
      title: "Document Requests",
      description: "Pending & processing",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      key: "services",
      title: "Active Services",
      description: "Appointments today",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      key: "borrowRequests",
      title: "Borrowable Items",
      description: "Currently borrowed",
      color: "text-pink-400 dark:text-info",
      bgColor: "bg-pink-400/20 dark:bg-pink-200/10",
      borderColor: "border-info/20",
    },
    {
      key: "events",
      title: "Upcoming Events",
      description: "This month",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      key: "accounts",
      title: "Pending Approvals",
      description: "Require attention",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
    },
  ];

  // 🟢 Automatically generate Quick Actions based on icons
  const quickActions = [
    {
      key: "residents",
      title: "Add New Resident",
      description: "Register a new barangay resident",
      icon: UserPlus,
      color: "bg-primary",
      route: icons.residents.route,
    },
    {
      key: "documents",
      title: "Process Documents",
      description: "Review pending document requests",
      icon: FileText,
      color: "bg-success",
      route: icons.documents.route,
    },
    {
      key: "services",
      title: "Schedule Service",
      description: "Create new service appointment",
      icon: IconStethoscope,
      color: "bg-accent",
      route: icons.services.route,
    },
    {
      key: "borrowRequests",
      title: "Add Equipment",
      description: "Register new borrowable items",
      icon: Package,
      color: "bg-warning",
      route: icons.borrowRequests.route,
    },
    {
      key: "events",
      title: "Create Event",
      description: "Organize barangay event",
      icon: IconCalendarEvent,
      color: "bg-red-400 dark:bg-info",
      route: icons.events.route,
    },
    {
      key: "accounts",
      title: "Profile",
      description: "View or update profile",
      icon: UserCheck,
      color: "bg-yellow-400 dark:bg-muted",
      route: "/admin/manage-users/profile",
    },
  ];

  // 🟡 Loading Skeleton
  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 🟢 Dashboard UI
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening in your barangay today.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(icons).map((key) => {
          const stat = dashboardStats.find((s) => s.key === key);
          if (!stat) return null;

          const StatIcon = icons[key].icon;
          const statRoute = icons[key].route;
          const value = data?.response?.[key] ?? "0";

          return (
            <Card
              key={key}
              onClick={() => navigate(statRoute)}
              className={`cursor-pointer transition-all hover:shadow-md ${stat.borderColor} border-l-4`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <StatIcon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Frequently used actions for efficient barangay management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Button
                key={action.key}
                variant="outline"
                className="h-auto p-4 justify-start"
                onClick={() => navigate(action.route)}
              >
                <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
