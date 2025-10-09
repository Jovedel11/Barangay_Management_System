const ViewEventDialog = () => {
    return (
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    {selectedEvent && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 text-xl">
                            <selectedEvent.icon className="h-6 w-6 text-primary" />
                            {selectedEvent.title}
                          </DialogTitle>
                          <div className="flex gap-2 pt-2">
                            <Badge
                              className={
                                getCategoryBadge(selectedEvent.category).className
                              }
                            >
                              {getCategoryBadge(selectedEvent.category).label}
                            </Badge>
                            <Badge
                              className={
                                getStatusBadge(selectedEvent.status, selectedEvent.date)
                                  .className
                              }
                            >
                              {
                                getStatusBadge(selectedEvent.status, selectedEvent.date)
                                  .label
                              }
                            </Badge>
                            {selectedEvent.featured && (
                              <Badge className="bg-accent/10 text-accent border-accent/30">
                                Featured Event
                              </Badge>
                            )}
                          </div>
                        </DialogHeader>
        
                        <div className="space-y-6">
                          <p className="text-muted-foreground text-base leading-relaxed">
                            {selectedEvent.description}
                          </p>
        
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-semibold text-foreground">
                                  Event Date & Time
                                </Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <div>
                                    <p className="font-medium">
                                      {new Date(selectedEvent.date).toLocaleDateString(
                                        "en-US",
                                        {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        }
                                      )}
                                      {selectedEvent.endDate && (
                                        <span>
                                          {" "}
                                          -{" "}
                                          {new Date(
                                            selectedEvent.endDate
                                          ).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </span>
                                      )}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedEvent.time}
                                    </p>
                                  </div>
                                </div>
                              </div>
        
                              <div>
                                <Label className="text-sm font-semibold text-foreground">
                                  Venue
                                </Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <MapPin className="h-4 w-4 text-accent" />
                                  <p className="font-medium">{selectedEvent.venue}</p>
                                </div>
                              </div>
        
                              <div>
                                <Label className="text-sm font-semibold text-foreground">
                                  Participants
                                </Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Users className="h-4 w-4 text-success" />
                                  <p className="font-medium">
                                    {selectedEvent.participants}
                                  </p>
                                </div>
                              </div>
                            </div>
        
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-semibold text-foreground">
                                  Organizer
                                </Label>
                                <div className="mt-1">
                                  <p className="font-medium">
                                    {selectedEvent.organizer}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedEvent.contact}
                                  </p>
                                </div>
                              </div>
        
                              <div>
                                <Label className="text-sm font-semibold text-foreground">
                                  Contact Information
                                </Label>
                                <div className="space-y-1 mt-1">
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <p className="font-medium">{selectedEvent.phone}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
        
                          {selectedEvent.prizes && (
                            <div>
                              <Label className="text-sm font-semibold text-foreground">
                                Prizes & Awards
                              </Label>
                              <div className="flex items-start gap-2 mt-1">
                                <Trophy className="h-4 w-4 text-warning mt-0.5" />
                                <p className="font-medium">{selectedEvent.prizes}</p>
                              </div>
                            </div>
                          )}
        
                          {selectedEvent.activities && (
                            <div>
                              <Label className="text-sm font-semibold text-foreground">
                                Activities
                              </Label>
                              <div className="flex items-start gap-2 mt-1">
                                <Star className="h-4 w-4 text-accent mt-0.5" />
                                <p className="font-medium">
                                  {selectedEvent.activities}
                                </p>
                              </div>
                            </div>
                          )}
        
                          {selectedEvent.categories && (
                            <div>
                              <Label className="text-sm font-semibold text-foreground">
                                Categories
                              </Label>
                              <div className="flex items-start gap-2 mt-1">
                                <Trophy className="h-4 w-4 text-warning mt-0.5" />
                                <p className="font-medium">
                                  {selectedEvent.categories}
                                </p>
                              </div>
                            </div>
                          )}
        
                          <div>
                            <Label className="text-sm font-semibold text-foreground">
                              Requirements
                            </Label>
                            <div className="flex items-start gap-2 mt-1">
                              <Bell className="h-4 w-4 text-primary mt-0.5" />
                              <p className="font-medium">
                                {selectedEvent.requirements}
                              </p>
                            </div>
                          </div>
        
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Bell className="h-4 w-4 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium text-foreground mb-1">
                                  Event Reminder
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Mark your calendar and don't miss this exciting
                                  barangay event! For more information, contact the
                                  organizer directly.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
        
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsDetailsDialogOpen(false)}
                          >
                            Close
                          </Button>
                          {selectedEvent.status === "upcoming" && (
                            <Button
                              className="bg-primary hover:bg-primary/90 text-primary-foreground"
                              onClick={() => {
                                setIsDetailsDialogOpen(false);
                                handleRegisterForEvent(selectedEvent);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Register for Event
                            </Button>
                          )}
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
    )
};

export default ViewEventDialog
