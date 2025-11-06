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
import { Wallet, Plus, Home, Globe, Check, X, AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { CustomToast } from "@/components/custom/CustomToast";
import customRequest from "@/services/customRequest";
import { useAuth } from "@/hooks/useAuthProvider";
import { useQueryClient } from "@tanstack/react-query";

const RequestSheet = ({ open, onOpenChange, selectedDocument }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [requestForm, setRequestForm] = useState({
    quantity: 1,
    purpose: "",
    specificDetails: "",
    contactNumber: "",
    urgentRequest: false,
    deliveryMethod: "",
  });
  const [receiptName, setReceiptName] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptError, setReceiptError] = useState(null);

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
      !requestForm.contactNumber ||
      !requestForm.deliveryMethod.trim();

    if (anyEmpty) return true;

    // If delivery method is gcash, require receipt
    if (requestForm.deliveryMethod === "gcash" && !receiptFile) return true;

    return (
      requestForm.quantity === 1 &&
      !requestForm.purpose.trim() &&
      !requestForm.contactNumber &&
      !requestForm.specificDetails.trim()
    );
  }, [requestForm, receiptFile]);

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

      if (requestForm.deliveryMethod === "gcash" && !receiptFile) {
        return CustomToast({
          description: "Please upload your GCash payment receipt",
          status: "error",
        });
      }

      const formData = new FormData();
      formData.append("user", user._id);
      formData.append("name", selectedDocument.name);
      formData.append("category", selectedDocument.category);

      Object.entries(requestForm).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      // Append file if available
      if (receiptFile) {
        formData.append("paymentImg", receiptFile);
      }

      const result = await customRequest({
        path: "/api/brgy-docs/request",
        attributes: {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      });

      if (result?.success) {
        queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
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
  }, [
    requestForm,
    onOpenChange,
    user,
    queryClient,
    selectedDocument,
    receiptFile,
  ]);

  useEffect(() => {
    if (selectedDocument) {
      setRequestForm((prevForm) => ({
        ...prevForm,
        deliveryMethod: selectedDocument.onlinePaymentAvailable
          ? "pickup"
          : "pickup",
      }));
    }
  }, [selectedDocument]);

  if (!selectedDocument) return null;

  const handleReceiptUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous error
    setReceiptError(null);

    // Validate file type
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["png", "jpg", "jpeg", "webp"];

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setReceiptError(
        "Please upload a valid image file (PNG, JPG, JPEG, or WebP)"
      );
      e.target.value = "";
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setReceiptError("Image size must be less than 5MB");
      e.target.value = "";
      return;
    }

    // Validate image dimensions
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Check if image dimensions are reasonable (min 200x200, max 4000x4000)
      if (img.width < 200 || img.height < 200) {
        setReceiptError("Image dimensions must be at least 200x200 pixels");
        setReceiptName(null);
        setReceiptFile(null);
        return;
      }

      if (img.width > 4000 || img.height > 4000) {
        setReceiptError("Image dimensions must not exceed 4000x4000 pixels");
        setReceiptName(null);
        setReceiptFile(null);
        return;
      }

      // All validations passed
      setReceiptName(fileName);
      setReceiptFile(file);
      setReceiptError(null);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setReceiptError("Invalid image file. Please upload a valid image.");
      setReceiptName(null);
      setReceiptFile(null);
    };

    img.src = objectUrl;
    e.target.value = "";
  };

  const removeReceipt = (e) => {
    e.preventDefault();
    if (receiptName) {
      setReceiptName(null);
      setReceiptFile(null);
      setReceiptError(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] w-full md:max-w-[28rem] overflow-y-auto gap-y-0 font-inter dark:bg-slate-900 flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2 font-inter text-xl">
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
              {selectedDocument?.urgent && (
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
              )}
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

              {/* GCash Payment */}
              {selectedDocument.onlinePaymentAvailable && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setRequestForm((prev) => ({
                      ...prev,
                      deliveryMethod:
                        prev.deliveryMethod === "gcash" ? "" : "gcash",
                    }))
                  }
                  className={`flex items-center justify-start gap-3 p-8 border rounded-lg transition-colors text-left ${
                    requestForm.deliveryMethod === "gcash"
                      ? "border-blue-400 bg-blue-50 dark:bg-blue-800/30 dark:border-blue-600"
                      : "border-muted bg-transparent"
                  }`}
                >
                  <Globe className="h-4 w-4 text-accent" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm">GCash Payment</span>
                    <p className="text-xs text-muted-foreground">
                      Pay via GCash and receive digitally
                    </p>
                  </div>
                </Button>
              )}
            </div>
          </div>

          {/* GCash Receipt Upload - Only show when gcash is selected */}
          {requestForm.deliveryMethod === "gcash" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                GCash Payment Receipt{" "}
                {requestForm.deliveryMethod === "gcash" && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              {!receiptName && (
                <label
                  htmlFor="gcash-receipt"
                  className={`h-14 mt-2 cursor-pointer border-dashed border-2 rounded-md w-full flex flex-col gap-y-2 items-center justify-center transition-colors ${
                    receiptError
                      ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/30 hover:border-red-400"
                      : "border-zinc-300 hover:border-success/50 hover:bg-success/5 dark:border-zinc-600 dark:hover:border-success/400"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      receiptError ? "text-red-600" : "text-zinc-500"
                    }`}
                  >
                    Upload GCash Payment Receipt
                  </span>
                  <input
                    id="gcash-receipt"
                    type="file"
                    className="cursor-pointer sr-only"
                    onChange={handleReceiptUpload}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                  />
                </label>
              )}
              {receiptName && (
                <div className="flex min-h-[3.5rem] max-h-14 justify-center items-center pr-8 relative w-full rounded-sm border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-900/30">
                  <span className="truncate text-sm px-10 text-zinc-800 dark:text-zinc-400">
                    {receiptName}
                  </span>
                  <Button
                    onClick={removeReceipt}
                    className="shadow-none right-2 absolute bg-transparent text-black dark:text-slate-200 cursor-pointer hover:bg-transparent p-0 h-5 w-2"
                  >
                    <X className="size-[18px]" />
                  </Button>
                </div>
              )}
              {receiptError && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {receiptError}
                </p>
              )}
              {!receiptError && (
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">
                    Accepted formats: PNG, JPG, JPEG, WebP (Max 5MB)
                  </p>
                  <div className="p-2 bg-blue-50 border border-blue-200 dark:border-blue-600 dark:bg-blue-900/30 rounded-md mt-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong className="text-blue-500">Note:</strong> Please
                      complete your GCash payment first before uploading the
                      receipt. After submission, please wait for the admin to
                      process your request. You will receive a downloadable file
                      once approved.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Requirements */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium">Requirements:</Label>
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
                    <strong>Payment Method:</strong>{" "}
                    {requestForm.deliveryMethod === "gcash"
                      ? "GCash"
                      : "Cash at barangay office"}
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
