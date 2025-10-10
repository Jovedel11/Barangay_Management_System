import customRequest from "@/services/customRequest";
import { useQuery } from "@tanstack/react-query";
import { FileText, Wrench, Package, Calendar, HelpCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { useAuth } from "@/hooks/useAuthProvider";

const StatsCard = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["resident-dashboard-stats"],
    queryFn: () =>
      customRequest({
        path: `/api/dashboard/resident/stats?userID=${user._id}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: !!user,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  // Known configurations for each stat key
  const statsConfig = {
    documents: {
      title: "Pending Documents",
      description: "Documents awaiting approval",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/40",
    },
    services: {
      title: "Pending Services",
      description: "Service requests in queue",
      icon: Wrench,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/40",
    },
    borrowRequests: {
      title: "Pending Borrow Requests",
      description: "Equipment borrow requests",
      icon: Package,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/40",
    },
    events: {
      title: "Upcoming Events",
      description: "Barangay events scheduled",
      icon: Calendar,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/40",
    },
  };

  const statsResponse = data?.response || {};
  const statsArray = Object.entries(statsResponse).map(([key, value]) => {
    const config = statsConfig[key] || {
      title: key.replace(/([A-Z])/g, " $1"),
      description: "No description available",
      icon: HelpCircle,
      color: "text-slate-600 dark:text-slate-400",
      bgColor: "bg-slate-50 dazrk:bg-slate-900/40",
    };
    return { key, value, ...config };
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsArray.map((stat, index) => (
        <Card
          key={index}
          className="transition-all duration-200 hover:shadow-lg border border-slate-200 dark:border-slate-700 bg-card hover:bg-card/80"
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
  );
};

export default StatsCard;
