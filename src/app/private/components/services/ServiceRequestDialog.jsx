import { useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/core/components/ui/dialog";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import { Button } from "@/core/components/ui/button";
import { Plus, X } from "lucide-react";
import { CustomToast } from "@/components/custom/CustomToast";
import customRequest from "@/services/customRequest";
import { useQueryClient } from "@tanstack/react-query";

const ServiceRequestDialog = ({ open, onOpenChange, selectedService }) => {
  const queryClient = useQueryClient();
  const [requestForm, setRequestForm] = useState({
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setRequestForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const nothingChanged = useMemo(() => {
    return !requestForm.details.trim();
  }, [requestForm]);

  const handleSubmitRequest = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const payload = {
        category: selectedService.category,
        service: selectedService.name,
        details: requestForm.details,
        user: "68de36ea114288009c8ead8b",
      };
      console.log(payload);
      const result = await customRequest({
        path: "/api/brgy-services/insert/request",
        attributes: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      });

      if (result?.success) {
        queryClient.invalidateQueries({ queryKey: ["my-service-requests"] });
        CustomToast({
          description: "Service request submitted successfully",
          status: "success",
        });
        setRequestForm({
          details: "",
        });
        onOpenChange(false);
      } else {
        CustomToast({
          description: result?.message || "Service request failed",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting:", error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [requestForm, selectedService, onOpenChange, queryClient]);

  if (!selectedService) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-full overflow-y-auto gap-y-4 font-inter dark:bg-slate-900">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2 font-inter text-xl">
            Request {selectedService.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {selectedService.category} • Fill in the details below
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-y-4">
          {/* Service Info Display */}
          <div className="p-3 bg-muted/50 rounded-lg space-y-2">
            <div>
              <Label className="text-sm font-medium">Service:</Label>
              <p className="text-sm text-muted-foreground">
                {selectedService.name}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Category:</Label>
              <p className="text-sm text-muted-foreground">
                {selectedService.category}
              </p>
            </div>
            {selectedService.location && (
              <div>
                <Label className="text-sm font-medium">Location:</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedService.location}
                </p>
              </div>
            )}
            {selectedService.schedule && (
              <div>
                <Label className="text-sm font-medium">Schedule:</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedService.schedule} • {selectedService.time}
                </p>
              </div>
            )}
          </div>

          {/* Details Field */}
          <div className="flex flex-col gap-y-1">
            <Label htmlFor="details">
              Specific Details <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="details"
              placeholder="Please provide specific notes or details about your service request..."
              value={requestForm.details}
              onChange={handleChange}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Include any important information about your request
            </p>
          </div>

          {/* Requirements Info */}
          {selectedService.requirements &&
            selectedService.requirements !== "N/A" && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <Label className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Requirements to bring:
                </Label>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                  {selectedService.requirements}
                </p>
              </div>
            )}

          {/* Contact Info */}
          {selectedService.contact && (
            <div className="p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
              <Label className="text-sm font-medium text-teal-900 dark:text-teal-100">
                Contact Information:
              </Label>
              <p className="text-sm text-teal-700 dark:text-teal-300 mt-1">
                {selectedService.contact}
                {selectedService.phone && ` • ${selectedService.phone}`}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row justify-end gap-x-2 sm:gap-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            disabled={nothingChanged || isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSubmitRequest}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;
