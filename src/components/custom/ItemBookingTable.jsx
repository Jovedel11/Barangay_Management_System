import {
  CheckCircle,
  Loader,
  MoreHorizontal,
  Trash2,
  AlertCircle,
  Check,
  X,
  Clock,
  Package,
  XCircle,
  AlertTriangle,
  CalendarX,
  Users,
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
import { Button } from "@/core/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/core/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import { CustomToast } from "./CustomToast";

export default function ItemBookingTable({ bookings = [], refetch }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setSelectedStatus(booking.status);
    setIsSheetOpen(true);
  };

  const getBookingStatus = (booking) => {
    const currentDate = new Date();
    const returnDate = new Date(booking.returnDate);

    if (booking.status === "returned") {
      return { label: "Returned", variant: "returned" };
    }

    if (booking.status === "rejected") {
      return { label: "Rejected", variant: "rejected" };
    }

    if (booking.status === "reserved") {
      return { label: "Reserved", variant: "reserved" };
    }

    if (booking.status === "processing") {
      return { label: "Processing", variant: "processing" };
    }

    if (booking.status === "approved" && currentDate > returnDate) {
      return { label: "Overdue", variant: "overdue" };
    }

    if (booking.status === "approved") {
      return { label: "Approved", variant: "approved" };
    }

    return { label: "Pending", variant: "pending" };
  };

  // ✅ FIXED: Safely get availability info with proper fallbacks
  const getAvailabilityInfo = (booking) => {
    // If availabilityInfo exists, use it
    if (booking.availabilityInfo) {
      return {
        available: booking.availabilityInfo.available || 0,
        total: booking.availabilityInfo.total || 0,
        reserved: booking.availabilityInfo.reserved || 0,
        canApprove: booking.availabilityInfo.canApprove || false,
        conflicts: booking.availabilityInfo.conflicts || [],
      };
    }

    // ✅ Fallback: Use item data if available
    if (booking.item && typeof booking.item.total === "number") {
      return {
        available: 0, // We don't know without calculation
        total: booking.item.total,
        reserved: 0,
        canApprove: false,
        conflicts: [],
      };
    }

    // ✅ Final fallback: Return zeros
    console.warn(`Missing availability data for booking ${booking._id}`);
    return {
      available: 0,
      total: 0,
      reserved: 0,
      canApprove: false,
      conflicts: [],
    };
  };

  // ✅ FIXED: Determine if this booking can be approved
  const canApproveBooking = (booking) => {
    if (booking.status !== "pending") return false;
    const info = getAvailabilityInfo(booking);

    // If we have availabilityInfo from backend, trust it
    if (booking.availabilityInfo) {
      return info.canApprove;
    }

    // Otherwise, do basic check if we have item data
    if (booking.item && typeof booking.item.total === "number") {
      // Conservative check: only approve if we have total data
      return booking.quantity <= booking.item.total;
    }

    return false;
  };

  // ✅ FIXED: Get availability status for display
  const getAvailabilityStatus = (booking) => {
    if (["returned", "rejected"].includes(booking.status)) {
      return null;
    }

    const info = getAvailabilityInfo(booking);

    // If no total data available, show warning
    if (info.total === 0) {
      return {
        type: "error",
        message: "Item data unavailable",
        icon: <AlertCircle className="h-4 w-4" />,
        variant: "error",
      };
    }

    if (booking.status === "approved") {
      return {
        type: "approved",
        message: `Reserved: ${booking.quantity}/${info.total} units`,
        icon: <CheckCircle className="h-4 w-4" />,
        variant: "success",
      };
    }

    if (booking.status === "pending") {
      // If we have availabilityInfo from backend, use it
      if (booking.availabilityInfo) {
        if (info.canApprove) {
          return {
            type: "available",
            message: `Available: ${info.available}/${info.total} units`,
            icon: <CheckCircle className="h-4 w-4" />,
            variant: "success",
          };
        } else {
          return {
            type: "unavailable",
            message: `Only ${info.available}/${info.total} available (needs ${booking.quantity})`,
            icon: <AlertTriangle className="h-4 w-4" />,
            variant: "warning",
          };
        }
      } else {
        // No availabilityInfo, show basic stock info
        return {
          type: "unknown",
          message: `Total stock: ${info.total} units`,
          icon: <AlertCircle className="h-4 w-4" />,
          variant: "default",
        };
      }
    }

    return null;
  };

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return customRequest(data);
    },
    onSuccess: ({ success }) => {
      if (success) {
        setIsUpdating(false);
        queryClient.invalidateQueries({
          queryKey: ["available/items"],
        });
        queryClient.invalidateQueries({
          queryKey: ["request/items"],
        });
        setIsSheetOpen(false);
        return CustomToast({
          description: "Booking status has been updated successfully!",
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

  const handleStatusUpdate = useCallback(() => {
    if (!selectedBooking || !selectedStatus) return;
    setIsUpdating(true);

    updateMutation.mutate({
      path: "/api/borrow-item/update/item-request",
      attributes: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docs_id: selectedBooking._id,
          status: selectedStatus,
          main_item: selectedBooking.main_item,
          quantity: selectedBooking.quantity,
        }),
        credentials: "include",
      },
    });
  }, [selectedBooking, selectedStatus, updateMutation]);

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
                <TableHead>Availability</TableHead>
                <TableHead>Dates</TableHead>
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
                  const availabilityStatus = getAvailabilityStatus(booking);
                  const info = getAvailabilityInfo(booking);

                  return (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>
                            {`${booking?.user?.firstName || ""} ${
                              booking?.user?.lastName || ""
                            }`}
                          </span>
                          <span className="text-zinc-400 text-sm">
                            {booking?.user?.email || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {booking.category}
                          </span>
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
                        {availabilityStatus ? (
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                                availabilityStatus.variant === "success"
                                  ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                                  : availabilityStatus.variant === "warning"
                                  ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                  : availabilityStatus.variant === "error"
                                  ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                                  : "bg-gray-50 text-gray-700 dark:bg-gray-950/30 dark:text-gray-400"
                              }`}
                            >
                              {availabilityStatus.icon}
                              <span>{availabilityStatus.message}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            -
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">
                            {formatDate(booking.borrowDate)}
                          </span>
                          <span className="text-sm text-zinc-400">
                            to {formatDate(booking.returnDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetails(booking)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full md:max-w-100 sm:max-w-lg overflow-y-auto pb-10">
          <SheetHeader>
            <SheetTitle>Booking Details</SheetTitle>
            <SheetDescription>
              View and manage equipment booking information
            </SheetDescription>
          </SheetHeader>

          {selectedBooking && (
            <div className="space-y-6 mt-6">
              {/* Availability Warning/Info - Top Priority */}
              {!["returned", "rejected"].includes(selectedBooking.status) && (
                <>
                  {!canApproveBooking(selectedBooking) &&
                  selectedBooking.status === "pending" ? (
                    <div className="mx-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Insufficient Stock
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                            Only{" "}
                            <strong>
                              {getAvailabilityInfo(selectedBooking).available}
                            </strong>{" "}
                            unit(s) available for these dates. Request needs{" "}
                            <strong>{selectedBooking.quantity}</strong> unit(s).
                          </p>
                          {getAvailabilityInfo(selectedBooking).conflicts
                            ?.length > 0 && (
                            <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                              <strong>
                                {getAvailabilityInfo(selectedBooking).reserved}
                              </strong>{" "}
                              unit(s) are already reserved by other bookings
                              during this period.
                            </p>
                          )}
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                            You may mark this as <strong>"Reserved"</strong>{" "}
                            until stock becomes available.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : selectedBooking.status === "approved" ? (
                    <div className="mx-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200">
                            Booking Confirmed
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            <strong>{selectedBooking.quantity}</strong> unit(s)
                            reserved for this booking.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    canApproveBooking(selectedBooking) && (
                      <div className="mx-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                              Stock Available
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                              <strong>
                                {getAvailabilityInfo(selectedBooking).available}
                              </strong>{" "}
                              unit(s) available. This request can be approved.
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Conflicts Section */}
                  {getAvailabilityInfo(selectedBooking).conflicts?.length >
                    0 && (
                    <div className="mx-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            Overlapping Bookings (
                            {
                              getAvailabilityInfo(selectedBooking).conflicts
                                .length
                            }
                            )
                          </p>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {getAvailabilityInfo(selectedBooking).conflicts.map(
                              (conflict, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-blue-800 dark:text-blue-200 pb-2 border-b border-blue-200 dark:border-blue-800 last:border-0"
                                >
                                  <p className="font-medium">
                                    {conflict.user?.firstName}{" "}
                                    {conflict.user?.lastName} -{" "}
                                    {conflict.quantity} unit(s)
                                  </p>
                                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
                                    {formatDate(conflict.borrowDate)} to{" "}
                                    {formatDate(conflict.returnDate)}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Status Update Section */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg mx-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Update Status</h4>
                  <Badge variant={getBookingStatus(selectedBooking).variant}>
                    {getBookingStatus(selectedBooking).label}
                  </Badge>
                </div>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-full border border-zinc-300 dark:border-slate-700">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedBooking?.status !== "rejected" && (
                      <SelectItem value="rejected">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          <span>Mark as Rejected</span>
                        </div>
                      </SelectItem>
                    )}
                    {selectedBooking?.status !== "approved" &&
                      selectedBooking?.status !== "returned" && (
                        <SelectItem
                          value="approved"
                          disabled={!canApproveBooking(selectedBooking)}
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Approved</span>
                            {!canApproveBooking(selectedBooking) && (
                              <span className="text-xs text-muted-foreground ml-1">
                                (Insufficient stock)
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      )}
                    {selectedBooking?.status !== "pending" &&
                      selectedBooking?.status !== "rejected" && (
                        <SelectItem value="returned">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            <span>Mark as Returned</span>
                          </div>
                        </SelectItem>
                      )}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={
                    isUpdating || selectedStatus === selectedBooking.status
                  }
                  className="w-full"
                >
                  {isUpdating ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </div>

              {/* Stock Information */}
              <div className="space-y-4 px-5 pb-4 border-b">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Stock Information
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Total Stock
                    </p>
                    <p className="text-sm font-medium">
                      {getAvailabilityInfo(selectedBooking).total}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Available
                    </p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      {getAvailabilityInfo(selectedBooking).available}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Reserved
                    </p>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                      {getAvailabilityInfo(selectedBooking).reserved}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Requested Quantity
                  </p>
                  <p className="text-sm font-medium">
                    {selectedBooking.quantity}
                  </p>
                </div>
              </div>

              {/* Resident & Booking Information */}
              <div className="space-y-4 px-5">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Resident Information
                </h4>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Full Name
                      </p>
                      <p className="text-sm font-medium">
                        {`${selectedBooking?.user?.firstName || ""} ${
                          selectedBooking?.user?.lastName || ""
                        }`}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Contact Number
                      </p>
                      <p className="text-sm font-medium">
                        {selectedBooking?.contactNumber}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-medium">
                      {selectedBooking?.user?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 px-5">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Booking Information
                </h4>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Category
                      </p>
                      <p className="text-sm font-medium">
                        {selectedBooking?.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Quantity
                      </p>
                      <p className="text-sm font-medium">
                        {selectedBooking?.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Borrow Date
                      </p>
                      <p className="text-sm font-medium">
                        {formatDate(selectedBooking?.borrowDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Return Date
                      </p>
                      <p className="text-sm font-medium">
                        {formatDate(selectedBooking?.returnDate)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Purpose
                    </p>
                    <p className="text-sm font-medium">
                      {selectedBooking?.purpose ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
