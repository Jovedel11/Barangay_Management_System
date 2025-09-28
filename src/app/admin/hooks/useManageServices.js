import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  Plus,
  Download,
} from "lucide-react";
import {
  IconVaccine,
  IconAmbulance,
  IconGavel,
  IconHeartHandshake,
  IconMedicalCross,
  IconBabyCarriageFilled,
  IconStethoscope,
} from "@tabler/icons-react";

// Hooks
import useServiceManagement from "@/app/shared/hooks/useServiceManager";
import useServiceAppointments from "@/app/shared/hooks/useServiceAppoitnement";

const useManageServices = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("services");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isAppointmentDetailsOpen, setIsAppointmentDetailsOpen] = useState(false);
  const [isProcessAppointmentOpen, setIsProcessAppointmentOpen] = useState(false);
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    name: "",
    category: "",
    description: "",
    schedule: "",
    time: "",
    location: "",
    cost: "FREE",
    requirements: [],
    serviceType: "walk-in",
    available: true,
    slots: "",
    contact: "",
    phone: "",
    details: "",
  });
  const [processForm, setProcessForm] = useState({
    status: "",
    notes: "",
    appointmentDate: "",
  });

  // Custom hooks
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
    refreshServices,
  } = useServiceManagement();

  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
    updateAppointmentStatus,
    approveAppointment,
    cancelAppointment,
    markAsCompleted,
    markAsNoShow,
    rescheduleAppointment,
    deleteAppointment,
    refreshAppointments,
  } = useServiceAppointments();

  // Add icon mapping for services
  const iconMap = {
    1: IconMedicalCross,
    2: IconVaccine,
    3: IconHeartHandshake,
    4: IconGavel,
    5: IconBabyCarriageFilled,
    6: IconAmbulance,
  };

  const servicesWithIcons = services.map((service) => ({
    ...service,
    icon: iconMap[service.id] || IconStethoscope,
  }));

  // Configuration
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "health", label: "Health Services" },
    { value: "veterinary", label: "Veterinary" },
    { value: "legal", label: "Legal Assistance" },
    { value: "emergency", label: "Emergency" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending_approval", label: "Pending Approval" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "no_show", label: "No Show" },
  ];

  // Statistics
  const stats = [
    {
      title: "Total Services",
      value: servicesWithIcons.length,
      description: "Available service types",
      icon: IconStethoscope,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Active Appointments",
      value: appointments.filter((a) => a.status === "confirmed").length,
      description: "Scheduled appointments",
      icon: Calendar,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Pending Approval",
      value: appointments.filter((a) => a.status === "pending_approval").length,
      description: "Awaiting admin approval",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      title: "Completed Today",
      value: appointments.filter((a) => a.status === "completed").length,
      description: "Services completed",
      icon: CheckCircle,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
  ];

  // Tab configuration
  const tabs = [
    {
      value: "services",
      label: "Services",
      icon: IconStethoscope,
      count: servicesWithIcons.length,
    },
    {
      value: "appointments",
      label: "Appointments",
      icon: Calendar,
      count: appointments.length,
    },
  ];

  // Filter configurations
  const serviceFilters = [
    {
      value: filterCategory,
      onChange: setFilterCategory,
      options: categories,
      placeholder: "Filter by category",
    },
  ];

  const appointmentFilters = [
    {
      value: filterStatus,
      onChange: setFilterStatus,
      options: statusOptions,
      placeholder: "Filter by status",
    },
    {
      value: filterCategory,
      onChange: setFilterCategory,
      options: categories,
      placeholder: "Filter by category",
    },
  ];

  // Service form fields
  const serviceFormFields = [
    {
      name: "name",
      label: "Service Name",
      type: "text",
      placeholder: "e.g., Free Medical Check-up",
      required: true,
      gridClassName: "col-span-1",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories.filter((c) => c.value !== "all"),
      required: true,
      gridClassName: "col-span-1",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe the service...",
      gridClassName: "col-span-2",
    },
    {
      name: "schedule",
      label: "Schedule",
      type: "text",
      placeholder: "e.g., Every Monday & Wednesday",
      gridClassName: "col-span-1",
    },
    {
      name: "time",
      label: "Time",
      type: "text",
      placeholder: "e.g., 8:00 AM - 12:00 PM",
      gridClassName: "col-span-1",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "e.g., Barangay Health Center",
      gridClassName: "col-span-2",
    },
    {
      name: "cost",
      label: "Cost",
      type: "text",
      placeholder: "e.g., FREE or ₱100",
      gridClassName: "col-span-1",
    },
    {
      name: "serviceType",
      label: "Service Type",
      type: "select",
      options: [
        { value: "walk-in", label: "Walk-in" },
        { value: "appointment", label: "By Appointment" },
        { value: "priority", label: "Priority Service" },
        { value: "emergency", label: "Emergency" },
        { value: "enrollment", label: "Enrollment Required" },
      ],
      gridClassName: "col-span-1",
    },
    {
      name: "slots",
      label: "Available Slots",
      type: "text",
      placeholder: "e.g., 15 slots available",
      gridClassName: "col-span-1",
    },
    {
      name: "contact",
      label: "Contact Person",
      type: "text",
      placeholder: "e.g., Nurse Maria Santos",
      gridClassName: "col-span-1",
    },
    {
      name: "phone",
      label: "Contact Number",
      type: "text",
      placeholder: "e.g., (02) 123-4567",
      gridClassName: "col-span-2",
    },
    {
      name: "details",
      label: "Detailed Description",
      type: "textarea",
      placeholder: "Detailed information about the service...",
      gridClassName: "col-span-2",
    },
    {
      name: "available",
      label: "Availability",
      type: "checkbox",
      checkboxLabel: "Service Available (Visible to residents)",
      gridClassName: "col-span-2",
    },
  ];

  // Filter functions
  const filteredServices = servicesWithIcons.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.residentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.appointmentNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || appointment.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" ||
      appointment.serviceCategory === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Event handlers
  const handleAddService = () => {
    setServiceForm({
      name: "",
      category: "",
      description: "",
      schedule: "",
      time: "",
      location: "",
      cost: "FREE",
      requirements: [],
      serviceType: "walk-in",
      available: true,
      slots: "",
      contact: "",
      phone: "",
      details: "",
    });
    setSelectedService(null);
    setIsServiceDialogOpen(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setServiceForm({
      name: service.name,
      category: service.category,
      description: service.description,
      schedule: service.schedule,
      time: service.time,
      location: service.location,
      cost: service.cost,
      requirements: service.requirements,
      serviceType: service.serviceType,
      available: service.available,
      slots: service.slots,
      contact: service.contact,
      phone: service.phone,
      details: service.details,
    });
    setIsServiceDialogOpen(true);
  };

  const handleSubmitService = async () => {
    try {
      if (selectedService) {
        await updateService(selectedService.id, serviceForm);
      } else {
        await createService(serviceForm);
      }
      setIsServiceDialogOpen(false);
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleViewServiceDetails = (service) => {
    setSelectedService(service);
    setIsServiceDetailsOpen(true);
  };

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsAppointmentDetailsOpen(true);
  };

  const handleProcessAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setProcessForm({
      status: appointment.status,
      notes: appointment.notes || "",
      appointmentDate: appointment.appointmentDate || "",
    });
    setIsProcessAppointmentOpen(true);
  };

  const handleSubmitProcessing = async () => {
    try {
      await updateAppointmentStatus(selectedAppointment.id, processForm);
      setIsProcessAppointmentOpen(false);
    } catch (error) {
      console.error("Error processing appointment:", error);
    }
  };

  const handleDeleteAppointment = async (appointment) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await deleteAppointment(appointment.id);
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  const handleExport = () => {
    console.log("Export functionality to be implemented");
  };

  const handleRefresh = () => {
    if (activeTab === "services") {
      refreshServices();
    } else {
      refreshAppointments();
    }
  };

  // Page header configuration
  const pageHeaderActions = [
    {
      label: "Export Report",
      variant: "outline",
      icon: Download,
      onClick: handleExport,
      className: "border-primary/30 text-primary hover:bg-primary/10",
    },
    {
      label: "Add New Service",
      icon: Plus,
      onClick: handleAddService,
    },
  ];

  return {
    // State
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    activeTab,
    setActiveTab,
    selectedService,
    selectedAppointment,
    isServiceDialogOpen,
    setIsServiceDialogOpen,
    isAppointmentDetailsOpen,
    setIsAppointmentDetailsOpen,
    isProcessAppointmentOpen,
    setIsProcessAppointmentOpen,
    isServiceDetailsOpen,
    setIsServiceDetailsOpen,
    serviceForm,
    setServiceForm,
    processForm,
    setProcessForm,

    // Data
    servicesWithIcons,
    appointments,
    filteredServices,
    filteredAppointments,

    // Loading states
    servicesLoading,
    appointmentsLoading,

    // Error states
    servicesError,
    appointmentsError,

    // Configuration
    categories,
    statusOptions,
    stats,
    tabs,
    serviceFilters,
    appointmentFilters,
    serviceFormFields,
    pageHeaderActions,

    // Event handlers
    handleAddService,
    handleEditService,
    handleSubmitService,
    handleDeleteService,
    handleViewServiceDetails,
    handleViewAppointmentDetails,
    handleProcessAppointment,
    handleSubmitProcessing,
    handleDeleteAppointment,
    handleExport,
    handleRefresh,
    toggleServiceStatus,

    // Additional functions from hooks
    approveAppointment,
    cancelAppointment,
    markAsCompleted,
    markAsNoShow,
    rescheduleAppointment,
  };
};

export default useManageServices;