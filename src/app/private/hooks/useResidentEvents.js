import { useState, useCallback } from "react";
import { Calendar, Trophy, Users, Star } from "lucide-react";

// Shared hooks
import useEventManagement from "@/app/shared/hooks/useEventManagement";
import useEventRegistrations from "@/app/shared/hooks/useEventRegistration";

const useResidentEvents = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);

  // Registration form state
  const [registrationForm, setRegistrationForm] = useState({
    teamMembers: "",
    specialRequirements: "",
    notes: "",
    contactNumber: "",
  });

  // Custom hooks
  const {
    events: barangayEvents,
    loading: eventsLoading,
    error: eventsError,
    refreshEvents,
  } = useEventManagement();

  const {
    registrations: myRegistrations,
    loading: registrationsLoading,
    error: registrationsError,
    updateRegistrationStatus,
    refreshRegistrations,
  } = useEventRegistrations();

  // Mock user profile
  const userProfile = {
    id: 1,
    name: "Juan Dela Cruz",
    age: 35,
    gender: "male",
    isSenior: false,
    address: "123 Main St, Barangay Kaypian",
    email: "juan.delacruz@email.com",
    phone: "09123456789",
  };

  // Filter events
  const filteredEvents = barangayEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || event.category === filterCategory;
    const matchesMonth =
      filterMonth === "all" || event.date.startsWith(filterMonth);
    return matchesSearch && matchesCategory && matchesMonth && event.isActive;
  });

  // Filter user's registrations
  const userRegistrations = myRegistrations.filter(
    (registration) => registration.residentEmail === userProfile.email
  );

  // Featured events
  const featuredEvents = barangayEvents.filter(
    (event) => event.featured && event.isActive
  );

  // Statistics
  const stats = [
    {
      title: "Upcoming Events",
      value: filteredEvents.filter((e) => e.status === "upcoming").length,
      description: "Events this month",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Sports Events",
      value: filteredEvents.filter((e) => e.category === "sports").length,
      description: "Athletic competitions",
      icon: Trophy,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Community Events",
      value: filteredEvents.filter((e) =>
        ["community", "fiesta"].includes(e.category)
      ).length,
      description: "Community gatherings",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "My Registrations",
      value: userRegistrations.filter((r) => r.status !== "cancelled").length,
      description: "Active registrations",
      icon: Star,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  ];

  // Categories
  const categories = [
    { value: "all", label: "All Events" },
    { value: "sports", label: "Sports & Athletics" },
    { value: "pageant", label: "Beauty Pageants" },
    { value: "entertainment", label: "Entertainment" },
    { value: "competition", label: "Competitions" },
    { value: "community", label: "Community Events" },
    { value: "fiesta", label: "Fiesta & Celebrations" },
  ];

  // Months
  const months = [
    { value: "all", label: "All Months" },
    { value: "2024-02", label: "February 2024" },
    { value: "2024-03", label: "March 2024" },
    { value: "2024-04", label: "April 2024" },
    { value: "2024-05", label: "May 2024" },
  ];

  // Helper functions
  const getStatusBadge = useCallback((status, date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return {
        variant: "outline",
        className: "bg-muted text-muted-foreground border-muted",
        label: "Past Event",
        icon: "Clock",
      };
    } else if (daysDiff <= 7) {
      return {
        variant: "default",
        className: "bg-destructive/10 text-destructive border-destructive/30",
        label: "This Week",
        icon: "Bell",
      };
    } else if (daysDiff <= 30) {
      return {
        variant: "default",
        className: "bg-warning/10 text-warning border-warning/30",
        label: "This Month",
        icon: "Calendar",
      };
    } else {
      return {
        variant: "default",
        className: "bg-primary/10 text-primary border-primary/30",
        label: "Upcoming",
        icon: "Calendar",
      };
    }
  }, []);

  const getCategoryBadge = useCallback((category) => {
    const categoryStyles = {
      sports: "bg-success/10 text-success border-success/30",
      pageant: "bg-accent/10 text-accent border-accent/30",
      entertainment: "bg-primary/10 text-primary border-primary/30",
      competition: "bg-warning/10 text-warning border-warning/30",
      community: "bg-secondary/20 text-secondary-foreground border-secondary/30",
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

    return {
      className: categoryStyles[category] || categoryStyles.community,
      label: categoryLabels[category] || category,
    };
  }, []);

  // Event handlers
  const handleViewDetails = useCallback((event) => {
    setSelectedEvent(event);
    setIsDetailsDialogOpen(true);
  }, []);

  const handleRegisterForEvent = useCallback((event) => {
    setSelectedEvent(event);
    setRegistrationForm({
      teamMembers: "",
      specialRequirements: "",
      notes: "",
      contactNumber: userProfile.phone || "",
    });
    setIsRegistrationDialogOpen(true);
  }, [userProfile.phone]);

  const handleSubmitRegistration = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      const registrationData = {
        residentId: userProfile.id,
        residentName: userProfile.name,
        residentEmail: userProfile.email,
        residentPhone: userProfile.phone,
        residentAddress: userProfile.address,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventCategory: selectedEvent.category,
        eventDate: selectedEvent.date,
        registrationDate: new Date().toISOString(),
        status: "pending_approval",
        paymentStatus: "pending",
        registrationFee: selectedEvent.registrationFee || "Free",
        ...registrationForm,
      };

      console.log("Registration submitted:", registrationData);
      
      // Close dialog and show success message
      setIsRegistrationDialogOpen(false);
      
      // Refresh registrations to show new registration
      refreshRegistrations();
      
      // TODO: Show success toast
    } catch (error) {
      console.error("Error submitting registration:", error);
      // TODO: Show error toast
    }
  }, [selectedEvent, registrationForm, userProfile, refreshRegistrations]);

  const handleContactOrganizer = useCallback((event) => {
    // TODO: Implement contact functionality (phone call or email)
    const phoneNumber = event.phone;
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_self');
    }
  }, []);

  const handleRefresh = useCallback(() => {
    refreshEvents();
    refreshRegistrations();
  }, [refreshEvents, refreshRegistrations]);

  return {
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

    // Error states
    eventsError,
    registrationsError,

    // Helper functions
    getStatusBadge,
    getCategoryBadge,

    // Event handlers
    handleViewDetails,
    handleRegisterForEvent,
    handleSubmitRegistration,
    handleContactOrganizer,
    handleRefresh,
  };
};

export default useResidentEvents;