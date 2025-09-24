import { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Stethoscope,
  User,
  Eye,
  Phone,
  Filter,
  ChevronRight,
  Car,
  Home,
  Wallet,
  Info,
  Shield,
  FileText,
  Baby,
  Pill,
} from "lucide-react";
import {
  IconVaccine,
  IconFirstAidKit,
  IconAmbulance,
  IconScale,
  IconGavel,
  IconHeartHandshake,
  IconMedicalCross,
  IconBabyCarriageFilled,
  IconEye,
} from "@tabler/icons-react";

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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";

const BarangayServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  // Mock data for barangay services
  const services = [
    {
      id: 1,
      name: "Free Medical Check-up",
      category: "health",
      description: "General health examination by barangay health workers",
      schedule: "Every Monday & Wednesday",
      time: "8:00 AM - 12:00 PM",
      location: "Barangay Health Center",
      cost: "FREE",
      requirements: ["Valid ID", "Barangay Residency"],
      serviceType: "walk-in",
      icon: IconMedicalCross,
      available: true,
      slots: "15 slots available",
      contact: "Nurse Maria Santos",
      phone: "(02) 123-4567",
      details:
        "Basic health screening including blood pressure, weight, height measurements, and general consultation.",
    },
    {
      id: 2,
      name: "Anti-Rabies Vaccination",
      category: "veterinary",
      description: "Free vaccination for dogs and cats",
      schedule: "Every 2nd Saturday",
      time: "9:00 AM - 3:00 PM",
      location: "Barangay Covered Court",
      cost: "FREE",
      requirements: [
        "Pet ownership proof",
        "Previous vaccination record (if any)",
      ],
      serviceType: "walk-in",
      icon: IconVaccine,
      available: true,
      slots: "50 pets can be accommodated",
      contact: "Dr. Juan Dela Cruz (City Vet)",
      phone: "(02) 234-5678",
      details:
        "Annual anti-rabies vaccination program. Bring your pets early as slots are limited.",
    },
    {
      id: 3,
      name: "Senior Citizen Health Check",
      category: "health",
      description: "Specialized health services for senior citizens",
      schedule: "Every Friday",
      time: "8:00 AM - 11:00 AM",
      location: "Barangay Health Center",
      cost: "FREE",
      requirements: ["Senior Citizen ID", "Barangay Residency"],
      serviceType: "priority",
      icon: IconHeartHandshake,
      available: true,
      slots: "20 slots available",
      contact: "Nurse Elena Rodriguez",
      phone: "(02) 345-6789",
      details:
        "Priority health services including blood pressure monitoring, diabetes screening, and medication consultation.",
    },
    {
      id: 4,
      name: "Legal Assistance & Consultation",
      category: "legal",
      description: "Free legal advice and document preparation",
      schedule: "Every Tuesday & Thursday",
      time: "1:00 PM - 5:00 PM",
      location: "Barangay Hall - Conference Room",
      cost: "FREE",
      requirements: ["Valid ID", "Relevant documents"],
      serviceType: "appointment",
      icon: IconGavel,
      available: true,
      slots: "10 appointments per day",
      contact: "Atty. Ricardo Morales",
      phone: "(02) 456-7890",
      details:
        "Legal consultation for family matters, labor disputes, and document preparation assistance.",
    },
    {
      id: 5,
      name: "Maternal & Child Health",
      category: "health",
      description: "Pre-natal and post-natal care for mothers",
      schedule: "Every Monday, Wednesday, Friday",
      time: "8:00 AM - 12:00 PM",
      location: "Barangay Health Center",
      cost: "FREE",
      requirements: ["Pregnancy record", "Valid ID"],
      serviceType: "walk-in",
      icon: IconBabyCarriageFilled,
      available: true,
      slots: "12 slots available",
      contact: "Midwife Carmen Villanueva",
      phone: "(02) 567-8901",
      details:
        "Complete maternal care including check-ups, vitamins distribution, and health education.",
    },
    {
      id: 6,
      name: "Blood Pressure Monitoring",
      category: "health",
      description: "Regular BP monitoring for hypertensive residents",
      schedule: "Daily",
      time: "8:00 AM - 4:00 PM",
      location: "Barangay Health Center",
      cost: "FREE",
      requirements: ["Valid ID", "Previous medical records"],
      serviceType: "walk-in",
      icon: IconFirstAidKit,
      available: true,
      slots: "Unlimited",
      contact: "Barangay Health Worker",
      phone: "(02) 678-9012",
      details:
        "Daily monitoring service for residents with hypertension. Medication reminders included.",
    },
    {
      id: 7,
      name: "Eye Check-up Program",
      category: "health",
      description: "Basic eye examination and vision screening",
      schedule: "Every 3rd Saturday",
      time: "8:00 AM - 2:00 PM",
      location: "Barangay Multi-Purpose Hall",
      cost: "FREE",
      requirements: ["Valid ID", "Barangay Residency"],
      serviceType: "walk-in",
      icon: IconEye,
      available: false,
      slots: "Next schedule: March 15, 2024",
      contact: "Dr. Lisa Aquino (Visiting Optometrist)",
      phone: "(02) 789-0123",
      details:
        "Monthly eye screening program. Free reading glasses for qualified senior citizens.",
    },
    {
      id: 8,
      name: "Nutrition Program for Children",
      category: "health",
      description: "Feeding program and nutrition monitoring",
      schedule: "Every Monday - Friday",
      time: "10:00 AM - 11:00 AM",
      location: "Barangay Day Care Center",
      cost: "FREE",
      requirements: ["Birth Certificate", "Parent/Guardian presence"],
      serviceType: "enrollment",
      icon: IconBabyCarriageFilled,
      available: true,
      slots: "30 children enrolled",
      contact: "Day Care Worker - Ms. Ana Reyes",
      phone: "(02) 890-1234",
      details:
        "Daily feeding program for undernourished children aged 2-5 years old.",
    },
    {
      id: 9,
      name: "Emergency Ambulance Service",
      category: "emergency",
      description: "24/7 emergency transport to nearest hospital",
      schedule: "24/7 Available",
      time: "Anytime",
      location: "Mobile Service",
      cost: "₱500 - ₱1,000 (depending on distance)",
      requirements: ["Emergency situation", "Contact person"],
      serviceType: "emergency",
      icon: IconAmbulance,
      available: true,
      slots: "1 ambulance available",
      contact: "Emergency Hotline",
      phone: "911 or (02) 901-2345",
      details:
        "Emergency transport service. Payment can be made after service or through installment.",
    },
    {
      id: 10,
      name: "Community Mediation Service",
      category: "legal",
      description: "Conflict resolution and neighborhood disputes",
      schedule: "Every Monday & Friday",
      time: "2:00 PM - 5:00 PM",
      location: "Barangay Hall - Mediation Room",
      cost: "FREE",
      requirements: ["All parties present", "Valid IDs"],
      serviceType: "appointment",
      icon: IconScale,
      available: true,
      slots: "5 cases per day",
      contact: "Barangay Captain / Kagawad",
      phone: "(02) 012-3456",
      details:
        "Free mediation service for neighbor disputes, property boundaries, and family conflicts.",
    },
  ];

  const categories = [
    { id: "all", name: "All Services", count: services.length },
    {
      id: "health",
      name: "Health Services",
      count: services.filter((s) => s.category === "health").length,
    },
    {
      id: "veterinary",
      name: "Veterinary",
      count: services.filter((s) => s.category === "veterinary").length,
    },
    {
      id: "legal",
      name: "Legal Assistance",
      count: services.filter((s) => s.category === "legal").length,
    },
    {
      id: "emergency",
      name: "Emergency",
      count: services.filter((s) => s.category === "emergency").length,
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getServiceTypeColor = (type) => {
    switch (type) {
      case "walk-in":
        return "bg-teal-100 text-teal-700 border-teal-200";
      case "appointment":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "priority":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "emergency":
        return "bg-red-100 text-red-700 border-red-200";
      case "enrollment":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCostColor = (cost) => {
    if (cost === "FREE") return "text-teal-600 font-semibold";
    return "text-amber-600 font-semibold";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <IconMedicalCross className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Barangay Services</h1>
        </div>
        <p className="text-teal-100 text-lg">
          Access free and affordable community services in our barangay
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 border-gray-200 focus:border-teal-500 focus:ring-teal-500">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Service Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCategory === category.id
                ? "ring-2 ring-teal-500 bg-teal-50"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-600 mb-1">
                {category.count}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {category.name}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card
              key={service.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">
                        {service.name}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`mt-1 ${getServiceTypeColor(
                          service.serviceType
                        )}`}
                      >
                        {service.serviceType === "walk-in"
                          ? "Walk-in"
                          : service.serviceType === "appointment"
                          ? "By Appointment"
                          : service.serviceType === "priority"
                          ? "Priority Service"
                          : service.serviceType === "emergency"
                          ? "Emergency"
                          : "Enrollment Required"}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant={service.available ? "default" : "secondary"}
                    className={
                      service.available ? "bg-teal-100 text-teal-700" : ""
                    }
                  >
                    {service.available ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{service.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{service.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{service.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gray-400" />
                    <span className={getCostColor(service.cost)}>
                      {service.cost}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{service.slots}</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                      onClick={() => setSelectedService(service)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-teal-600" />
                        </div>
                        {service.name}
                      </DialogTitle>
                      <DialogDescription>
                        Complete information about this barangay service
                      </DialogDescription>
                    </DialogHeader>

                    {selectedService && (
                      <div className="space-y-6">
                        {/* Service Status */}
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              selectedService.available
                                ? "default"
                                : "secondary"
                            }
                            className={
                              selectedService.available
                                ? "bg-teal-100 text-teal-700"
                                : ""
                            }
                          >
                            {selectedService.available
                              ? "Currently Available"
                              : "Not Available"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getServiceTypeColor(
                              selectedService.serviceType
                            )}
                          >
                            {selectedService.serviceType === "walk-in"
                              ? "Walk-in Service"
                              : selectedService.serviceType === "appointment"
                              ? "By Appointment Only"
                              : selectedService.serviceType === "priority"
                              ? "Priority Service"
                              : selectedService.serviceType === "emergency"
                              ? "Emergency Service"
                              : "Enrollment Required"}
                          </Badge>
                        </div>

                        {/* Service Details */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Service Description
                          </h4>
                          <p className="text-gray-600">
                            {selectedService.details}
                          </p>
                        </div>

                        {/* Schedule & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900">
                              Schedule & Location
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-teal-500" />
                                <span>{selectedService.schedule}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-teal-500" />
                                <span>{selectedService.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-teal-500" />
                                <span>{selectedService.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900">
                              Cost & Availability
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-teal-500" />
                                <span
                                  className={getCostColor(selectedService.cost)}
                                >
                                  {selectedService.cost}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-teal-500" />
                                <span>{selectedService.slots}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Requirements
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedService.requirements.map((req, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Shield className="h-4 w-4 text-teal-500 flex-shrink-0" />
                                <span className="text-sm text-gray-600">
                                  {req}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-teal-50 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-900 mb-3">
                            Contact Information
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-teal-600" />
                              <span className="text-sm text-teal-800">
                                {selectedService.contact}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-teal-600" />
                              <span className="text-sm text-teal-800">
                                {selectedService.phone}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-semibold text-amber-800 mb-1">
                                Important Notice
                              </h5>
                              <p className="text-sm text-amber-700">
                                All services require{" "}
                                <strong>walk-in visits</strong> to the barangay.
                                Payments (if applicable) are made in cash at the
                                barangay office.
                                {selectedService.serviceType ===
                                  "appointment" &&
                                  " Please call to schedule your appointment."}
                                {selectedService.cost !== "FREE" &&
                                  " Payment plans available for emergency services."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No services found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}

      {/* Quick Contact */}
      <Card className="bg-gradient-to-r from-teal-50 to-pink-50 border-teal-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need Help or Have Questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Contact our barangay office for assistance with any service
              inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-teal-700">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">(02) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-teal-700">
                <MapPin className="h-4 w-4" />
                <span>Barangay Hall, Mon-Fri 8AM-5PM</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarangayServices;
