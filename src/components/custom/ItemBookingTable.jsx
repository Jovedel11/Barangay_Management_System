import {
  CheckCircle,
  Eye,
  Loader,
  MoreHorizontal,
  Trash2,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CustomToast } from "./CustomToast";
import customRequest from "@/services/customRequest";
import { Fragment, useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ItemBookingTable({ bookings = [], refetch }) {
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const getBookingStatus = (booking) => {
    const currentDate = new Date();
    const returnDate = new Date(booking.returnDate);

    if (booking.status === "completed") {
      return { label: "Completed", variant: "default" };
    }

    if (booking.status === "approved" && currentDate > returnDate) {
      return { label: "Overdue", variant: "destructive" };
    }

    if (booking.status === "approved") {
      return { label: "Approved", variant: "default" };
    }

    return { label: "Pending Approval", variant: "secondary" };
  };

  const getDeliveryMethod = (booking) => {
    const specialReqs = booking.specialRequirements || {};
    if (specialReqs.isSenior || specialReqs.isPregnant) {
      return "COD Delivery";
    }
    return booking.deliveryMethod;
  };

  const handleBookingDeletion = async (bookingId) => {
    try {
      if (!bookingId) throw new Error();
      const result = await customRequest({
        path: "/api/borrow-item/delete",
        attributes: {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_id: bookingId }),
        },
      });
      if (!result?.success) {
        return CustomToast({
          description: "Failed to delete the booking",
          status: "error",
        });
      }
      refetch();
      CustomToast({
        description: "Booking has been deleted successfully",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      CustomToast({
        description: "Internal server error",
        status: "error",
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return customRequest(data);
    },
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: ["request/items"],
        });
        return CustomToast({
          description: "Booking status has been updated!",
          status: "success",
        });
      }
      return CustomToast({
        description: "Failed to update status",
        status: "error",
      });
    },
    onError: (error) => {
      console.log(error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    },
  });

  const handleProcessBooking = useCallback(
    async (booking) => {
      try {
        const currentDate = new Date();
        const returnDate = new Date(booking.returnDate);

        let newStatus;
        if (booking.status === "pending") {
          newStatus = "approved";
        } else if (booking.status === "approved" && currentDate > returnDate) {
          newStatus = "overdue";
        } else {
          newStatus = "pending";
        }

        updateMutation.mutate({
          path: "/api/borrow-item/update/item-request",
          attributes: {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docs_id: booking._id,
              status: newStatus,
            }),
            credentials: "include",
          },
        });
      } catch (error) {
        console.error("Error updating booking:", error);
      }
    },
    [updateMutation]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="w-full mt-4 space-y-4">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    <span className="block my-5">No bookings found</span>
                  </TableCell>
                </TableRow>
              ) : (
                bookings?.map((booking) => {
                  const statusInfo = getBookingStatus(booking);
                  return (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>
                            {`${booking?.user?.firstName || ""} ${
                              booking?.user?.lastName || ""
                            }`}
                          </span>
                          <span className="text-zinc-400">
                            {booking?.user?.email || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{booking.purpose}</span>
                          <span className="text-sm text-zinc-400">
                            Qty: {booking.quantity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">
                            Borrow: {formatDate(booking.borrowDate)}
                          </span>
                          <span className="text-sm text-zinc-400">
                            Return: {formatDate(booking.returnDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {getDeliveryMethod(booking)}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-46">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(booking)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {booking.status !== "completed" && (
                              <DropdownMenuItem
                                onClick={() => handleProcessBooking(booking)}
                              >
                                {booking.status === "pending" ? (
                                  <Fragment>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve Booking
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <Loader className="mr-2 h-4 w-4" />
                                    Set to Pending
                                  </Fragment>
                                )}
                              </DropdownMenuItem>
                            )}
                            {booking.status === "completed" && (
                              <Fragment>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() =>
                                    handleBookingDeletion(booking._id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </Fragment>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View complete information about this equipment booking
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Resident Name
                    </h4>
                    <p className="text-base">
                      {`${selectedBooking?.user?.firstName || ""} ${
                        selectedBooking?.user?.lastName || ""
                      }`}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Email
                    </h4>
                    <p className="text-base">
                      {selectedBooking?.user?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Contact Number
                    </h4>
                    <p className="text-base">
                      {selectedBooking?.contactNumber}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Delivery Method
                    </h4>
                    <p className="text-base capitalize">
                      {getDeliveryMethod(selectedBooking)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Purpose
                    </h4>
                    <p className="text-base">{selectedBooking?.purpose}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Event Location
                    </h4>
                    <p className="text-base">
                      {selectedBooking?.eventLocation || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Quantity
                    </h4>
                    <p className="text-base">{selectedBooking?.quantity}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Booking Status
                    </h4>
                    <div className="mt-1">
                      <Badge
                        variant={getBookingStatus(selectedBooking).variant}
                      >
                        {getBookingStatus(selectedBooking).label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Borrow Date
                    </h4>
                    <p className="text-base">
                      {formatDate(selectedBooking?.borrowDate)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Return Date
                    </h4>
                    <p className="text-base">
                      {formatDate(selectedBooking?.returnDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
