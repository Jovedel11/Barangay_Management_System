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
  Package,
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

  // UPDATED: Match new status system
  const getStatusBadge = (status) => {
    switch (status) {
      case "received":
        return (
          <Badge variant="default">
            <CheckCircle className="h-3 w-3 mr-1" />
            Received
          </Badge>
        );
      case "completed": // Legacy support
        return (
          <Badge variant="default">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        );
      case "released":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30">
            <Package className="h-3 w-3 mr-1" />
            Released
          </Badge>
        );
      case "handover":
        return (
          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/30">
            <Truck className="h-3 w-3 mr-1" />
            {/* Dynamic label based on delivery method would go here */}
            Handover
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDeliveryBadge = (method, digitallyAvailable) => {
    if (digitallyAvailable || method === "online") {
      return (
        <Badge
          variant="outline"
          className="bg-accent/10 text-accent border-accent/30"
        >
          <Globe className="h-3 w-3 mr-1" />
          Online
        </Badge>
      );
    } else if (method === "delivery") {
      return (
        <Badge
          variant="outline"
          className="bg-purple-500/10 text-purple-500 border-purple-500/30"
        >
          <Truck className="h-3 w-3 mr-1" />
          Delivery
        </Badge>
      );
    } else if (method === "pickup") {
      return (
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30"
        >
          <Home className="h-3 w-3 mr-1" />
          Pickup
        </Badge>
      );
    }
  };

  const generateTrackingNumber = (index) => {
    return `DOC-${String(index + 1).padStart(4, "0")}-${Date.now()
      .toString()
      .slice(-6)}`;
  };

  // NEW: Format datetime with time
  const formatDateTime = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
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
                      request.digitallyAvailable
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

                    {/* NEW: Timestamp Tracking Section */}
                    {(request.requestAt || request.releaseAt || request.handoverAt || request.receiveAt) && (
                      <div className="p-3 bg-muted/30 border border-muted rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                          Request Timeline
                        </p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          {/* Request timestamp - always show */}
                          {(request.requestAt || request.createdAt) && (
                            <div className="flex justify-between">
                              <span>Request:</span>
                              <span className="text-foreground font-medium">
                                {formatDateTime(request.requestAt || request.createdAt)}
                              </span>
                            </div>
                          )}
                          
                          {/* Release timestamp */}
                          {request.releaseAt && (
                            <div className="flex justify-between">
                              <span>Release:</span>
                              <span className="text-foreground font-medium">
                                {formatDateTime(request.releaseAt)}
                              </span>
                            </div>
                          )}
                          
                          {/* Handover timestamp - label changes based on delivery method */}
                          {request.handoverAt && request.deliveryMethod === "pickup" && (
                            <div className="flex justify-between">
                              <span>Pickup:</span>
                              <span className="text-foreground font-medium">
                                {formatDateTime(request.handoverAt)}
                              </span>
                            </div>
                          )}
                          {request.handoverAt && request.deliveryMethod === "delivery" && (
                            <div className="flex justify-between">
                              <span>Delivery:</span>
                              <span className="text-foreground font-medium">
                                {formatDateTime(request.handoverAt)}
                              </span>
                            </div>
                          )}
                          
                          {/* Receive timestamp */}
                          {request.receiveAt && (
                            <div className="flex justify-between">
                              <span>Receive:</span>
                              <span className="text-foreground font-medium">
                                {formatDateTime(request.receiveAt)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {request.specificDetails && (
                      <div className="p-2 bg-primary/10 border border-primary/20 rounded text-sm">
                        <p className="text-primary font-medium">Details:</p>
                        <p className="text-primary/80">
                          {request.specificDetails}
                        </p>
                      </div>
                    )}

                    {/* Status Messages - UPDATED */}
                    {request.status === "pending" && (
                      <div className="p-2 bg-muted/50 border border-muted rounded text-sm">
                        <p className="text-muted-foreground font-medium">
                          Pending Review
                        </p>
                        <p className="text-muted-foreground/80">
                          Your request is waiting to be reviewed by the barangay
                          office.
                        </p>
                      </div>
                    )}

                    {request.status === "processing" && (
                      <div className="p-2 bg-muted/50 border border-muted rounded text-sm">
                        <p className="text-muted-foreground font-medium">
                          Processing Document
                        </p>
                        <p className="text-muted-foreground/80">
                          Your document is currently being processed. Please
                          wait for further updates.
                        </p>
                      </div>
                    )}

                    {/* NEW: Released status */}
                    {request.status === "released" && request.deliveryMethod === "pickup" && (
                      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                        <p className="text-blue-500 font-medium">
                          Ready for Pickup!
                        </p>
                        <p className="text-blue-500/80">
                          Visit barangay office to pay and collect your document.
                        </p>
                      </div>
                    )}

                    {request.status === "released" && request.deliveryMethod === "delivery" && (
                      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                        <p className="text-blue-500 font-medium">
                          Ready for Delivery!
                        </p>
                        <p className="text-blue-500/80">
                          Your document is ready and will be delivered soon.
                        </p>
                      </div>
                    )}

                    {request.status === "released" && request.deliveryMethod === "online" && (
                      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                        <p className="text-blue-500 font-medium">
                          Document Ready!
                        </p>
                        <p className="text-blue-500/80">
                          Your document is ready for download.
                        </p>
                      </div>
                    )}

                    {/* NEW: Handover status */}
                    {request.status === "handover" && request.deliveryMethod === "pickup" && (
                      <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-sm">
                        <p className="text-purple-500 font-medium">
                          Picked Up!
                        </p>
                        <p className="text-purple-500/80">
                          Document has been picked up. Waiting for final confirmation.
                        </p>
                      </div>
                    )}

                    {request.status === "handover" && request.deliveryMethod === "delivery" && (
                      <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-sm">
                        <p className="text-purple-500 font-medium">
                          Out for Delivery!
                        </p>
                        <p className="text-purple-500/80">
                          Your document is on its way to your address.
                        </p>
                      </div>
                    )}

                    {/* Legacy completed status support */}
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

                    {/* NEW: Received status */}
                    {request.status === "received" && (
                      <div className="p-2 bg-success/10 border border-success/20 rounded text-sm">
                        <p className="text-success font-medium">
                          Document Received!
                        </p>
                        <p className="text-success/80">
                          You have successfully received your document.
                        </p>
                      </div>
                    )}

                    {/* Download button for online/digital documents */}
                    {(request.digitallyAvailable || request.deliveryMethod === "online") &&
                      (request.status === "released" || request.status === "received" || request.status === "completed") && (
                        <div className="space-y-2">
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