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
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group";
import { Label } from "@/core/components/ui/label";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Checkbox } from "@/core/components/ui/checkbox";
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

const BorrowSheet = ({ selectedItem, open, onOpenChange, refetch }) => {
  const [bookingForm, setBookingForm] = useState({
    quantity: 1,
    borrowDate: "",
    returnDate: "",
    purpose: "",
    eventLocation: "",
    contactNumber: "",
    deliveryMethod: "pickup", // pickup or delivery
    specialRequirements: {
      isPregnant: false,
    },
  });

  // Mock user profile - replace with actual user data
  const userProfile = {
    isSenior: false,
    gender: "female",
  };

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
    setBookingForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((field, checked) => {
    setBookingForm((prevState) => ({
      ...prevState,
      specialRequirements: {
        ...prevState.specialRequirements,
        [field]: checked,
      },
    }));
  }, []);

  const nothingChanged = useMemo(() => {
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
        quantity: 1,
        borrowDate: "",
        returnDate: "",
        purpose: "",
        eventLocation: "",
        contactNumber: "",
        deliveryMethod: "pickup",
        specialRequirements: {
          isPregnant: false,
        },
      });
    }
  }, [selectedItem]);

  const Icon = selectedItem ? getCategoryIcon(selectedItem.category) : Wrench;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] md:max-w-[28rem] overflow-y-auto gap-y-0 font-inter dark:bg-slate-900 flex flex-col">
        {selectedItem && (
          <>
            <SheetHeader className="text-left">
              <SheetTitle className="flex items-center gap-2 font-inter">
                <Icon className="h-5 w-5 text-primary" />
                Book {selectedItem?.name}
              </SheetTitle>
              <SheetDescription className="text-sm">
                Reserve this item • Payment at barangay office
              </SheetDescription>
            </SheetHeader>

            <div className="w-full flex flex-col gap-y-4 px-4">
              {/* Item Info Header */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Item Details</span>
                  {getConditionBadge(selectedItem?.condition)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedItem?.description}
                </p>
              </div>

              {/* Quantity and Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full flex flex-col gap-y-1">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedItem?.available}
                    value={bookingForm?.quantity}
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
                    value={bookingForm?.borrowDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={bookingForm?.returnDate}
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
                  value={bookingForm?.purpose}
                  onChange={handleChange}
                />
              </div>

              {/* Event Location */}
              <div className="w-full flex flex-col gap-y-1">
                <Label htmlFor="eventLocation">Event Location</Label>
                <Input
                  id="eventLocation"
                  placeholder="Complete address"
                  value={bookingForm?.eventLocation}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Number */}
              <div className="w-full flex flex-col gap-y-1">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  placeholder="09XXXXXXXXX"
                  value={bookingForm?.contactNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Collection Method Selection */}
              {selectedItem?.deliveryAvailable && (
                <div className="w-full flex flex-col gap-y-3">
                  <Label>Collection Method</Label>
                  <RadioGroup
                    value={bookingForm?.deliveryMethod}
                    onValueChange={(value) =>
                      setBookingForm({
                        ...bookingForm,
                        deliveryMethod: value,
                      })
                    }
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <div className="flex-1">
                        <Label
                          htmlFor="pickup"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Home className="h-4 w-4 text-primary" />
                          Walk-in Pickup at Barangay Office
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Pay cash and collect at barangay hall
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/30">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <div className="flex-1">
                        <Label
                          htmlFor="delivery"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Truck className="h-4 w-4 text-accent" />
                          Home Delivery
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Cash on delivery (COD) payment
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
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

              {/* Payment Information */}
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
                      {bookingForm?.deliveryMethod === "delivery" && (
                        <p>
                          <strong>Delivery:</strong>{" "}
                          {userProfile?.isSenior ||
                          bookingForm?.specialRequirements?.isPregnant
                            ? "Free COD"
                            : "COD with delivery fee"}
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

              {/* Important Notes */}
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
                onClick={() => {}}
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
