import { useState } from "react";
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

export default function ProcessRequestDialog({
  isOpen,
  onOpenChange,
  request,
  onSubmit,
}) {
  const [status, setStatus] = useState(request?.status || "");
  const [schedule, setSchedule] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!status) {
      alert("Please select a status");
      return;
    }

    if (!schedule || !time) {
      alert("Please fill in both schedule and time");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        requestId: request._id,
        status,
        schedule,
        time,
        description,
      });

      // Reset form
      setStatus("");
      setSchedule("");
      setTime("");
      setDescription("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error processing request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      // Reset form when closing
      setStatus(request?.status || "");
      setSchedule("");
      setTime("");
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
                <SelectItem value="no show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Schedule and Time */}
          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">
                Schedule <span className="text-destructive">*</span>
              </span>
              <Input
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="e.g., Mon-Fri"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">
                Time <span className="text-destructive">*</span>
              </span>
              <Input
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 8:00 AM - 5:00 PM"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <span className="text-sm font-medium">
              Notes / Reason for Changes
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