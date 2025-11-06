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
  Wallet,
  Info,
  Plus,
} from "lucide-react";
import customRequest from "@/services/customRequest";
import { CustomToast } from "@/components/custom/CustomToast";
import { useAuth } from "@/hooks/useAuthProvider";
import { useQueryClient } from "@tanstack/react-query";

const BorrowSheet = ({ selectedItem, open, onOpenChange, refetch }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth(); // Retreiving the User when they successfully login
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

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !bookingForm.quantity === 0 ||
      !bookingForm.borrowDate.trim() ||
      !bookingForm.returnDate ||
      !bookingForm.purpose ||
      !bookingForm.eventLocation.trim() ||
      !bookingForm.deliveryMethod.trim();

    if (anyEmpty) return true;
    return (
      bookingForm.quantity === 1 &&
      !bookingForm.borrowDate &&
      !bookingForm.returnDate &&
      !bookingForm.purpose.trim() &&
      !bookingForm.eventLocation.trim() &&
      !bookingForm.contactNumber.trim()
    );
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

      if (bookingForm.quantity > selectedItem.available) {
        return CustomToast({
          description: "Your request exceeded the available items",
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
      console.log(payload);
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
      console.log(user._id);
      console.error("Error submitting:", error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    }
  }, [bookingForm, refetch, onOpenChange, user, queryClient, selectedItem]);

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

              {/* Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full flex flex-col gap-y-1">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedItem?.available}
                    value={bookingForm.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <Label>Available</Label>
                  <p className="text-lg font-bold text-green-600 mt-2">
                    {selectedItem?.available} / {selectedItem?.total} units
                  </p>
                </div>
              </div>

              {/* Dates */}
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
              {selectedItem?.deliveryAvailable && (
                <div className="w-full flex flex-col gap-y-3">
                  <Label>Collection Method</Label>
                  <div className="flex flex-col space-y-2">
                    {/* Pickup Button */}
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

                    {/* Delivery Button */}
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
                  </div>
                </div>
              )}

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

              {/* Payment Info */}
              <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Wallet className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-yellow-600">
                      Payment Information:
                    </Label>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      <p>
                        <strong>Fee:</strong> ₱{selectedItem?.borrowingFee}
                      </p>
                      <p>
                        <strong>Payment:</strong> Cash only at barangay office
                      </p>
                      {bookingForm.deliveryMethod === "delivery" && (
                        <p>
                          <strong>Delivery:</strong>{" "}
                        </p>
                      )}
                      <p>
                        <strong>Max period:</strong>{" "}
                        {selectedItem?.maxBorrowDays} days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                disabled={nothingChanged || selectedItem?.available === 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Booking Request
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BorrowSheet;
