import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import customRequest from "@/services/customRequest";
import { CustomToast } from "./CustomToast";

export default function ProcessRequestDialog({
  isOpen,
  onOpenChange,
  request,
  refetch,
}) {
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onProcessUpdate = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const result = await customRequest({
        path: "/api/brgy-services/update/request",
        attributes: {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            docs_id: request._id,
            status,
            ...(description ? { specialNote: description } : {}),
          }),
          credentials: "include",
        },
      });
      if (result?.success) {
        refetch();
        onOpenChange();
        return CustomToast({
          description: "Process request succeeded",
          status: "success",
        });
      }
      CustomToast({
        description: "Failed to process request",
        status: "error",
      });
    } catch (error) {
      console.log(error);
      CustomToast({
        description: "Internal server error",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [refetch, request, status, description, onOpenChange]);

  const handleSubmit = async () => {
    onProcessUpdate();
  };

  const handleOpenChange = (open) => {
    if (!open) {
      setStatus(request?.status || "");
      setDescription("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Process Service Request</DialogTitle>
          <DialogDescription>
            Update the status and schedule for this service request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Request Info */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Resident:
              </span>
              <span className="text-sm font-semibold">
                {request?.user?.firstName} {request?.user?.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Service:
              </span>
              <span className="text-sm font-semibold">{request?.service}</span>
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <span className="text-sm font-medium">
              Status <span className="text-destructive">*</span>
            </span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <span className="text-sm font-medium">
              Processing Note
              <span className="text-muted-foreground text-xs ml-1">
                (Optional)
              </span>
            </span>
            <Textarea
              id="description"
              placeholder="Add any notes about the schedule adjustment or status change..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Process Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
