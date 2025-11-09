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
import { CustomToast } from "./CustomToast";
import customRequest from "@/services/customRequest";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ItemBookingTable({ bookings = [], refetch }) {
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Only fetch item details when sheet is open and we have a selected booking
  const {
    data: itemData,
    isLoading: itemLoading,
    error: itemError,
    refetch: refetchItemData,
  } = useQuery({
    queryKey: ["request/items", selectedBooking?._id],
    queryFn: () =>
      customRequest({
        path: `/api/borrow-item/request/specific/item?item_id=${selectedBooking?._id}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    enabled: isSheetOpen && !!selectedBooking?._id,
  });

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
        refetch();
        refetchItemData();
        queryClient.invalidateQueries({
          queryKey: ["available/items"],
        });
        queryClient.invalidateQueries({
          queryKey: ["request/items", selectedBooking?.main_item],
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "reserved":
        return <Package className="h-4 w-4" />;
      case "returned":
        return <Check className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Check if there's enough stock available for approval
  // Fixed: Access main_item directly from itemData since the API returns it at the root level
  const hasAvailableStock = (booking) => {
    if (!itemData?.response?.main_item) return false;
    return itemData.response.main_item.available >= booking.quantity;
  };

  // Get available stock count
  const getAvailableStock = () => {
    if (!itemData?.response?.main_item) return { available: 0, total: 0 };
    return {
      available: itemData.response.main_item.available,
      total: itemData.response.main_item.total,
    };
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
                <TableHead>Mode of Delivery</TableHead>
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
                        <div className="flex flex-col">
                          <span className="text-sm">
                            Borrow: {formatDate(booking.borrowDate)}
                          </span>
                          <span className="text-sm text-zinc-400">
                            Return: {formatDate(booking.returnDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize pl-10">
                        {getDeliveryMethod(booking)}
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
        <SheetContent className="w-full md:max-w-100 sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Booking Details</SheetTitle>
            <SheetDescription>
              View and manage equipment booking information
            </SheetDescription>
          </SheetHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Loading State for Item Data */}
              {itemLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}

              {/* Error State for Item Data */}
              {itemError && (
                <div className="mx-4 mb-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        Failed to load item details
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        Please try again or contact support if the issue
                        persists.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Show content only when item data is loaded */}
              {!itemLoading && !itemError && (
                <>
                  {/* Stock Availability Warning - Custom Notice */}
                  {!hasAvailableStock(selectedBooking) && (
                    <div className="mx-4 mb-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Insufficient Stock Available
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                            Current available stock:{" "}
                            <strong>{getAvailableStock().available}</strong> |
                            Requested quantity:{" "}
                            <strong>{selectedBooking.quantity}</strong>
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                            You can only mark this as "Reserved" until stock
                            becomes available.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg mx-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Update Status</h4>
                      <Badge
                        variant={getBookingStatus(selectedBooking).variant}
                      >
                        {getBookingStatus(selectedBooking).label}
                      </Badge>
                    </div>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                      disabled={updateMutation.isPending}
                    >
                      <SelectTrigger className="w-full relative border! border-slate-300! dark:border-slate-700!">
                        <SelectValue placeholder="Select status" />
                        {selectedStatus === "pending" && (
                          <span className="absolute left-5">Select status</span>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rejected">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4" />
                            <span>Mark as Rejected</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="approved"
                          disabled={!hasAvailableStock(selectedBooking)}
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Approved</span>
                            {!hasAvailableStock(selectedBooking) && (
                              <span className="text-xs text-muted-foreground ml-1">
                                (Insufficient stock)
                              </span>
                            )}
                          </div>
                        </SelectItem>
                        <SelectItem value="reserved">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>Mark as Reserved</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="returned">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            <span>Mark as Returned</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleStatusUpdate}
                      disabled={
                        updateMutation.isPending ||
                        selectedStatus === selectedBooking.status
                      }
                      className="w-full"
                    >
                      {updateMutation.isPending ? (
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
                  {itemData?.response?.main_item && (
                    <div className="space-y-4 px-5 pb-4 border-b">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Stock Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Available Stock
                          </p>
                          <p className="text-sm font-medium">
                            {getAvailableStock().available} /{" "}
                            {getAvailableStock().total}
                          </p>
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
                    </div>
                  )}
                </>
              )}

              {/* Booking Details - Always show these */}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Delivery Method
                      </p>
                      <p className="text-sm font-medium capitalize">
                        {getDeliveryMethod(selectedBooking)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Event Location
                      </p>
                      <p className="text-sm font-medium">
                        {selectedBooking?.eventLocation || "N/A"}
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

              {/* Delete Section (only for completed bookings) */}
              {selectedBooking.status === "completed" && (
                <div className="pt-4 border-t px-5">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      handleBookingDeletion(selectedBooking._id);
                      setIsSheetOpen(false);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
