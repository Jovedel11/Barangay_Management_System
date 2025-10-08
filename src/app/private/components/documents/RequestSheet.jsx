import { useState, useCallback, useEffect } from "react";
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
import { Textarea } from "@/core/components/ui/textarea";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
import { Wallet, Plus, Home, Truck, FileCheck } from "lucide-react";
import { useMemo } from "react";
import { CustomToast } from "@/components/custom/CustomToast";
import customRequest from "@/services/customRequest";

const RequestSheet = ({ open, onOpenChange, selectedDocument, refetch }) => {
  const [requestForm, setRequestForm] = useState({
    quantity: 1,
    purpose: "",
    specificDetails: "",
    contactNumber: "",
    urgentRequest: false,
    deliveryMethod: "",
    isPregnant: false,
  });

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setRequestForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !requestForm.purpose.trim() ||
      !requestForm.quantity === 0 ||
      !requestForm.specificDetails.trim() ||
      !requestForm.contactNumber ||
      !requestForm.deliveryMethod.trim();

    if (anyEmpty) return true;
    return (
      requestForm.quantity === 1 &&
      !requestForm.purpose.trim() &&
      !requestForm.specificDetails.trim() &&
      !requestForm.contactNumber &&
      !requestForm.specificDetails.trim()
    );
  }, [requestForm]);

  useEffect(() => {
    if (selectedDocument) {
      setRequestForm((prev) => ({
        ...prev,
        deliveryMethod: selectedDocument.deliveryAvailable ? "pickup" : "",
      }));
    }
  }, [selectedDocument]);

  const calculateTotalFee = useCallback(() => {
    if (!selectedDocument) return "₱0";

    // Handle "free" fee
    if (selectedDocument.fee === "free" || selectedDocument.fee === 0) {
      return "Free";
    }

    let total = parseFloat(selectedDocument.fee) * requestForm.quantity;

    if (requestForm.urgentRequest && selectedDocument.urgentFee) {
      const urgentFee =
        selectedDocument.urgentFee === "free"
          ? 0
          : parseFloat(selectedDocument.urgentFee);
      total += urgentFee;
    }

    return `₱${total}`;
  }, [requestForm, selectedDocument]);

  const handleSubmitRequest = useCallback(async () => {
    try {
      const phonePattern = /^(?:\+63|0)9\d{9}$/;
      const isValidPhone = phonePattern.test(requestForm.contactNumber);
      if (!isValidPhone)
        return CustomToast({
          description: "Invalid format of Phone Number",
          status: "error",
        });
      const payload = {
        user: "68de36ea114288009c8ead8b",
        ...requestForm,
      };
      console.log(payload);
      const result = await customRequest({
        path: "/api/brgy-docs/request",
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
        CustomToast({
          description: "Document successfully booked",
          status: "success",
        });
        return onOpenChange();
      }
      CustomToast({
        description: "Document booking failed",
        status: "error",
      });
    } catch (error) {
      console.error("Error submitting:", error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    }
  }, [requestForm, refetch, onOpenChange]);

  const DocIcon = FileCheck;
  useEffect(() => {
    if (selectedDocument) {
      setRequestForm((prevForm) => ({
        ...prevForm,
        deliveryMethod: selectedDocument.deliveryAvailable
          ? "delivery"
          : "pickup",
      }));
    }
  }, [selectedDocument]);

  if (!selectedDocument) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] w-full md:max-w-[28rem] overflow-y-auto gap-y-0 font-inter dark:bg-slate-900 flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2 font-inter">
            <DocIcon className="h-5 w-5 text-primary" />
            Request {selectedDocument.name}
          </SheetTitle>
          <SheetDescription className="text-sm">
            Submit request • Payment at barangay office
          </SheetDescription>
        </SheetHeader>

        <div className="w-full flex flex-col gap-y-4 px-4 mt-2">
          {/* Quantity + Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-1">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="5"
                value={requestForm.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Document Fee</Label>
              <p className="text-lg font-bold text-primary mt-2 capitalize">
                {selectedDocument.fee === "free"
                  ? "Free"
                  : `₱${selectedDocument.fee}`}
              </p>
            </div>
          </div>

          {/* Purpose */}
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              placeholder="Enter purpose (e.g., Medical Certificate, Job Application)"
              value={requestForm.purpose}
              onChange={handleChange}
            />
          </div>

          {/* Specific Details */}
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="specificDetails">Specific Details (Optional)</Label>
            <Textarea
              id="specificDetails"
              placeholder="Any specific details or instructions..."
              value={requestForm.specificDetails}
              onChange={handleChange}
            />
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              placeholder="09XXXXXXXXX"
              value={requestForm.contactNumber}
              onChange={handleChange}
            />
          </div>

          {/* Urgent Checkbox */}
          {selectedDocument.urgent && (
            <div className="flex items-center space-x-2 p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <Checkbox
                id="urgentRequest"
                onCheckedChange={(checked) =>
                  setRequestForm({ ...requestForm, urgentRequest: checked })
                }
              />
              <div className="flex-1">
                <Label
                  htmlFor="urgentRequest"
                  className="cursor-pointer font-medium"
                >
                  Rush Processing (
                  {selectedDocument.urgentFee === "free"
                    ? "Free"
                    : selectedDocument.urgentFee}
                  )
                </Label>
                <p className="text-sm text-muted-foreground">
                  {selectedDocument.urgentTime} processing
                </p>
              </div>
            </div>
          )}

          {/* Collection Method (Pickup/Delivery Buttons) */}
          <div className="flex flex-col gap-y-3">
            <Label>Collection Method</Label>
            <div className="flex flex-col space-y-2">
              {/* Pickup */}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setRequestForm((prev) => ({
                    ...prev,
                    deliveryMethod:
                      prev.deliveryMethod === "pickup" ? "" : "pickup",
                  }))
                }
                className={`flex items-center justify-start gap-3 p-8 border rounded-lg transition-colors text-left ${
                  requestForm.deliveryMethod === "pickup"
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

              {/* Delivery */}
              {selectedDocument.deliveryAvailable && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setRequestForm((prev) => ({
                      ...prev,
                      deliveryMethod:
                        prev.deliveryMethod === "delivery" ? "" : "delivery",
                    }))
                  }
                  className={`flex items-center justify-start gap-3 p-8 border rounded-lg transition-colors text-left ${
                    requestForm.deliveryMethod === "delivery"
                      ? "border-blue-400 bg-blue-50 dark:bg-blue-800/30 dark:border-blue-600"
                      : "border-muted bg-transparent"
                  }`}
                >
                  <Truck className="h-4 w-4 text-accent" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm">Home Delivery</span>
                    <p className="text-xs text-muted-foreground">
                      Cash on delivery (COD) payment
                    </p>
                  </div>
                </Button>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">
              Requirements to bring:
            </Label>
            <p className="text-sm text-muted-foreground mt-2">
              {selectedDocument.requirements}
            </p>
          </div>

          {/* Special Note */}
          {selectedDocument.specialNote && (
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-warning font-medium">Special Note:</p>
              <p className="text-sm text-warning/80">
                {selectedDocument.specialNote}
              </p>
            </div>
          )}

          {/* Payment Summary */}
          <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Wallet className="h-4 w-4 text-warning mt-0.5" />
              <div>
                <Label className="text-sm font-medium text-warning">
                  Payment Summary:
                </Label>
                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                  <p>
                    <strong>Total Amount:</strong> {calculateTotalFee()}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> Cash only at barangay
                    office
                  </p>
                  <p>
                    <strong>Processing:</strong>{" "}
                    {requestForm.urgentRequest
                      ? selectedDocument.urgentTime
                      : selectedDocument.processingTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="flex flex-row justify-end gap-x-2 mt-4">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button
            disabled={nothingChanged}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSubmitRequest}
          >
            <Plus className="h-4 w-4 mr-2" />
            Submit Request
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RequestSheet;
