import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Wallet,
  Users,
  Heart,
  Users2,
  Scale,
  HandHeart,
  GraduationCap,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import ServiceRequestDialog from "./ServiceRequestDialog";

const getCategoryIcon = (category) => {
  switch (category) {
    case "Health Services":
      return Heart;
    case "Community Programs":
      return Users2;
    case "Legal Services":
      return Scale;
    case "Social Services":
      return HandHeart;
    case "Education":
      return GraduationCap;
    default:
      return MoreHorizontal;
  }
};

const getServiceTypeColor = (type) => {
  switch (type) {
    case "walk-in":
    case "Walk-in":
      return "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-800";
    case "appointment":
    case "Appointment Required":
      return "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-800";
    case "priority":
    case "Priority Service":
      return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800";
    case "emergency":
    case "Emergency":
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800";
    case "enrollment":
    case "Enrollment Required":
      return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

const getCostColor = (cost) => {
  if (cost === "FREE") return "text-teal-600 font-semibold dark:text-teal-400";
  return "text-amber-600 font-semibold dark:text-amber-400";
};

const formatServiceType = (type) => {
  const typeMap = {
    "walk-in": "Walk-in",
    "Walk-in": "Walk-in",
    appointment: "By Appointment",
    "Appointment Required": "By Appointment",
    priority: "Priority Service",
    "Priority Service": "Priority Service",
    emergency: "Emergency",
    Emergency: "Emergency",
    enrollment: "Enrollment Required",
    "Enrollment Required": "Enrollment Required",
  };
  return typeMap[type] || type;
};

const ServiceCard = ({ selectedService }) => {
  const [openRequest, setOpenRequest] = useState(false);
  const IconComponent = getCategoryIcon(selectedService.category);
  const isAvailable =
    selectedService.status === true || selectedService.status === "true";

  const handleOpenRequest = () => setOpenRequest((state) => !state);
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-background/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg dark:bg-teal-900/40">
              <IconComponent className="h-6 w-6 text-teal-600 dark:text-teal-300" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                {selectedService.name}
              </CardTitle>
              <Badge
                variant="outline"
                className={`mt-1 ${getServiceTypeColor(
                  selectedService.serviceType
                )}`}
              >
                {formatServiceType(selectedService.serviceType)}
              </Badge>
            </div>
          </div>
          <Badge
            variant={isAvailable ? "default" : "secondary"}
            className={
              isAvailable
                ? "bg-teal-100 text-teal-700 dark:bg-teal-800/40 dark:text-teal-300"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }
          >
            {isAvailable ? "Available" : "Not Available"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600 dark:text-gray-300">
          {selectedService.description}
        </CardDescription>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {selectedService.schedule}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {selectedService.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {selectedService.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <span className={getCostColor(selectedService.cost)}>
              {selectedService.cost}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {selectedService.slots} slots available
            </span>
          </div>
        </div>

        {selectedService.requirements &&
          selectedService.requirements !== "N/A" && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Requirements:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedService.requirements}
              </p>
            </div>
          )}

        {selectedService.contact && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Contact Person:
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedService.contact}
              {selectedService.phone && ` - ${selectedService.phone}`}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <ServiceRequestDialog
          open={openRequest}
          onOpenChange={handleOpenRequest}
          selectedService={selectedService}
        />
        <Button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          onClick={handleOpenRequest}
        >
          <Plus className="h-4 w-4 mr-2" />
          Book Service
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
