import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/core/components/ui/sheet";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Trophy,
  Star,
  Bell,
  Dumbbell,
  Crown,
  Music,
  PartyPopper,
} from "lucide-react";

const getCategoryIcon = (category) => {
  const iconMap = {
    "Sports Athletic": Dumbbell,
    "Beauty Pageants": Crown,
    Entertainment: Music,
    Competitions: Trophy,
    "Community Events": Users,
    "Fiesta & Celebration": PartyPopper,
  };
  return iconMap[category] || Star;
};

const getCategoryBadge = (category) => ({
  label: category,
  className: "bg-primary/10 text-primary border-primary/20",
});

const getStatusBadge = (status) => {
  const statusMap = {
    upcoming: {
      label: "Upcoming",
      className: "bg-primary/10 text-primary border-primary/20",
    },
    ongoing: {
      label: "Ongoing",
      className: "bg-success/10 text-success border-success/20",
    },
    completed: {
      label: "Completed",
      className: "bg-muted text-muted-foreground border-border",
    },
  };

  return (
    statusMap[status] || {
      label: "Unknown",
      className: "bg-muted text-muted-foreground border-border",
    }
  );
};

const ViewEventSheet = ({ selectedEvent, children }) => {
  if (!selectedEvent) return null;

  const Icon = getCategoryIcon(selectedEvent.category);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full md:w-[30rem] max-h-[100vh] overflow-y-auto gap-0"
      >
        <SheetHeader className="pb-2">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <Icon className="h-5 w-5 text-primary" />
            {selectedEvent.eventTitle}
          </SheetTitle>

          <div className="flex flex-wrap gap-1.5 pt-3">
            <Badge
              className={getCategoryBadge(selectedEvent.category).className}
            >
              {getCategoryBadge(selectedEvent.category).label}
            </Badge>

            <Badge className={getStatusBadge(selectedEvent.status).className}>
              {getStatusBadge(selectedEvent.status).label}
            </Badge>

            {selectedEvent.featuredEvent && (
              <Badge className="bg-accent/10 text-accent border-accent/30">
                Featured Event
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-3 py-1 px-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {selectedEvent.description}
          </p>

          <div className="space-y-4">
            {/* Date & Time */}
            <div>
              <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                Event Date & Time
              </Label>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {new Date(selectedEvent.startDate).toLocaleDateString(
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
                        {" - "}
                        {new Date(selectedEvent.endDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedEvent.time}
                  </p>
                </div>
              </div>
            </div>

            {/* Venue */}
            <div>
              <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                Venue
              </Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <p className="text-sm font-medium">{selectedEvent.venue}</p>
              </div>
            </div>

            {/* Participants */}
            <div>
              <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                Participants
              </Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-success flex-shrink-0" />
                <p className="text-sm font-medium">{selectedEvent.participants}</p>
              </div>
            </div>

            {/* Organizer */}
            <div>
              <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                Organizer
              </Label>
              <div className="pl-6">
                <p className="text-sm font-medium">{selectedEvent.organizer}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedEvent.contactPerson}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                Contact Information
              </Label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm font-medium">{selectedEvent.phoneNumber}</p>
              </div>
            </div>

            {/* Prizes */}
            {selectedEvent.prizesAwards && (
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                  Prizes & Awards
                </Label>
                <div className="flex items-start gap-2">
                  <Trophy className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium">{selectedEvent.prizesAwards}</p>
                </div>
              </div>
            )}

            {/* Activities */}
            {selectedEvent.activities && (
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                  Activities
                </Label>
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium">{selectedEvent.activities}</p>
                </div>
              </div>
            )}

            {/* Categories */}
            {selectedEvent.categories && (
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                  Categories
                </Label>
                <div className="flex items-start gap-2">
                  <Trophy className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium">{selectedEvent.categories}</p>
                </div>
              </div>
            )}

            {/* Requirements */}
            <div>
              <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                Requirements
              </Label>
              <div className="flex items-start gap-2">
                <Bell className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{selectedEvent.requirements}</p>
              </div>
            </div>

            {/* Reminder Box */}
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg mt-2">
              <div className="flex items-start gap-2">
                <Bell className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm mb-1">
                    Event Reminder
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mark your calendar and don't miss this exciting barangay
                    event! For more information, contact the organizer directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="pt-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ViewEventSheet;