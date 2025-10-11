import { Card, CardContent } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Separator } from "@/core/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Phone,
  Eye,
  ChevronRight,
  Plus,
  Clock,
  Bell,
} from "lucide-react";
import ViewEventSheet from "./ViewEventSheet";
import { Fragment, useState } from "react";
import RegistrationSheet from "./RegistrationSheet";

const getStatusBadge = (status, date) => {
  const eventDate = new Date(date);
  const today = new Date();
  const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    return {
      variant: "outline",
      className: "bg-muted text-muted-foreground border-muted",
      label: "Past Event",
      icon: Clock,
    };
  } else if (daysDiff <= 7) {
    return {
      variant: "default",
      className: "bg-destructive/10 text-destructive border-destructive/30",
      label: "This Week",
      icon: Bell,
    };
  } else if (daysDiff <= 30) {
    return {
      variant: "default",
      className: "bg-warning/10 text-warning border-warning/30",
      label: "This Month",
      icon: Calendar,
    };
  } else {
    return {
      variant: "default",
      className: "bg-primary/10 text-primary border-primary/30",
      label: "Upcoming",
      icon: Calendar,
    };
  }
};

const getCategoryBadge = (category) => {
  const categoryStyles = {
    "sports athletic": "bg-success/10 text-success border-success/30",
    pageant: "bg-accent/10 text-accent border-accent/30",
    entertainment: "bg-primary/10 text-primary border-primary/30",
    competition: "bg-warning/10 text-warning border-warning/30",
    community: "bg-secondary/20 text-secondary-foreground border-secondary/30",
    fiesta: "bg-destructive/10 text-destructive border-destructive/30",
  };

  const categoryLabels = {
    "sports athletic": "Sports Athletic",
    pageant: "Pageant",
    entertainment: "Entertainment",
    competition: "Competition",
    community: "Community",
    fiesta: "Fiesta",
  };

  const categoryKey = category?.toLowerCase();

  return {
    className: categoryStyles[categoryKey] || categoryStyles.community,
    label: categoryLabels[categoryKey] || category,
  };
};

const getCategoryIcon = (category) => {
  const iconMap = {
    "sports athletic": Trophy,
    pageant: Users,
    entertainment: Users,
    competition: Trophy,
    community: Users,
    fiesta: Calendar,
  };

  const categoryKey = category?.toLowerCase();
  return iconMap[categoryKey] || Calendar;
};

const EventsCard = ({ event }) => {
  const [openRegister, setOpenRegister] = useState(false);
  const statusBadge = getStatusBadge(event.status, event.startDate);
  const categoryBadge = getCategoryBadge(event.category);
  const IconComponent = getCategoryIcon(event.category);
  const handleOpenChange = () => setOpenRegister((state) => !state);

  return (
    <Card
      className="border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 cursor-pointer"
      onClick={() => {}}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <IconComponent className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                  {event.eventTitle}
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
                {new Date(event.startDate).toLocaleDateString()}
                {event.endDate &&
                  ` - ${new Date(event.endDate).toLocaleDateString()}`}
              </p>
              <p className="text-muted-foreground">{event.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent shrink-0" />
            <div>
              <p className="font-medium text-foreground">{event.venue}</p>
              <p className="text-muted-foreground">Venue</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-success shrink-0" />
            <div>
              <p className="font-medium text-foreground">{event.organizer}</p>
              <p className="text-muted-foreground">Organizer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-warning shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                {event.participants}
              </p>
              <p className="text-muted-foreground">Participants</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>Contact: {event.phoneNumber}</span>
          </div>
          <div className="flex gap-2">
            <ViewEventSheet selectedEvent={event}>
              <Button
                size="sm"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Eye className="h-3 w-3 mr-1" />
                View Details
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </ViewEventSheet>

            {event.status === "upcoming" && (
              <Fragment>
                <RegistrationSheet
                  selectedEvent={event}
                  open={openRegister}
                  onOpenChange={handleOpenChange}
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleOpenChange}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Register
                </Button>
              </Fragment>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
