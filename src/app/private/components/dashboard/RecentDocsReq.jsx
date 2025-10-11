import { useAuth } from "@/hooks/useAuthProvider";
import customRequest from "@/services/customRequest";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";

const RecentDocsReq = () => {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["docs-req"],
    queryFn: () =>
      customRequest({
        path: `/api/dashboard/resident/docs-req?userID=${user._id}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: !!user,
  });
  console.log("Request Data", data);

  // Helper function to get status styling
  const getStatusStyle = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "pending":
        return {
          statusBg: "bg-yellow-50 dark:bg-yellow-950/20",
          statusText: "text-yellow-700 dark:text-yellow-400",
          statusBorder: "border-yellow-300 dark:border-yellow-800",
        };
      case "approved":
      case "completed":
        return {
          statusBg: "bg-green-50 dark:bg-green-950/20",
          statusText: "text-green-700 dark:text-green-400",
          statusBorder: "border-green-300 dark:border-green-800",
        };
      case "rejected":
      case "cancelled":
        return {
          statusBg: "bg-red-50 dark:bg-red-950/20",
          statusText: "text-red-700 dark:text-red-400",
          statusBorder: "border-red-300 dark:border-red-800",
        };
      case "processing":
        return {
          statusBg: "bg-blue-50 dark:bg-blue-950/20",
          statusText: "text-blue-700 dark:text-blue-400",
          statusBorder: "border-blue-300 dark:border-blue-800",
        };
      default:
        return {
          statusBg: "bg-gray-50 dark:bg-gray-950/20",
          statusText: "text-gray-700 dark:text-gray-400",
          statusBorder: "border-gray-300 dark:border-gray-800",
        };
    }
  };

  // Transform the API response to match component expectations
  const documents = Array.isArray(data?.response)
    ? data.response.map((doc) => ({
        id: doc._id || doc.id,
        type: doc.specificDetails || "Document Request",
        date: doc.createdAt || doc.updatedAt || new Date().toISOString(),
        status: doc.status.charAt(0).toUpperCase() + doc.status.slice(1),
        ...getStatusStyle(doc.status),
      }))
    : [];

  return (
    <Card className="min-h-[30rem] overflow-y-auto max-h-[30rem] bg-card border-border hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          Recent Document Requests
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Track the status of your recent applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No document requests found
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-all duration-200 bg-background/50 hover:shadow-sm"
              >
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{request.type}</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted on {new Date(request.date).toLocaleDateString()}
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
        )}
      </CardContent>
    </Card>
  );
};

export default RecentDocsReq;
