import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import {
  CheckCircle,
  FileText,
  Package,
  Calendar,
  ClipboardList,
} from "lucide-react";

const quickActions = [
  {
    title: "Manage Borrow Items",
    description: "View and manage borrowed items",
    path: "/manage-borrow-items",
    icon: Package,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    hoverBg: "hover:bg-blue-50",
  },
  {
    title: "Barangay Documents",
    description: "Access official documents",
    path: "/barangay-documents",
    icon: FileText,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    hoverBg: "hover:bg-green-50",
  },
  {
    title: "Barangay Events",
    description: "See upcoming barangay events",
    path: "/barangay-events",
    icon: Calendar,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    hoverBg: "hover:bg-purple-50",
  },
  {
    title: "Barangay Services",
    description: "Request and manage services",
    path: "/barangay-services",
    icon: ClipboardList,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    hoverBg: "hover:bg-orange-50",
  },
];

const QuickActions = () => {
  return (
    <Card className="bg-card border-border max-h-[30rem] min-h-[30rem] hover:shadow-lg transition-all duration-200 max-w-[30rem]">
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
              <Link to={action.path} className="flex items-start gap-3">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${action.bgColor} shadow-sm`}
                >
                  <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-foreground">
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
