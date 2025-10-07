import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";

const MyBookings = ({ userBookings }) => {
  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 h-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-accent" />
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
        ) : (
          <div className="space-y-4s">
            {userBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200 bg-background/50"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {booking.itemName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {booking.quantity}
                      </p>
                    </div>
                    {getStatusBadge(booking.status, booking.daysLeft)}
                  </div>

                  <div className="space-y-1">
                    {getDeliveryStatusBadge(
                      booking.deliveryMethod,
                      booking.deliveryStatus,
                      booking.paymentStatus
                    )}
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Purpose:</span>
                      <span className="text-foreground font-medium">
                        {booking.purpose}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="text-foreground font-medium">
                        {booking.totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment:</span>
                      <span
                        className={`font-medium ${
                          booking.paymentStatus === "paid"
                            ? "text-success"
                            : "text-warning"
                        }`}
                      >
                        {booking.paymentStatus === "paid"
                          ? "Paid at Office"
                          : "Pending - Walk-in"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return Date:</span>
                      <span
                        className={`font-medium ${
                          booking.status === "overdue"
                            ? "text-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {booking.status === "overdue" && (
                    <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                      <p className="text-destructive font-medium">
                        Overdue Notice
                      </p>
                      <p className="text-destructive/80">
                        Please return immediately to barangay office
                      </p>
                    </div>
                  )}

                  {booking.status === "pending_approval" && (
                    <div className="p-2 bg-warning/10 border border-warning/20 rounded text-sm">
                      <p className="text-warning font-medium">
                        Pending Approval
                      </p>
                      <p className="text-warning/80">
                        Admin will review your booking request
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {booking.status === "active" && (
                      <Button
                        size="sm"
                        className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                        onClick={() => handleMarkAsReturned(booking.id)}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark as Returned
                      </Button>
                    )}
                    {booking.status === "overdue" && (
                      <Button
                        size="sm"
                        className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        onClick={() => handleMarkAsReturned(booking.id)}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Return Now
                      </Button>
                    )}
                    {booking.status === "pending_approval" && (
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          className="w-full mt-4 border-primary/30 text-primary hover:bg-primary/10"
        >
          View Booking History
        </Button>
      </CardContent>
    </Card>
  );
};
