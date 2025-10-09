import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  FileText,
  Tag,
  MessageSquare,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";

const ServiceRequests = () => {
  const { data, isLoading: requestsLoading } = useQuery({
    queryKey: ["my-service-requests"],
    queryFn: () =>
      customRequest({
        path: "/api/brgy-services/request/services", // Replace with your actual endpoint
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    staleTime: 1000 * 60,
  });

  const myRequests = Array.isArray(data?.response) ? data.response : [];

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "rescheduled":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/30">
            <Clock className="h-3 w-3 mr-1" />
            Rescheduled
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
    }
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      "Health Services": "bg-teal-100 text-teal-700 border-teal-200",
      "Community Programs": "bg-blue-100 text-blue-700 border-blue-200",
      "Legal Services": "bg-purple-100 text-purple-700 border-purple-200",
      "Social Services": "bg-pink-100 text-pink-700 border-pink-200",
      Education: "bg-amber-100 text-amber-700 border-amber-200",
      Other: "bg-gray-100 text-gray-700 border-gray-200",
    };

    return (
      <Badge
        variant="outline"
        className={categoryColors[category] || categoryColors["Other"]}
      >
        <Tag className="h-3 w-3 mr-1" />
        {category}
      </Badge>
    );
  };

  const generateTrackingNumber = (index) => {
    return `SRV-${String(index + 1).padStart(4, "0")}-${Date.now()
      .toString()
      .slice(-6)}`;
  };

  return (
    <Card className="bg-inherit border-none shadow-none transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          My Service Requests
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Track your service appointments and requests
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {requestsLoading ? (
            <p className="text-center text-muted-foreground text-sm">
              Loading requests...
            </p>
          ) : myRequests.length > 0 ? (
            myRequests.map((request, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200 bg-background/50"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {request.service}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {generateTrackingNumber(index)}
                      </p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  {/* Category Badge */}
                  {getCategoryBadge(request.category)}

                  {/* Details */}
                  <div className="space-y-1 text-sm">
                    {request.details && (
                      <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                        <p className="text-primary font-medium flex items-center gap-1 mb-1">
                          <FileText className="h-3 w-3" />
                          Request Details:
                        </p>
                        <p className="text-muted-foreground">
                          {request.details}
                        </p>
                      </div>
                    )}

                    {request?.specialNote && (
                      <div className="p-3 bg-warning/5 border border-warning/10 rounded-lg mt-3">
                        <p className="text-warning font-medium flex items-center gap-1 mb-1">
                          <MessageSquare className="h-3 w-3" />
                          Special Note:
                        </p>
                        <p className="text-warning/80">{request.specialNote}</p>
                      </div>
                    )}
                  </div>

                  {/* Status Messages */}
                  {request.status === "completed" && (
                    <div className="p-2 bg-success/10 border border-success/20 rounded text-sm">
                      <p className="text-success font-medium">
                        Service Request Completed!
                      </p>
                      <p className="text-success/80">
                        Your service request has been successfully processed.
                      </p>
                    </div>
                  )}

                  {request.status === "processing" && (
                    <div className="p-2 bg-primary/10 border border-primary/20 rounded text-sm">
                      <p className="text-primary font-medium">
                        Request in Progress
                      </p>
                      <p className="text-primary/80">
                        Your request is currently being processed by the
                        barangay office.
                      </p>
                    </div>
                  )}

                  {request.status === "rejected" && request.rejectionReason && (
                    <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                      <p className="text-destructive font-medium">
                        Request Rejected
                      </p>
                      <p className="text-destructive/80">
                        Reason: {request.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {request.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-warning/30 text-warning hover:bg-warning/10"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Awaiting Review
                      </Button>
                    )}
                    {request.status === "processing" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Track Status
                      </Button>
                    )}
                    {request.status === "completed" && (
                      <Button
                        size="sm"
                        className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    )}
                  </div>

                  {/* Request Date */}
                  {request.createdAt && (
                    <p className="text-xs text-muted-foreground text-right">
                      Requested on:{" "}
                      {new Date(request.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No service requests yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceRequests;
