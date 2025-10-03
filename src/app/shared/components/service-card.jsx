import {
  Edit,
  MoreHorizontal,
  Eye,
  Archive,
  Trash2,
  SettingsIcon,
} from "lucide-react";
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
import AddService from "@/components/custom/AddService";
import { useCallback, useState } from "react";
import customRequest from "@/services/customRequest";
import { CustomToast } from "@/components/custom/CustomToast";
import ViewServiceDialog from "@/components/custom/ViewService";

const ServiceCard = ({ service, className = "", refetch }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
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

  const onEditChange = () => setOpenEdit((prev) => !prev);
  const onViewChange = () => setOpenView((prev) => !prev);

  const handleBookingDeletion = async (serviceId) => {
    try {
      if (!serviceId) throw new Error();
      const result = await customRequest({
        path: "/api/brgy-services/delete",
        attributes: {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ service_id: serviceId }),
        },
      });
      if (!result?.success) {
        return CustomToast({
          description: "Failed to delete the service",
          status: "error",
        });
      }
      refetch();
      CustomToast({
        description: "Service has been deleted successfully",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      CustomToast({
        description: "Internal server error",
        status: "error",
      });
    }
  };

  const onUpdate = useCallback(
    async ({ service_id, status }) => {
      try {
        // Send the opposite of current status to toggle it
        const result = await customRequest({
          path: "/api/brgy-services/update/available",
          attributes: {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docs_id: service_id,
              status: !status, // Just negate the current status
            }),
            credentials: "include",
          },
        });
        if (result?.success) {
          refetch();
          return CustomToast({
            description: "Service status has been updated",
            status: "success",
          });
        }
        CustomToast({
          description: "Failed to update service' status",
          status: "error",
        });
      } catch (error) {
        console.log(error);
        CustomToast({
          description: "Internal server error",
          status: "error",
        });
      }
    },
    [refetch]
  );

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
        <ViewServiceDialog
          data={service}
          open={openView}
          handleOpenChange={onViewChange}
        />
        <div className="flex gap-2">
          <AddService
            open={openEdit}
            handleOpenChange={onEditChange}
            isEdit={true}
            data={service}
          >
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </AddService>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="px-2">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onViewChange}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onUpdate({
                    service_id: service?._id,
                    status: service?.status,
                  })
                }
              >
                <Archive className="h-4 w-4 mr-2" />
                {service?.status ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => handleBookingDeletion(service?._id)}
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
