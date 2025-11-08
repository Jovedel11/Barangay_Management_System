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
  Home,
  Truck,
  Phone,
  Loader2,
  Globe,
  Download,
  LoaderIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import { useAuth } from "@/hooks/useAuthProvider";
import { CustomToast } from "@/components/custom/CustomToast";

const DocsRequest = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-docs/get-request?userID=${user._id}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const myRequests = Array.isArray(data?.response) ? data.response : [];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Processing
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
        return null;
    }
  };

  const getDeliveryBadge = (method, digitallyAvailable, status) => {
    if (digitallyAvailable || method === "online") {
      return (
        <Badge
          variant="outline"
          className="bg-accent/10 text-accent border-accent/30"
        >
          <Globe className="h-3 w-3 mr-1" />
          Digitally
        </Badge>
      );
    } else if (method === "delivery" && status === "completed") {
      return (
        <Badge
          variant="outline"
          className="bg-purple-500/10 text-purple-500 border-purple-500/30"
        >
          <Truck className="h-3 w-3 mr-1" />
          Delivered
        </Badge>
      );
    } else if (method === "pickup" && status === "completed") {
      return (
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30"
        >
          <Home className="h-3 w-3 mr-1" />
          Ready for Pickup
        </Badge>
      );
    } else if (status === "pending") {
      return (
        <Badge
          variant="outline"
          className="bg-warning/10 text-warning border-warning/30"
        >
          <LoaderIcon className="h-3 w-3 mr-1" />
          Waiting for admin
        </Badge>
      );
    }
  };

  const generateTrackingNumber = (index) => {
    return `DOC-${String(index + 1).padStart(4, "0")}-${Date.now()
      .toString()
      .slice(-6)}`;
  };

  const handleDownload = (fileSrc, fileName) => {
    if (!fileSrc) return;

    const link = document.createElement("a");
    link.href = fileSrc;
    link.download = fileName || "document.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    CustomToast({
      description: "Download started.",
      status: "success",
    });
  };

  return (
    <Card className="bg-inherit border-none shadow-none transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          My Document Requests
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Track your requests and payment status
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* 🔹 Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mb-2" />
            <p>Loading your document requests...</p>
          </div>
        )}

        {/* 🔹 Error State */}
        {isError && (
          <div className="text-center text-destructive py-10">
            <XCircle className="h-6 w-6 mx-auto mb-2" />
            <p>Failed to load the data. Please try again later.</p>
          </div>
        )}

        {/* 🔹 Success State */}
        {!isLoading && !isError && (
          <div className="space-y-4">
            {myRequests.length > 0 ? (
              myRequests.map((request, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200 bg-background/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          Document Request
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {generateTrackingNumber(index)}
                        </p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    {getDeliveryBadge(
                      request.deliveryMethod,
                      request.digitallyAvailable,
                      request.status
                    )}

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Document:</span>
                        <span className="text-foreground font-medium">
                          {request.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Purpose:</span>
                        <span className="text-foreground font-medium">
                          {request.purpose}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="text-foreground font-medium">
                          {request.quantity}
                        </span>
                      </div>
                      {request.contactNumber && (
                        <div className="flex justify-between">
                          <span>Contact:</span>
                          <span className="text-foreground font-medium flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {request.contactNumber}
                          </span>
                        </div>
                      )}
                      {request.urgentRequest && (
                        <div className="flex justify-between">
                          <span>Priority:</span>
                          <span className="text-warning font-medium">
                            Urgent
                          </span>
                        </div>
                      )}
                      {request.isPregnant && (
                        <div className="flex justify-between">
                          <span>Special Notes:</span>
                          <span className="text-foreground font-medium">
                            Priority (Pregnant)
                          </span>
                        </div>
                      )}
                    </div>

                    {request.specificDetails && (
                      <div className="p-2 bg-primary/10 border border-primary/20 rounded text-sm">
                        <p className="text-primary font-medium">Details:</p>
                        <p className="text-primary/80">
                          {request.specificDetails}
                        </p>
                      </div>
                    )}

                    {/* Status Messages */}
                    {request.status === "pending" && (
                      <div className="p-2 bg-warning/10 border border-warning/20 rounded text-sm">
                        <p className="text-warning font-medium">
                          Pending Review
                        </p>
                        <p className="text-warning/80">
                          Your request is waiting to be reviewed by the barangay
                          office.
                        </p>
                      </div>
                    )}

                    {request.status === "processing" && (
                      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                        <p className="text-blue-500 font-medium">
                          Processing Document
                        </p>
                        <p className="text-blue-500/80">
                          Your document is currently being processed. Please
                          wait for further updates.
                        </p>
                      </div>
                    )}

                    {request.status === "completed" &&
                      request.deliveryMethod === "pickup" &&
                      !request.digitallyAvailable && (
                        <div className="p-2 bg-success/10 border border-success/20 rounded text-sm">
                          <p className="text-success font-medium">
                            Ready for Pickup!
                          </p>
                          <p className="text-success/80">
                            Visit barangay office to pay and collect your
                            document.
                          </p>
                        </div>
                      )}

                    {request.status === "completed" &&
                      request.deliveryMethod === "delivery" && (
                        <div className="p-2 bg-success/10 border border-success/20 rounded text-sm">
                          <p className="text-success font-medium">
                            Document Delivered!
                          </p>
                          <p className="text-success/80">
                            Your document has been delivered to your address.
                          </p>
                        </div>
                      )}

                    {request.digitallyAvailable &&
                      request.status === "completed" && (
                        <div className="space-y-2">
                          <div className="p-2 bg-success/10 border border-success/20 rounded text-sm">
                            <p className="text-success font-medium">
                              Document Ready for Download!
                            </p>
                            <p className="text-success/80">
                              The admin has sent your document digitally. You
                              can download it using the button below.
                            </p>
                          </div>
                          {request.fileSrc && request.fileName && (
                            <Button
                              onClick={() =>
                                handleDownload(
                                  request.fileSrc,
                                  request.fileName
                                )
                              }
                              className="w-full"
                              variant="outline"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download {request.fileName}
                            </Button>
                          )}
                        </div>
                      )}

                    {request.status === "rejected" && (
                      <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                        <p className="text-destructive font-medium">
                          Request Rejected
                        </p>
                        <p className="text-destructive/80">
                          Your document request has been rejected. Please
                          contact the barangay office for more information.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm">
                No document requests yet.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocsRequest;
