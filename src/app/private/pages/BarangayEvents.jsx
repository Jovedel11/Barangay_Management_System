import {
  Search,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Star,
  User,
  Eye,
  Bell,
  ChevronRight,
  Phone,
  Plus,
} from "lucide-react";
import { IconCalendarEvent } from "@tabler/icons-react";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Label } from "@/core/components/ui/label";
import { Separator } from "@/core/components/ui/separator";
import { Textarea } from "@/core/components/ui/textarea";

// Custom Hook
import useResidentEvents from "../hooks/useResidentEvents";

export default function BarangayEvents() {
  const {
    // State
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterMonth,
    setFilterMonth,
    selectedEvent,
    isDetailsDialogOpen,
    setIsDetailsDialogOpen,
    isRegistrationDialogOpen,
    setIsRegistrationDialogOpen,
    registrationForm,
    setRegistrationForm,

    // Data
    filteredEvents,
    featuredEvents,
    userRegistrations,
    userProfile,
    stats,
    categories,
    months,

    // Loading states
    eventsLoading,
    registrationsLoading,

    // Helper functions
    getStatusBadge,
    getCategoryBadge,

    // Event handlers
    handleViewDetails,
    handleRegisterForEvent,
    handleSubmitRegistration,
    handleContactOrganizer,
    handleRefresh,
  } = useResidentEvents();

  // Page header actions
  const pageHeaderActions = [
    {
      label: "Refresh",
      variant: "outline",
      onClick: handleRefresh,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Page Header */}
        <PageHeader
          title="Barangay Events"
          description="Stay updated with community activities, sports tournaments, and celebrations"
          actions={pageHeaderActions}
        >
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30"
            >
              <User className="h-3 w-3 mr-1" />
              {userProfile.name} - Resident
            </Badge>
          </div>
        </PageHeader>

        {/* Statistics */}
        <StatsGrid stats={stats} />

        {/* Featured Events */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Star className="h-5 w-5 text-accent" />
              Featured Events
            </CardTitle>
            <CardDescription>
              Don't miss these major barangay events and celebrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {eventsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">
                  Loading featured events...
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {featuredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="border border-border hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer"
                    onClick={() => handleViewDetails(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <event.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className="bg-accent/10 text-accent border-accent/30 text-xs">
                          Featured
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {event.title}
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          {event.venue}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Events */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <IconCalendarEvent className="h-5 w-5 text-primary" />
                  All Barangay Events
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete list of community events, sports, and activities
                </CardDescription>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 pt-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search events, organizers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {eventsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading events...</div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => {
                  const statusBadge = getStatusBadge(event.status, event.date);
                  const categoryBadge = getCategoryBadge(event.category);

                  return (
                    <Card
                      key={event.id}
                      className="border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 cursor-pointer"
                      onClick={() => handleViewDetails(event)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <event.icon className="h-7 w-7 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                                  {event.title}
                                </h3>
                                <div className="flex gap-2 ml-4">
                                  <Badge className={categoryBadge.className}>
                                    {categoryBadge.label}
                                  </Badge>
                                  <Badge className={statusBadge.className}>
                                    {statusBadge.label}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">
                                {new Date(event.date).toLocaleDateString()}
                                {event.endDate &&
                                  ` - ${new Date(
                                    event.endDate
                                  ).toLocaleDateString()}`}
                              </p>
                              <p className="text-muted-foreground">
                                {event.time}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">
                                {event.venue}
                              </p>
                              <p className="text-muted-foreground">Venue</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-success shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">
                                {event.organizer}
                              </p>
                              <p className="text-muted-foreground">Organizer</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-warning shrink-0" />
                            <div>
                              <p className="font-medium text-foreground">
                                {event.participants}
                              </p>
                              <p className="text-muted-foreground">
                                Participants
                              </p>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>Contact: {event.contact}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-primary/30 text-primary hover:bg-primary/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(event);
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View Details
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                            {event.status === "upcoming" && (
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRegisterForEvent(event);
                                }}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Register
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {filteredEvents.length === 0 && !eventsLoading && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Events Found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Event Details Dialog */}
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
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

        {/* Registration Dialog */}
        <Dialog
          open={isRegistrationDialogOpen}
          onOpenChange={setIsRegistrationDialogOpen}
        >
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
                        <span className="font-medium">
                          {selectedEvent.venue}
                        </span>
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
                    <Label htmlFor="teamMembers">
                      Team Members / Participants
                    </Label>
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
                          Your registration will be reviewed by the event
                          organizer. You will be notified of approval status via
                          SMS or email.
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
      </div>
    </div>
  );
}
