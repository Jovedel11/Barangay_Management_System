import { useState, useCallback } from "react";
import { Package, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";

// Shared hooks
import useItemManagement from "@/app/shared/hooks/useItemManagement";
import useItemBookings from "@/app/shared/hooks/useItemBooking";

const useResidentItemBooking = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Form state
  const [bookingForm, setBookingForm] = useState({
    quantity: 1,
    borrowDate: "",
    returnDate: "",
    purpose: "",
    eventLocation: "",
    contactNumber: "",
    deliveryMethod: "pickup",
    specialRequirements: {
      isSenior: false,
      isFemale: false,
      isPregnant: false,
    },
  });

  // Custom hooks
  const {
    items: availableItems,
    loading: itemsLoading,
    error: itemsError,
    refreshItems,
  } = useItemManagement();

  const {
    bookings: myBookings,
    loading: bookingsLoading,
    error: bookingsError,
    updateBookingStatus,
    markAsReturned,
    refreshBookings,
  } = useItemBookings();

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

  // Filter available items
  const filteredItems = availableItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory && item.isActive;
  });

  // Filter user's bookings
  const userBookings = myBookings.filter(
    (booking) => booking.residentEmail === userProfile.email
  );

  // Statistics
  const stats = [
    {
      title: "Available to Book",
      value: filteredItems.reduce((sum, item) => sum + item.available, 0),
      description: "Items ready for booking",
      icon: Package,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "My Active Bookings",
      value: userBookings.filter((b) => b.status === "active").length,
      description: "Currently borrowed",
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Pending Approval",
      value: userBookings.filter((b) => b.status === "pending_approval").length,
      description: "Awaiting admin approval",
      icon: CheckCircle,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Overdue Items",
      value: userBookings.filter((b) => b.status === "overdue").length,
      description: "Need immediate return",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
    },
  ];

  // Categories
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "furniture", label: "Furniture" },
    { value: "electronics", label: "Electronics" },
    { value: "shelter", label: "Shelter & Tents" },
    { value: "tools", label: "Tools & Equipment" },
  ];

  // Event handlers
  const handleBookItem = useCallback((item) => {
    setSelectedItem(item);

    // Auto-set delivery method based on user profile
    let defaultDeliveryMethod = "pickup";
    let defaultSpecialRequirements = {
      isSenior: userProfile.isSenior,
      isFemale: userProfile.gender === "female",
      isPregnant: false,
    };

    // Auto-delivery for seniors (but COD)
    if (userProfile.isSenior && item.deliveryAvailable) {
      defaultDeliveryMethod = "delivery";
    }

    setBookingForm({
      quantity: 1,
      borrowDate: "",
      returnDate: "",
      purpose: "",
      eventLocation: "",
      contactNumber: userProfile.phone || "",
      deliveryMethod: defaultDeliveryMethod,
      specialRequirements: defaultSpecialRequirements,
    });
    setIsBookingDialogOpen(true);
  }, [userProfile]);

  const handleSubmitBooking = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      const bookingData = {
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        itemCategory: selectedItem.category,
        residentId: userProfile.id,
        residentName: userProfile.name,
        residentEmail: userProfile.email,
        residentPhone: userProfile.phone,
        residentAddress: userProfile.address,
        ...bookingForm,
        status: "pending_approval",
        bookingDate: new Date().toISOString(),
        totalAmount: selectedItem.borrowingFee,
        paymentStatus: "pending",
        deliveryStatus: bookingForm.deliveryMethod === "pickup" ? "pending" : "scheduled",
      };

      console.log("Booking submitted:", bookingData);
      
      // Close dialog and show success message
      setIsBookingDialogOpen(false);
      
      // Refresh bookings to show new booking
      refreshBookings();
      
      // TODO: Show success toast
    } catch (error) {
      console.error("Error submitting booking:", error);
      // TODO: Show error toast
    }
  }, [selectedItem, bookingForm, userProfile, refreshBookings]);

  const handleMarkAsReturned = useCallback(async (bookingId) => {
    try {
      await markAsReturned(bookingId, new Date().toISOString().split('T')[0], "Marked as returned by resident");
      // TODO: Show success toast
    } catch (error) {
      console.error("Error marking as returned:", error);
      // TODO: Show error toast
    }
  }, [markAsReturned]);

  const handleViewDetails = useCallback((item) => {
    setSelectedItem(item);
    setIsDetailsDialogOpen(true);
  }, []);

  const handleRefresh = useCallback(() => {
    refreshItems();
    refreshBookings();
  }, [refreshItems, refreshBookings]);

  return {
    // State
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    selectedItem,
    isBookingDialogOpen,
    setIsBookingDialogOpen,
    isDetailsDialogOpen,
    setIsDetailsDialogOpen,
    bookingForm,
    setBookingForm,

    // Data
    filteredItems,
    userBookings,
    userProfile,
    stats,
    categories,

    // Loading states
    itemsLoading,
    bookingsLoading,

    // Error states
    itemsError,
    bookingsError,

    // Event handlers
    handleBookItem,
    handleSubmitBooking,
    handleMarkAsReturned,
    handleViewDetails,
    handleRefresh,
  };
};

export default useResidentItemBooking;