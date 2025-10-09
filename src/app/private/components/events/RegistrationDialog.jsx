const RegistrationDialog = ({ selectedEvent, open, onOpenChange, refetch }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {selectedEvent && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedEvent.icon className="h-5 w-5 text-primary" />
                Register for {selectedEvent.title}
              </DialogTitle>
              <DialogDescription>
                Fill out the registration form to participate in this event
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Event Summary */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Venue:</span>
                    <span className="font-medium">{selectedEvent.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Registration Fee:
                    </span>
                    <span className="font-medium text-primary">
                      {selectedEvent.registrationFee || "Free"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="teamMembers">Team Members / Participants</Label>
                <Textarea
                  id="teamMembers"
                  placeholder="List team members or describe your participation..."
                  value={registrationForm.teamMembers}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      teamMembers: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="specialRequirements">
                  Special Requirements
                </Label>
                <Textarea
                  id="specialRequirements"
                  placeholder="Any special requirements or accommodations needed..."
                  value={registrationForm.specialRequirements}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      specialRequirements: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  placeholder="09XXXXXXXXX"
                  value={registrationForm.contactNumber}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      contactNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information..."
                  value={registrationForm.notes}
                  onChange={(e) =>
                    setRegistrationForm({
                      ...registrationForm,
                      notes: e.target.value,
                    })
                  }
                />
              </div>

              {/* Requirements */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <Label className="text-sm font-medium">
                  Event Requirements:
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedEvent.requirements}
                </p>
              </div>

              <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Bell className="h-4 w-4 text-warning mt-0.5" />
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
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRegistrationDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSubmitRegistration}
                disabled={registrationsLoading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Registration
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
