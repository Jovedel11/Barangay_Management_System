import React, { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/core/components/ui/sheet";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Plus } from "lucide-react";
import customRequest from "@/services/customRequest";
import { CustomToast } from "@/components/custom/CustomToast";
import { useAuth } from "@/hooks/useAuthProvider";

const RegistrationSheet = ({ selectedEvent, open, onOpenChange }) => {
  const { user } = useAuth();
  const [registrationForm, setRegistrationForm] = useState({
    teamMemberParticipant: "",
    specialRequirements: "",
    contactNumber: "",
    notes: "",
  });

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !registrationForm.teamMemberParticipant.trim() ||
      !registrationForm.contactNumber.trim() ||
      !registrationForm.specialRequirements.trim() ||
      !registrationForm.notes.trim();

    if (anyEmpty) return true;
    return (
      !registrationForm.teamMemberParticipant &&
      !registrationForm.contactNumber.trim() &&
      !registrationForm.specialRequirements.trim() &&
      !registrationForm.notes.trim()
    );
  }, [registrationForm]);

  const handleSubmit = async () => {
    try {
      const phonePattern = /^(?:\+63|0)9\d{9}$/;
      const isValidPhone = phonePattern.test(registrationForm.contactNumber);
      if (!isValidPhone)
        return CustomToast({
          description: "Invalid format of Contact Number",
          status: "error",
        });
      const payload = {
        user: user._id,
        eventTitle: selectedEvent?.eventTitle,
        dateOfEvent: selectedEvent?.startDate,
        category: selectedEvent?.category,
        teamMemberParticipant: registrationForm.teamMemberParticipant,
        specialRequirements: registrationForm.specialRequirements,
        contactNumber: registrationForm.contactNumber,
        payment: registrationForm.notes,
      };
      const result = await customRequest({
        path: "/api/brgy-events/insert/request",
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
        CustomToast({
          description: "Event successfully booked",
          status: "success",
        });
        return onOpenChange();
      }
      CustomToast({
        description: "Event booking failed",
        status: "error",
      });
    } catch (error) {
      console.error("Error submitting:", error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    }
  };

  const resetForm = () => {
    setRegistrationForm({
      teamMemberParticipant: "",
      specialRequirements: "",
      contactNumber: "",
      notes: "",
    });
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-lg w-full md:max-w-[30rem] overflow-y-auto gap-0"
      >
        {selectedEvent && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {selectedEvent.eventTitle}
              </SheetTitle>
              <SheetDescription>
                Fill out the registration form to participate in this event
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 pb-4 px-4">
              {/* Event Summary */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {new Date(selectedEvent?.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Venue:</span>
                    <span className="font-medium">{selectedEvent?.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">
                      {selectedEvent?.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Registration Fee:
                    </span>
                    <span className="font-medium text-primary">
                      {selectedEvent?.registrationFee || "Free"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="teamMemberParticipant">
                  Team Members / Participants *
                </Label>
                <Textarea
                  id="teamMemberParticipant"
                  placeholder="e.g., Ramon Garcia and Team"
                  value={registrationForm.teamMemberParticipant}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      teamMemberParticipant: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="specialRequirements">
                  Special Requirements
                </Label>
                <Textarea
                  id="specialRequirements"
                  placeholder="e.g., Requires cooking station with gas stove..."
                  value={registrationForm?.specialRequirements}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      specialRequirements: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  placeholder="09XXXXXXXXX"
                  value={registrationForm?.contactNumber}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      contactNumber: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes">
                  Payment Reference / Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="e.g., PayMaya-456789 or any additional information..."
                  value={registrationForm?.notes}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      notes: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              {/* Requirements */}
              {selectedEvent?.requirements && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <Label className="text-sm font-medium">
                    Event Requirements:
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedEvent?.requirements}
                  </p>
                </div>
              )}

              <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Bell className="h-4 w-4 shrink-0 text-warning mt-1" />
                  <div>
                    <p className="font-medium text-warning mb-1">
                      Registration Notice
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your registration will be reviewed by the event organizer.
                      You will be notified of approval status via SMS or email.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SheetFooter className="gap-2 flex flex-row mt-0 ml-auto">
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button
                disabled={nothingChanged}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSubmit}
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Registration
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RegistrationSheet;
