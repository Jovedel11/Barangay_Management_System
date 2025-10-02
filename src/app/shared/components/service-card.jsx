import { Edit, MoreHorizontal, Eye, Archive, Trash2, SettingsIcon } from "lucide-react";
import { Card, CardContent } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";

const ServiceCard = ({
  service,
  onEdit,
  onView,
  onToggleStatus,
  onDelete,
  className = "",
}) => {
  const getServiceTypeBadge = (type) => {
    switch (type) {
      case "walk-in":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/30">
            Walk-in
          </Badge>
        );
      case "appointment":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30">
            By Appointment
          </Badge>
        );
      case "priority":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            Priority Service
          </Badge>
        );
      case "emergency":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            Emergency
          </Badge>
        );
      case "enrollment":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            Enrollment Required
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCostColor = (cost) => {
    if (cost === "FREE") return "text-success font-semibold";
    return "text-primary font-semibold";
  };

  return (
    <Card
      className={`border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 ${className}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <SettingsIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{service.name}</h4>
              <p className="text-sm text-muted-foreground capitalize">
                {service.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {getServiceTypeBadge(service.serviceType)}
            {!service.status && (
              <Badge className="bg-muted/10 text-muted-foreground border-muted/30">
                Inactive
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Schedule:</span>
            <span className="font-medium text-foreground">
              {service.schedule}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-foreground text-right text-xs">
              {service.location}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cost:</span>
            <span className={getCostColor(service.cost)}>{service.cost}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Appointments:</span>
            <span className="font-medium text-warning">
              {service.activeAppointments}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completed (Month):</span>
            <span className="font-medium text-success">
              {service.completedThisMonth}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => onEdit(service)}
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
              <DropdownMenuItem onClick={() => onView(service)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(service.id)}>
                <Archive className="h-4 w-4 mr-2" />
                {service.isActive ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(service.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
