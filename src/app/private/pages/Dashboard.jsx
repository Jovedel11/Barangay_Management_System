import {
  FileText,
  Calendar,
  CreditCard,
  CheckCircle,
  TrendingUp,
  Bell,
  MapPin,
  Search,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";

export default function Dashboard() {
  // Mock data for dashboard - using your exact color palette
  const stats = [
    {
      title: "Document Requests",
      value: "5",
      description: "3 pending, 2 completed",
      icon: FileText,
      color: "text-primary", // Teal
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Upcoming Appointments",
      value: "2",
      description: "Next: Tomorrow 10:00 AM",
      icon: Calendar,
      color: "text-accent", // Pink
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Outstanding Balance",
      value: "₱450",
      description: "Community tax due",
      icon: CreditCard,
      color: "text-warning", // Amber
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      title: "Community Score",
      value: "98%",
      description: "Excellent standing",
      icon: TrendingUp,
      color: "text-success", // Green
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
  ];

  const recentRequests = [
    {
      id: 1,
      type: "Barangay Clearance",
      status: "Ready for Pickup",
      date: "2024-01-15",
      statusColor: "success",
      statusBg: "bg-success/10",
      statusText: "text-success",
      statusBorder: "border-success/30",
    },
    {
      id: 2,
      type: "Certificate of Residency",
      status: "Processing",
      date: "2024-01-14",
      statusColor: "warning",
      statusBg: "bg-warning/10",
      statusText: "text-warning",
      statusBorder: "border-warning/30",
    },
    {
      id: 3,
      type: "Business Permit",
      status: "Under Review",
      date: "2024-01-12",
      statusColor: "info",
      statusBg: "bg-primary/10",
      statusText: "text-primary",
      statusBorder: "border-primary/30",
    },
  ];

  const upcomingEvents = [
    {
      title: "Barangay Assembly Meeting",
      date: "January 20, 2024",
      time: "2:00 PM",
      location: "Barangay Hall",
    },
    {
      title: "Community Clean-up Drive",
      date: "January 25, 2024",
      time: "6:00 AM",
      location: "Main Street",
    },
    {
      title: "Health and Wellness Program",
      date: "January 30, 2024",
      time: "9:00 AM",
      location: "Community Center",
    },
  ];

  const quickActions = [
    {
      title: "Request Document",
      description: "Apply for certificates and clearances",
      icon: FileText,
      href: "/resident/documents",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      hoverBg: "hover:bg-primary/20",
    },
    {
      title: "Schedule Appointment",
      description: "Book a meeting with barangay officials",
      icon: Calendar,
      href: "/resident/appointments",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
      hoverBg: "hover:bg-accent/20",
    },
    {
      title: "View Services",
      description: "Explore available barangay services",
      icon: Search,
      href: "/resident/services",
      bgColor: "bg-secondary/20",
      iconColor: "text-secondary-foreground",
      hoverBg: "hover:bg-secondary/30",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back, Juan!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening in your barangay today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-success/10 text-success border-success/30 px-3 py-1 font-medium"
            >
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              Active Resident
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`transition-all duration-200 hover:shadow-lg border ${stat.borderColor} bg-card hover:bg-card/80`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center shadow-sm`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Document Requests */}
          <Card className="lg:col-span-2 bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Recent Document Requests
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Track the status of your recent applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-all duration-200 bg-background/50 hover:shadow-sm"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {request.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submitted on{" "}
                        {new Date(request.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${request.statusBg} ${request.statusText} ${request.statusBorder} font-medium px-3 py-1`}
                    >
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-6 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200"
              >
                View All Requests
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CheckCircle className="h-5 w-5 text-accent" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Common tasks and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full justify-start h-auto p-4 ${action.hoverBg} border-0 transition-all duration-200`}
                    asChild
                  >
                    <a href={action.href} className="flex items-start gap-3">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${action.bgColor} shadow-sm`}
                      >
                        <action.icon
                          className={`h-5 w-5 ${action.iconColor}`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm text-foreground">
                          {action.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="h-5 w-5 text-accent" />
              Upcoming Community Events
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Stay updated with barangay activities and announcements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200 bg-background/50 hover:bg-primary/5 hover:border-primary/30 cursor-pointer"
                >
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 shrink-0 text-primary" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-accent" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-6 border-accent/30 text-accent hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-all duration-200"
            >
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
