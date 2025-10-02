import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Download,
} from "lucide-react";
import {
  IconBallBasketball,
  IconPlayFootball,
  IconMicrophone,
  IconCrown,
  IconGift,
  IconHeart,
  IconCalendarEvent,
} from "@tabler/icons-react";

// Hooks
import useEventManagement from "@/app/shared/hooks/useEventManagement";
import useEventRegistrations from "@/app/shared/hooks/useEventRegistration";

const useManageEvents = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [activeTab, setActiveTab] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isRegistrationDetailsOpen, setIsRegistrationDetailsOpen] = useState(false);
  const [isProcessRegistrationOpen, setIsProcessRegistrationOpen] = useState(false);

  // Form states
  const [eventForm, setEventForm] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    endDate: "",
    time: "",
    venue: "",
    organizer: "",
    contact: "",
    phone: "",
    participants: "",
    prizes: "",
    requirements: "",
    activities: "",
    categories: "",
    featured: false,
    status: "upcoming",
    image: "",
  });
  const [processForm, setProcessForm] = useState({
    status: "",
    notes: "",
    paymentStatus: "",
  });

  // Custom hooks
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleEventStatus,
    updateEventStatus,
    toggleFeaturedStatus,
    refreshEvents,
  } = useEventManagement();

  const {
    registrations,
    loading: registrationsLoading,
    error: registrationsError,
    updateRegistrationStatus,
    approveRegistration,
    rejectRegistration,
    markAsCompleted,
    updatePaymentStatus,
    deleteRegistration,
    refreshRegistrations,
  } = useEventRegistrations();

  // Add icon mapping for events
  const iconMap = {
    1: IconBallBasketball,
    2: IconCrown,
    3: IconGift,
    4: IconPlayFootball,
    5: IconMicrophone,
    6: IconHeart,
  };

  const eventsWithIcons = events.map((event) => ({
    ...event,
    icon: iconMap[event.id] || IconCalendarEvent,
  }));

  // Configuration
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "sports", label: "Sports & Athletics" },
    { value: "pageant", label: "Beauty Pageants" },
    { value: "entertainment", label: "Entertainment" },
    { value: "competition", label: "Competitions" },
    { value: "community", label: "Community Events" },
    { value: "fiesta", label: "Fiesta & Celebrations" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending_approval", label: "Pending Approval" },
    { value: "confirmed", label: "Confirmed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ];

  const months = [
    { value: "all", label: "All Months" },
    { value: "2024-02", label: "February 2024" },
    { value: "2024-03", label: "March 2024" },
    { value: "2024-04", label: "April 2024" },
    { value: "2024-05", label: "May 2024" },
  ];

  const eventStatusOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "postponed", label: "Postponed" },
  ];

  // Statistics
  const stats = [
    {
      title: "Total Events",
      value: eventsWithIcons.length,
      description: "Active events",
      icon: IconCalendarEvent,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Upcoming Events",
      value: eventsWithIcons.filter((e) => e.status === "upcoming").length,
      description: "Events scheduled",
      icon: Calendar,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Total Registrations",
      value: registrations.length,
      description: "All registrations",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Pending Approval",
      value: registrations.filter((r) => r.status === "pending_approval").length,
      description: "Awaiting approval",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  ];

  // Tab configuration
  const tabs = [
    {
      value: "events",
      label: "Events",
      icon: IconCalendarEvent,
      count: eventsWithIcons.length,
    },
    {
      value: "registrations",
      label: "Registrations",
      icon: Users,
      count: registrations.length,
    },
  ];

  // Filter configurations
  const eventFilters = [
    {
      value: filterCategory,
      onChange: setFilterCategory,
      options: categories,
      placeholder: "Category",
    },
    {
      value: filterMonth,
      onChange: setFilterMonth,
      options: months,
      placeholder: "Month",
    },
  ];

  const registrationFilters = [
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

  // Event form fields
  const eventFormFields = [
    {
      name: "title",
      label: "Event Title",
      type: "text",
      placeholder: "e.g., Liga ng mga Barangay Basketball Tournament",
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
      placeholder: "Describe the event...",
      gridClassName: "col-span-2",
    },
    {
      name: "date",
      label: "Start Date",
      type: "date",
      required: true,
      gridClassName: "col-span-1",
    },
    {
      name: "endDate",
      label: "End Date (Optional)",
      type: "date",
      gridClassName: "col-span-1",
    },
    {
      name: "time",
      label: "Time",
      type: "text",
      placeholder: "e.g., 6:00 PM - 10:00 PM",
      gridClassName: "col-span-1",
    },
    {
      name: "venue",
      label: "Venue",
      type: "text",
      placeholder: "e.g., Barangay Basketball Court",
      gridClassName: "col-span-2",
    },
    {
      name: "organizer",
      label: "Organizer",
      type: "text",
      placeholder: "e.g., Barangay Sports Committee",
      gridClassName: "col-span-1",
    },
    {
      name: "contact",
      label: "Contact Person",
      type: "text",
      placeholder: "e.g., Kagawad Pedro Santos",
      gridClassName: "col-span-1",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "e.g., 09123456789",
      gridClassName: "col-span-1",
    },
    {
      name: "participants",
      label: "Participants",
      type: "text",
      placeholder: "e.g., 16 teams",
      gridClassName: "col-span-1",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: eventStatusOptions,
      gridClassName: "col-span-1",
    },
    {
      name: "prizes",
      label: "Prizes & Awards (Optional)",
      type: "textarea",
      placeholder: "e.g., ₱15,000 Champion, ₱10,000 1st Runner-up...",
      gridClassName: "col-span-2",
    },
    {
      name: "requirements",
      label: "Requirements",
      type: "textarea",
      placeholder: "e.g., Team registration required...",
      gridClassName: "col-span-2",
    },
    {
      name: "activities",
      label: "Activities (Optional)",
      type: "textarea",
      placeholder: "e.g., Elimination rounds, Semi-finals, Finals...",
      gridClassName: "col-span-2",
    },
    {
      name: "categories",
      label: "Categories (Optional)",
      type: "textarea",
      placeholder: "e.g., Men's Open Division, Women's Division...",
      gridClassName: "col-span-2",
    },
    {
      name: "featured",
      label: "Featured Event",
      type: "checkbox",
      checkboxLabel: "Featured Event (Show on homepage)",
      gridClassName: "col-span-2",
    },
  ];

  // Filter functions
  const filteredEvents = eventsWithIcons.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || event.category === filterCategory;
    const matchesMonth =
      filterMonth === "all" || event.date.startsWith(filterMonth);
    return matchesSearch && matchesCategory && matchesMonth;
  });

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.residentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      registration.registrationNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      registration.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || registration.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || registration.eventCategory === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Event handlers
  const handleAddEvent = () => {
    setEventForm({
      title: "",
      category: "",
      description: "",
      date: "",
      endDate: "",
      time: "",
      venue: "",
      organizer: "",
      contact: "",
      phone: "",
      participants: "",
      prizes: "",
      requirements: "",
      activities: "",
      categories: "",
      featured: false,
      status: "upcoming",
    });
    setSelectedEvent(null);
    setIsEventDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      category: event.category,
      description: event.description,
      date: event.date,
      endDate: event.endDate || "",
      time: event.time,
      venue: event.venue,
      organizer: event.organizer,
      contact: event.contact,
      phone: event.phone,
      participants: event.participants,
      prizes: event.prizes || "",
      requirements: event.requirements,
      activities: event.activities || "",
      categories: event.categories || "",
      featured: event.featured,
      status: event.status,
    });
    setIsEventDialogOpen(true);
  };

  const handleSubmitEvent = async () => {
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent.id, eventForm);
      } else {
        await createEvent(eventForm);
      }
      setIsEventDialogOpen(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleViewEvent = (event) => {
    console.log("View event:", event);
  };

  const handleViewRegistrations = (event) => {
    console.log("View registrations for:", event);
    // Could switch to registrations tab and filter by event
    setActiveTab("registrations");
  };

  const handleViewRegistrationDetails = (registration) => {
    setSelectedRegistration(registration);
    setIsRegistrationDetailsOpen(true);
  };

  const handleProcessRegistration = (registration) => {
    setSelectedRegistration(registration);
    setProcessForm({
      status: registration.status,
      notes: registration.notes || "",
      paymentStatus: registration.paymentStatus,
    });
    setIsProcessRegistrationOpen(true);
  };

  const handleSubmitProcessing = async () => {
    try {
      await updateRegistrationStatus(selectedRegistration.id, processForm);
      setIsProcessRegistrationOpen(false);
    } catch (error) {
      console.error("Error processing registration:", error);
    }
  };

  const handleDeleteRegistration = async (registration) => {
    if (window.confirm("Are you sure you want to cancel this registration?")) {
      try {
        await deleteRegistration(registration.id);
      } catch (error) {
        console.error("Error deleting registration:", error);
      }
    }
  };

  const handleRefresh = () => {
    if (activeTab === "events") {
      refreshEvents();
    } else {
      refreshRegistrations();
    }
  };

  // Page header configuration
  const pageHeaderActions = [
    {
      label: "Add New Event",
      icon: Plus,
      onClick: handleAddEvent,
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
    filterMonth,
    setFilterMonth,
    activeTab,
    setActiveTab,
    selectedEvent,
    selectedRegistration,
    isEventDialogOpen,
    setIsEventDialogOpen,
    isRegistrationDetailsOpen,
    setIsRegistrationDetailsOpen,
    isProcessRegistrationOpen,
    setIsProcessRegistrationOpen,
    eventForm,
    setEventForm,
    processForm,
    setProcessForm,

    // Data
    eventsWithIcons,
    registrations,
    filteredEvents,
    filteredRegistrations,

    // Loading states
    eventsLoading,
    registrationsLoading,

    // Error states
    eventsError,
    registrationsError,

    // Configuration
    categories,
    statusOptions,
    months,
    eventStatusOptions,
    stats,
    tabs,
    eventFilters,
    registrationFilters,
    eventFormFields,
    pageHeaderActions,

    // Event handlers
    handleAddEvent,
    handleEditEvent,
    handleSubmitEvent,
    handleDeleteEvent,
    handleViewEvent,
    handleViewRegistrations,
    handleViewRegistrationDetails,
    handleProcessRegistration,
    handleSubmitProcessing,
    handleDeleteRegistration,
    handleRefresh,
    toggleEventStatus,
    toggleFeaturedStatus,

    // Additional functions from hooks
    updateEventStatus,
    approveRegistration,
    rejectRegistration,
    markAsCompleted,
    updatePaymentStatus,
  };
};

export default useManageEvents;