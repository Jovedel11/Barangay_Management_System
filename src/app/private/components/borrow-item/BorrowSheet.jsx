import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/core/components/ui/sheet";
import { Label } from "@/core/components/ui/label";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
  Armchair,
  Laptop,
  Tent,
  Wrench,
  Home,
  Truck,
  Info,
  Plus,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import customRequest from "@/services/customRequest";
import { CustomToast } from "@/components/custom/CustomToast";
import { useAuth } from "@/hooks/useAuthProvider";
import { useQueryClient } from "@tanstack/react-query";

const BorrowSheet = ({ selectedItem, open, onOpenChange, refetch }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [bookingForm, setBookingForm] = useState({
    category: "",
    quantity: 1,
    borrowDate: "",
    returnDate: "",
    purpose: "",
    eventLocation: "",
    contactNumber: "",
    deliveryMethod: "",
  });

  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);

  const getCategoryIcon = (category) => {
    const iconMap = {
      Furniture: Armchair,
      Electronics: Laptop,
      "Shelter & Tents": Tent,
      "Tools & Equipment": Wrench,
    };
    return iconMap[category] || Wrench;
  };

  const getConditionBadge = (condition) => {
    const conditionStyles = {
      Excellent: "bg-green-500/10 text-green-600 border-green-500/30",
      Good: "bg-blue-500/10 text-blue-600 border-blue-500/30",
      Fair: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      Poor: "bg-red-500/10 text-red-600 border-red-500/30",
    };
    return (
      <Badge className={conditionStyles[condition] || conditionStyles.Good}>
        {condition}
      </Badge>
    );
  };

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  // Check availability when dates change
  const checkAvailability = useCallback(async () => {
    if (
      !selectedItem?._id ||
      !bookingForm.borrowDate ||
      !bookingForm.returnDate
    ) {
      setAvailability(null);
      return;
    }

    const borrowDate = new Date(bookingForm.borrowDate);
    const returnDate = new Date(bookingForm.returnDate);

    if (returnDate <= borrowDate) {
      setAvailability(null);
      return;
    }

    setCheckingAvailability(true);
    setAvailabilityError(null);

    try {
      const result = await customRequest({
        path: `/api/borrow-item/items/${selectedItem._id}/check-availability`,
        attributes: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            borrowDate: bookingForm.borrowDate,
            returnDate: bookingForm.returnDate,
          }),
          credentials: "include",
        },
      });

      if (result?.success) {
        setAvailability(result?.response?.data);
      } else {
        setAvailabilityError("Failed to check availability");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setAvailabilityError("Unable to verify availability");
    } finally {
      setCheckingAvailability(false);
    }
  }, [selectedItem, bookingForm.borrowDate, bookingForm.returnDate]);

  // Trigger availability check when dates change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkAvailability();
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [checkAvailability]);

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !bookingForm.quantity ||
      bookingForm.quantity === 0 ||
      !bookingForm.borrowDate.trim() ||
      !bookingForm.returnDate ||
      !bookingForm.purpose ||
      !bookingForm.eventLocation.trim() ||
      !bookingForm.deliveryMethod.trim();

    if (anyEmpty) return true;
    return false;
  }, [bookingForm]);

  useEffect(() => {
    if (selectedItem) {
      setBookingForm({
        category: selectedItem?.category ?? "",
        quantity: 1,
        borrowDate: new Date().toISOString().split("T")[0],
        returnDate: "",
        purpose: "",
        eventLocation: "",
        contactNumber: "",
        deliveryMethod: selectedItem?.deliveryAvailable ? "delivery" : "pickup",
      });
      setAvailability(null);
      setAvailabilityError(null);
    }
  }, [selectedItem]);

  const Icon = selectedItem ? getCategoryIcon(selectedItem.category) : Wrench;

  const handleSubmit = useCallback(async () => {
    try {
      if (!bookingForm.borrowDate || !bookingForm.returnDate) {
        return CustomToast({
          description: "Borrow date and Return date are required",
          status: "error",
        });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const borrowDate = new Date(bookingForm.borrowDate);
      const returnDate = new Date(bookingForm.returnDate);
      const diffInTime = returnDate.getTime() - borrowDate.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

      if (diffInDays > selectedItem.maxBorrowDays) {
        return CustomToast({
          description: `Return date must not be longer than ${
            selectedItem.maxBorrowDays
          } ${
            selectedItem.maxBorrowDays === 1 ? "day" : "days"
          } from borrow date.`,
          status: "error",
        });
      }

      if (borrowDate < today) {
        return CustomToast({
          description: "Borrow date cannot be in the past",
          status: "error",
        });
      }

      if (returnDate < today) {
        return CustomToast({
          description: "Return date cannot be in the past",
          status: "error",
        });
      }

      if (returnDate <= borrowDate) {
        return CustomToast({
          description: "Return date must be after the borrow date",
          status: "error",
        });
      }

      // Check against real-time availability
      if (availability && bookingForm.quantity > availability.available) {
        return CustomToast({
          description: `Only ${availability.available} unit(s) available for the selected dates`,
          status: "error",
        });
      }

      const payload = {
        user: user._id,
        main_item: selectedItem._id,
        ...bookingForm,
        borrowDate: new Date(bookingForm.borrowDate).toISOString(),
        returnDate: new Date(bookingForm.returnDate).toISOString(),
      };

      const result = await customRequest({
        path: "/api/borrow-item/request/insert",
        attributes: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...payload }),
          credentials: "include",
        },
      });

      if (result?.success) {
        refetch();
        queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
        CustomToast({
          description: "Item successfully booked",
          status: "success",
        });
        return onOpenChange();
      }
      CustomToast({
        description: "Item booking failed",
        status: "error",
      });
    } catch (error) {
      console.error("Error submitting:", error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    }
  }, [
    bookingForm,
    refetch,
    onOpenChange,
    user,
    queryClient,
    selectedItem,
    availability,
  ]);

  const isQuantityExceeded =
    availability && bookingForm.quantity > availability.available;
  const canSubmit =
    !nothingChanged && !isQuantityExceeded && availability !== null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] w-full md:max-w-[28rem] overflow-y-auto gap-y-0 font-inter dark:bg-slate-900 flex flex-col">
        {selectedItem && (
          <>
            <SheetHeader className="text-left">
              <SheetTitle className="flex items-center gap-2 font-inter text-xl">
                Book {selectedItem?.category}
              </SheetTitle>
              <SheetDescription className="text-sm">
                Reserve this item • Payment at barangay office
              </SheetDescription>
            </SheetHeader>

            <div className="w-full flex flex-col gap-y-4 px-4">
              {/* Item Info */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Item Details</span>
                  {getConditionBadge(selectedItem?.condition)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedItem?.description}
                </p>
              </div>

              {/* Dates - Moved before Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full flex flex-col gap-y-1">
                  <Label htmlFor="borrowDate">Borrow Date</Label>
                  <Input
                    id="borrowDate"
                    type="date"
                    value={bookingForm.borrowDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={bookingForm.returnDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {bookingForm.borrowDate &&
                bookingForm.returnDate &&
                bookingForm.borrowDate === bookingForm.returnDate && (
                  <div className="p-3 border rounded-lg bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />

                      <div className="flex-1">
                        <p className="font-medium text-sm text-red-900 dark:text-red-100">
                          Borrow and return dates cannot be the same day
                        </p>

                        <p className="text-xs mt-1 text-red-700 dark:text-red-300">
                          Choosing the same day for borrowing and returning may
                          cause scheduling conflicts, since items are reserved
                          for the entire day. Please select a different return
                          date.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Availability Status */}
              {checkingAvailability && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    <span className="text-sm text-blue-900 dark:text-blue-100">
                      Checking availability...
                    </span>
                  </div>
                </div>
              )}

              {!checkingAvailability && availability && (
                <div
                  className={`p-3 border rounded-lg ${
                    availability.available > 0
                      ? "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {availability.available > 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}

                    <div className="flex-1">
                      {/* Main message */}
                      <p
                        className={`font-medium text-sm ${
                          availability.available > 0
                            ? "text-green-900 dark:text-green-100"
                            : "text-red-900 dark:text-red-100"
                        }`}
                      >
                        {availability.available > 0
                          ? `${availability.available} of ${availability.total} units available`
                          : "No units available for the selected dates"}
                      </p>

                      {/* Reservation summary */}
                      <p
                        className={`text-xs mt-1 ${
                          availability.available > 0
                            ? "text-green-700 dark:text-green-200"
                            : "text-red-700 dark:text-red-200"
                        }`}
                      >
                        {availability.available > 0
                          ? `${availability.reserved} unit(s) reserved during this period.`
                          : "All units are already reserved or not yet returned."}
                      </p>

                      {/* Extra instruction when unavailable */}
                      {availability.available === 0 && (
                        <p className="text-xs mt-1 text-red-700 dark:text-red-300">
                          Please choose a different borrow and return date.
                        </p>
                      )}

                      {/* Conflict count */}
                      {availability.conflicts?.length > 0 && (
                        <p className="text-xs mt-1 text-muted-foreground">
                          {availability.conflicts.length} conflicting booking(s)
                          found.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {availabilityError && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-900 dark:text-yellow-100">
                      {availabilityError}
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full flex flex-col gap-y-1">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={availability?.available || selectedItem?.available}
                    value={bookingForm.quantity}
                    onChange={handleChange}
                    className={
                      isQuantityExceeded
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {isQuantityExceeded && (
                    <p className="text-xs text-red-600 mt-1">
                      Exceeds available quantity
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <Label>Currently Available</Label>
                  <p
                    className={`text-lg font-bold mt-2 ${
                      availability
                        ? availability.available > 0
                          ? "text-green-600"
                          : "text-red-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {availability
                      ? `${availability?.available ?? selectedItem?.total} / ${
                          availability?.total ?? 0
                        } units`
                      : `${selectedItem?.available ?? selectedItem?.total} / ${
                          selectedItem?.total ?? 0
                        } units`}
                  </p>
                </div>
              </div>

              {/* Purpose */}
              <div className="w-full flex flex-col gap-y-1">
                <Label htmlFor="purpose">Purpose/Event</Label>
                <Input
                  id="purpose"
                  placeholder="e.g., Birthday party, Wedding, Meeting"
                  value={bookingForm.purpose}
                  onChange={handleChange}
                />
              </div>

              {/* Event Location */}
              <div className="w-full flex flex-col gap-y-1">
                <Label htmlFor="eventLocation">Event Location</Label>
                <Input
                  id="eventLocation"
                  placeholder="Complete address"
                  value={bookingForm.eventLocation}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Number */}
              <div className="w-full flex flex-col gap-y-1">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  placeholder="09XXXXXXXXX"
                  value={bookingForm.contactNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Collection Method */}
              <div className="w-full flex flex-col gap-y-3">
                <Label>Collection Method</Label>
                <div className="flex flex-col space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setBookingForm((prev) => ({
                        ...prev,
                        deliveryMethod:
                          prev.deliveryMethod === "pickup" ? "" : "pickup",
                      }))
                    }
                    className={`flex items-center justify-start gap-3 p-8 border rounded-lg transition-colors text-left ${
                      bookingForm.deliveryMethod === "pickup"
                        ? "border-blue-400 bg-blue-50 dark:bg-blue-800/30 dark:border-blue-600"
                        : "border-muted bg-transparent"
                    }`}
                  >
                    <Home className="h-4 w-4 text-primary" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">
                        Walk-in Pickup at Barangay Office
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Pay cash and collect at barangay hall
                      </p>
                    </div>
                  </Button>

                  {!selectedItem?.deliveryAvailable && (
                    <div className="p-4 border rounded-md border-slate-300 dark:border-slate-800 bg-blue-50 dark:bg-blue-950/40">
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        <span className="font-semibold">Pickup only</span> –
                        Delivery is not available at this time.
                      </p>
                    </div>
                  )}

                  {selectedItem?.deliveryAvailable && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setBookingForm((prev) => ({
                          ...prev,
                          deliveryMethod:
                            prev.deliveryMethod === "delivery"
                              ? ""
                              : "delivery",
                        }))
                      }
                      className={`flex items-center justify-start gap-3 p-8 border rounded-lg transition-colors text-left ${
                        bookingForm.deliveryMethod === "delivery"
                          ? "border-blue-400 bg-blue-50 dark:bg-blue-800/30 dark:border-blue-600"
                          : "border-muted bg-transparent"
                      }`}
                    >
                      <Truck className="h-4 w-4 text-accent" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-sm">
                          Home Delivery
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Cash on delivery (COD) payment
                        </p>
                      </div>
                    </Button>
                  )}
                </div>
              </div>

              {/* Requirements */}
              {selectedItem?.requirements &&
                selectedItem?.requirements !== "N/A" && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Label className="text-sm font-medium">
                      Requirements to bring:
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      {selectedItem?.requirements}
                    </p>
                  </div>
                )}

              {/* Notes */}
              {selectedItem?.notes && selectedItem?.notes !== "N/A" && (
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">
                        Important Notes:
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {selectedItem?.notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <SheetFooter className="flex flex-row justify-end gap-x-2 mt-4">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70"
                >
                  Cancel
                </Button>
              </SheetClose>
              <Button
                className="rounded-sm transition-all active:scale-95"
                onClick={handleSubmit}
                disabled={!canSubmit || checkingAvailability}
              >
                {checkingAvailability ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Booking Request
                  </>
                )}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BorrowSheet;
