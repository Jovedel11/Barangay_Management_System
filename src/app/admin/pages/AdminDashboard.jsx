import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  FileText,
  Package,
  Calendar,
  TrendingUp,
  Activity,
  Bell,
  Plus,
  Eye,
  Settings,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import { IconStethoscope, IconCalendarEvent } from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Separator } from "@/core/components/ui/separator";
import { Skeleton } from "@/core/components/ui/skeleton";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for dashboard statistics
  const dashboardStats = [
    {
      title: "Total Residents",
      value: "2,847",
      change: "+12%",
      trend: "up",
      description: "Registered residents",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      route: "/admin/manage-users",
    },
    {
      title: "Document Requests",
      value: "156",
      change: "+8%",
      trend: "up",
      description: "Pending & processing",
      icon: FileText,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      route: "/admin/manage-documents",
    },
    {
      title: "Active Services",
      value: "89",
      change: "+15%",
      trend: "up",
      description: "Appointments today",
      icon: IconStethoscope,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      route: "/admin/manage-services",
    },
    {
      title: "Item Bookings",
      value: "34",
      change: "-3%",
      trend: "down",
      description: "Currently borrowed",
      icon: Package,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      route: "/admin/manage-items",
    },
    {
      title: "Upcoming Events",
      value: "7",
      change: "+2",
      trend: "up",
      description: "This month",
      icon: Calendar,
      color: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/20",
      route: "/admin/manage-events",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "+5",
      trend: "up",
      description: "Require attention",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      route: "/admin/manage-users",
    },
  ];

  // Quick action buttons
  const quickActions = [
    {
      title: "Add New Resident",
      description: "Register a new barangay resident",
      icon: UserPlus,
      color: "bg-primary",
      action: () => console.log("Add resident"),
    },
    {
      title: "Process Documents",
      description: "Review pending document requests",
      icon: FileText,
      color: "bg-success",
      action: () => console.log("Process documents"),
    },
    {
      title: "Schedule Service",
      description: "Create new service appointment",
      icon: Calendar,
      color: "bg-accent",
      action: () => console.log("Schedule service"),
    },
    {
      title: "Add Equipment",
      description: "Register new borrowable items",
      icon: Package,
      color: "bg-warning",
      action: () => console.log("Add equipment"),
    },
    {
      title: "Create Event",
      description: "Organize barangay event",
      icon: IconCalendarEvent,
      color: "bg-info",
      action: () => console.log("Create event"),
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      color: "bg-muted",
      action: () => console.log("Settings"),
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: "document",
      action: "Document Request Approved",
      user: "Maria Santos",
      details: "Barangay Clearance approved and ready for pickup",
      timestamp: "2 minutes ago",
      status: "approved",
      icon: CheckCircle,
      color: "text-success",
    },
    {
      id: 2,
      type: "user",
      action: "New User Registration",
      user: "Juan Dela Cruz",
      details: "Resident signup pending admin approval",
      timestamp: "5 minutes ago",
      status: "pending",
      icon: UserPlus,
      color: "text-warning",
    },
    {
      id: 3,
      type: "service",
      action: "Health Service Completed",
      user: "Ana Garcia",
      details: "Blood pressure monitoring completed",
      timestamp: "10 minutes ago",
      status: "completed",
      icon: IconStethoscope,
      color: "text-success",
    },
    {
      id: 4,
      type: "item",
      action: "Equipment Returned",
      user: "Pedro Reyes",
      details: "Sound system returned in good condition",
      timestamp: "15 minutes ago",
      status: "returned",
      icon: Package,
      color: "text-info",
    },
    {
      id: 5,
      type: "event",
      action: "Event Registration",
      user: "Lisa Martinez",
      details: "Registered for Basketball Tournament",
      timestamp: "20 minutes ago",
      status: "registered",
      icon: Calendar,
      color: "text-accent",
    },
  ];

  // Urgent items requiring attention
  const urgentItems = [
    {
      id: 1,
      type: "Overdue Items",
      count: 5,
      description: "Items past return date",
      priority: "high",
      action: "Review Now",
      route: "/admin/manage-items",
    },
    {
      id: 2,
      type: "Pending Signups",
      count: 12,
      description: "Users awaiting approval",
      priority: "medium",
      action: "Approve/Reject",
      route: "/admin/manage-users",
    },
    {
      id: 3,
      type: "Document Processing",
      count: 8,
      description: "Ready for review",
      priority: "medium",
      action: "Process",
      route: "/admin/manage-documents",
    },
    {
      id: 4,
      type: "Service Appointments",
      count: 15,
      description: "Today's appointments",
      priority: "low",
      action: "View Schedule",
      route: "/admin/manage-services",
    },
  ];

  // System health metrics
  const systemMetrics = [
    {
      metric: "System Uptime",
      value: "99.9%",
      status: "excellent",
      icon: Activity,
    },
    {
      metric: "Response Time",
      value: "1.2s",
      status: "good",
      icon: TrendingUp,
    },
    {
      metric: "Active Users",
      value: "234",
      status: "normal",
      icon: Users,
    },
    {
      metric: "Storage Used",
      value: "67%",
      status: "warning",
      icon: BarChart3,
    },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: {
        variant: "default",
        className: "bg-success text-success-foreground",
      },
      pending: {
        variant: "secondary",
        className: "bg-warning text-warning-foreground",
      },
      completed: {
        variant: "default",
        className: "bg-success text-success-foreground",
      },
      returned: {
        variant: "outline",
        className: "bg-info text-info-foreground",
      },
      registered: {
        variant: "outline",
        className: "bg-accent text-accent-foreground",
      },
    };

    return statusConfig[status] || { variant: "outline" };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-warning bg-warning/5";
      case "low":
        return "border-l-success bg-success/5";
      default:
        return "border-l-muted";
    }
  };

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

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all hover:shadow-md ${stat.borderColor} border-l-4`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-success" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-destructive" />
                  )}
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
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
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 justify-start"
                onClick={action.action}
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

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest system activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-full bg-muted ${activity.color}`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">
                        {activity.action}
                      </p>
                      <Badge
                        {...getStatusBadge(activity.status)}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} - {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Urgent Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Items Requiring Attention
            </CardTitle>
            <CardDescription>
              High priority tasks that need immediate action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
                    item.priority
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.type}</h4>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      {item.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            System Health
          </CardTitle>
          <CardDescription>
            Monitor system performance and health metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {systemMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className="p-2 rounded-lg bg-muted">
                  <metric.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{metric.metric}</div>
                  <div className="text-lg font-bold">{metric.value}</div>
                  <Badge
                    variant={
                      metric.status === "excellent" || metric.status === "good"
                        ? "default"
                        : metric.status === "warning"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-xs mt-1"
                  >
                    {metric.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
