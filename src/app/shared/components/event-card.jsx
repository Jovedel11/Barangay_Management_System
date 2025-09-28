import {
  Edit,
  MoreHorizontal,
  Eye,
  Archive,
  Trash2,
  Users,
  Calendar,
  MapPin,
  Trophy,
  Phone,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Separator } from "@/core/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";

const EventCard = ({
  event,
  onEdit,
  onView,
  onToggleStatus,
  onDelete,
  onViewRegistrations,
  onToggleFeatured,
  className = "",
}) => {
  const getEventStatusBadge = (status, date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    switch (status) {
      case "upcoming":
        if (daysDiff <= 7) {
          return (
            <Badge className="bg-destructive/10 text-destructive border-destructive/30">
              This Week
            </Badge>
          );
        } else if (daysDiff <= 30) {
          return (
            <Badge className="bg-warning/10 text-warning border-warning/30">
              This Month
            </Badge>
          );
        } else {
          return (
            <Badge className="bg-primary/10 text-primary border-primary/30">
              Upcoming
            </Badge>
          );
        }
      case "ongoing":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            Ongoing
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            Cancelled
          </Badge>
        );
      case "postponed":
        return (
          <Badge className="bg-muted/10 text-muted-foreground border-muted/30">
            Postponed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (category) => {
    const categoryStyles = {
      sports: "bg-success/10 text-success border-success/30",
      pageant: "bg-accent/10 text-accent border-accent/30",
      entertainment: "bg-primary/10 text-primary border-primary/30",
      competition: "bg-warning/10 text-warning border-warning/30",
      community:
        "bg-secondary/20 text-secondary-foreground border-secondary/30",
      fiesta: "bg-destructive/10 text-destructive border-destructive/30",
    };

    const categoryLabels = {
      sports: "Sports",
      pageant: "Pageant",
      entertainment: "Entertainment",
      competition: "Competition",
      community: "Community",
      fiesta: "Fiesta",
    };

    return (
      <Badge className={categoryStyles[category] || categoryStyles.community}>
        {categoryLabels[category] || category}
      </Badge>
    );
  };

  return (
    <Card
      className={`border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 ${className}`}
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
                  {getCategoryBadge(event.category)}
                  {getEventStatusBadge(event.status, event.date)}
                  {event.featured && (
                    <Badge className="bg-accent/10 text-accent border-accent/30">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                {new Date(event.date).toLocaleDateString()}
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
                {event.totalRegistrations} registered
              </p>
              <p className="text-muted-foreground">Participants</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Budget:</span>
            <span className="font-medium text-primary">{event.budget}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Confirmed:</span>
            <span className="font-medium text-success">
              {event.confirmedRegistrations}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pending:</span>
            <span className="font-medium text-warning">
              {event.pendingRegistrations}
            </span>
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
              onClick={() => onEdit(event)}
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="px-2">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onView(event)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewRegistrations(event)}>
                  <Users className="h-4 w-4 mr-2" />
                  View Registrations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleFeatured(event.id)}>
                  <Star className="h-4 w-4 mr-2" />
                  {event.featured ? "Remove from Featured" : "Mark as Featured"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleStatus(event.id)}>
                  <Archive className="h-4 w-4 mr-2" />
                  {event.isActive ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(event.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Event
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
