import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Button } from "@/core/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/core/components/ui/label";
import { useState, useEffect } from "react";
import customRequest from "@/services/customRequest";
import { CustomToast } from "./CustomToast";

export default function ProcessBookingDialog({
  participant,
  isOpen,
  onOpenChange,
  refetch,
}) {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [processingNotes, setProcessingNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (participant) {
      setPaymentStatus(participant.paymentStatus || "not paid");
      setProcessingNotes(participant.processingNotes || "");
    }
  }, [participant]);

  const handleSubmit = async () => {
    try {
      if (!participant?._id) throw new Error("Participant ID is required");

      setIsSubmitting(true);

      const result = await customRequest({
        path: "/api/brgy-events/update/request",
        attributes: {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            docs_id: participant._id,
            paymentStatus,
            processingNotes,
          }),
        },
      });

      if (!result?.success) {
        return CustomToast({
          description: "Failed to update booking",
          status: "error",
        });
      }

      refetch();
      CustomToast({
        description: "Booking has been updated successfully",
        status: "success",
      });
      onOpenChange();

      // Reset form
      setPaymentStatus("");
      setProcessingNotes("");
    } catch (error) {
      console.log(error);
      CustomToast({
        description: "Internal server error",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setPaymentStatus(participant?.paymentStatus || "not paid");
    setProcessingNotes(participant?.processingNotes || "");
    onOpenChange();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {participant?.paymentStatus === "not paid"
              ? "Process Booking"
              : "Edit Booking"}
          </DialogTitle>
          <DialogDescription>
            Update the payment status and add processing notes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger id="paymentStatus">
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not paid">Not Paid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="processingNotes">Processing Notes</Label>
            <Textarea
              id="processingNotes"
              placeholder="Enter processing notes here..."
              value={processingNotes}
              onChange={(e) => setProcessingNotes(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
