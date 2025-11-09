import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Home,
  XCircle,
  Package,
  Loader,
} from "lucide-react";
import customRequest from "@/services/customRequest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { CustomToast } from "@/components/custom/CustomToast";
import { useAuth } from "@/hooks/useAuthProvider";

const BookingCard = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const {
    data,
    isLoading: bookingsLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () =>
      customRequest({
        path: `/api/borrow-item/request/items?userID=${user._id}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
  const bookings = Array.isArray(data?.response) ? data.response : [];

  const onUpdateReq = useCallback(
    async (booking_id, main_item, quantity) => {
      try {
        const result = await customRequest({
          path: "/api/borrow-item/mark-as-returned",
          attributes: {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docs_id: booking_id,
              status: "returned",
              main_item,
              quantity,
            }),
            credentials: "include",
          },
        });
        if (result?.success) {
          refetch();
          queryClient.invalidateQueries({ queryKey: ["available-items"] });
          return CustomToast({
            description: "Booking request successfully updated!",
            status: "success",
          });
        }
        CustomToast({
          description: "Failed to update the request!",
          status: "error",
        });
      } catch (error) {
        console.error("Error updating booking:", error);
        CustomToast({
          description: "Something went wrong",
          status: "error",
        });
      }
    },
    [refetch, queryClient]
  );

  const getDeliveryStatusBadge = (method) => {
    if (method === "pickup") {
      return (
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30"
        >
          <Home className="h-3 w-3 mr-1" />
          Walk-in Pickup
        </Badge>
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30"
        >
          <Truck className="h-3 w-3 mr-1" />
          Delivery
        </Badge>
      );
    }
  };

  const getStatusBadge = (status, borrowDate, returnDate) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const daysLeft = Math.ceil((returnDateObj - today) / (1000 * 60 * 60 * 24));

    switch (status) {
      case "approved":
        if (daysLeft < 0) {
          return (
            <Badge className="bg-destructive/10 text-destructive border-destructive/30">
              <XCircle className="h-3 w-3 mr-1" />
              Overdue ({Math.abs(daysLeft)} days)
            </Badge>
          );
        }
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active ({daysLeft} days left)
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending Approval
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30">
            <Loader className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        );
      case "reserved":
        return (
          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/30">
            <Package className="h-3 w-3 mr-1" />
            Reserved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "returned":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Returned
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted/10 text-muted-foreground border-muted/30">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="bg-inherit shadow-none border-none transition-all duration-200 h-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          My Bookings
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Track your borrowed items and payment status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookingsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading bookings...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">No bookings found</div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const today = new Date();
              const returnDateObj = new Date(booking.returnDate);
              const daysLeft = Math.ceil(
                (returnDateObj - today) / (1000 * 60 * 60 * 24)
              );
              const isOverdue = booking.status === "approved" && daysLeft < 0;

              return (
                <div
                  key={booking._id}
                  className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200 bg-background/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {booking?.category}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {booking.quantity}
                        </p>
                      </div>
                      {getStatusBadge(
                        booking.status,
                        booking.borrowDate,
                        booking.returnDate
                      )}
                    </div>

                    <div className="space-y-1">
                      {getDeliveryStatusBadge(booking.deliveryMethod)}
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Purpose:</span>
                        <span className="text-foreground font-medium">
                          {booking.purpose}
                        </span>
                      </div>
                      {booking.eventLocation && (
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span className="text-foreground font-medium">
                            {booking.eventLocation}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Contact:</span>
                        <span className="text-foreground font-medium">
                          {booking.contactNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Borrow Date:</span>
                        <span className="text-foreground font-medium">
                          {new Date(booking.borrowDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Return Date:</span>
                        <span
                          className={`font-medium ${
                            isOverdue ? "text-destructive" : "text-foreground"
                          }`}
                        >
                          {new Date(booking.returnDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {isOverdue && (
                      <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                        <p className="text-destructive font-medium">
                          Overdue Notice
                        </p>
                        <p className="text-destructive/80">
                          Please return immediately to barangay office
                        </p>
                      </div>
                    )}

                    {booking.status === "pending" && (
                      <div className="p-2 bg-warning/10 border border-warning/20 rounded text-sm">
                        <p className="text-warning font-medium">
                          Pending Approval
                        </p>
                        <p className="text-warning/80">
                          Admin will review your booking request
                        </p>
                      </div>
                    )}

                    {booking.status === "processing" && (
                      <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                        <p className="text-blue-500 font-medium">
                          Processing Request
                        </p>
                        <p className="text-blue-500/80">
                          Your booking is currently being processed
                        </p>
                      </div>
                    )}

                    {booking.status === "reserved" && (
                      <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-sm">
                        <p className="text-purple-500 font-medium">
                          Reserved
                        </p>
                        <p className="text-purple-500/80">
                          Item is reserved for you. Please pick up on time.
                        </p>
                      </div>
                    )}

                    {booking.status === "rejected" && (
                      <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                        <p className="text-destructive font-medium">
                          Request Rejected
                        </p>
                        <p className="text-destructive/80">
                          Your booking request was not approved
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {booking.status === "approved" && !isOverdue && (
                        <Button
                          size="sm"
                          className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                          onClick={() =>
                            onUpdateReq(
                              booking._id,
                              booking.main_item,
                              booking.quantity
                            )
                          }
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark as Returned
                        </Button>
                      )}
                      {booking.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-warning/30 text-warning hover:bg-warning/10"
                          disabled
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Awaiting Approval
                        </Button>
                      )}
                      {booking.status === "processing" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
                          disabled
                        >
                          <Loader className="h-3 w-3 mr-1" />
                          Processing
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { BookingCard };