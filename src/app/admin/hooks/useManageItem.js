import { useState } from "react";
import {
  Package,
  BookOpen,
  Plus,
  Download,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  IconArmchair2,
  IconTable,
  IconSpeakerphone,
  IconTent,
  IconTools,
  IconBuildingWarehouse,
  IconPackage,
} from "@tabler/icons-react";

// Hooks
import useItemManagement from "@/app/shared/hooks/useItemManagement";
import useItemBookings from "@/app/shared/hooks/useItemBooking";

const useManageItem = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("items");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [isProcessBookingOpen, setIsProcessBookingOpen] = useState(false);

  // Form states
  const [itemForm, setItemForm] = useState({
    name: "",
    category: "",
    description: "",
    total: 0,
    available: 0,
    condition: "Good",
    borrowingFee: "Free",
    maxBorrowDays: 7,
    deliveryAvailable: true,
    requirements: [],
    notes: "",
    isActive: true,
  });
  const [processForm, setProcessForm] = useState({
    status: "",
    notes: "",
    returnDate: "",
  });

  // Custom hooks
  const {
    items,
    loading: itemsLoading,
    error: itemsError,
    createItem,
    updateItem,
    deleteItem,
    toggleItemStatus,
    refreshItems,
  } = useItemManagement();

  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
    updateBookingStatus,
    cancelBooking,
    approveBooking,
    markAsReturned,
    refreshBookings,
  } = useItemBookings();

  // Add icon mapping for items
  const iconMap = {
    1: IconArmchair2,
    2: IconTable,
    3: IconSpeakerphone,
    4: IconTent,
    5: IconTools,
    6: IconBuildingWarehouse,
  };

  const itemsWithIcons = items.map((item) => ({
    ...item,
    icon: iconMap[item.id] || IconPackage,
  }));

  // Configuration
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "furniture", label: "Furniture" },
    { value: "electronics", label: "Electronics" },
    { value: "shelter", label: "Shelter & Tents" },
    { value: "tools", label: "Tools & Equipment" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending_approval", label: "Pending Approval" },
    { value: "confirmed", label: "Confirmed" },
    { value: "active", label: "Active" },
    { value: "overdue", label: "Overdue" },
    { value: "returned", label: "Returned" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Statistics
  const stats = [
    {
      title: "Total Items",
      value: itemsWithIcons.length,
      description: "Available item types",
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Active Bookings",
      value: bookings.filter(
        (b) => b.status === "active" || b.status === "confirmed"
      ).length,
      description: "Currently borrowed items",
      icon: BookOpen,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Pending Approval",
      value: bookings.filter((b) => b.status === "pending_approval").length,
      description: "Awaiting admin approval",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      title: "Overdue Items",
      value: bookings.filter((b) => b.status === "overdue").length,
      description: "Need immediate attention",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
    },
  ];

  // Tab configuration
  const tabs = [
    {
      value: "items",
      label: "Items Inventory",
      icon: Package,
      count: itemsWithIcons.length,
    },
    {
      value: "bookings",
      label: "Bookings",
      icon: BookOpen,
      count: bookings.length,
    },
  ];

  // Filter configurations
  const itemFilters = [
    {
      value: filterCategory,
      onChange: setFilterCategory,
      options: categories,
      placeholder: "Filter by category",
    },
  ];

  const bookingFilters = [
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

  // Item form fields configuration
  const itemFormFields = [
    {
      name: "name",
      label: "Item Name",
      type: "text",
      placeholder: "e.g., Plastic Chairs",
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
      placeholder: "Describe the item...",
      gridClassName: "col-span-2",
    },
    {
      name: "total",
      label: "Total Quantity",
      type: "number",
      gridClassName: "col-span-1",
    },
    {
      name: "available",
      label: "Available",
      type: "number",
      gridClassName: "col-span-1",
    },
    {
      name: "condition",
      label: "Condition",
      type: "select",
      options: [
        { value: "Excellent", label: "Excellent" },
        { value: "Good", label: "Good" },
        { value: "Fair", label: "Fair" },
        { value: "Poor", label: "Poor" },
      ],
      gridClassName: "col-span-1",
    },
    {
      name: "borrowingFee",
      label: "Borrowing Fee",
      type: "text",
      placeholder: "e.g., Free or ₱100/day",
      gridClassName: "col-span-1",
    },
    {
      name: "maxBorrowDays",
      label: "Max Borrow Days",
      type: "number",
      gridClassName: "col-span-1",
    },
    {
      name: "deliveryAvailable",
      label: "Delivery Available",
      type: "checkbox",
      checkboxLabel: "Delivery Available",
      gridClassName: "col-span-1",
    },
    {
      name: "isActive",
      label: "Status",
      type: "checkbox",
      checkboxLabel: "Active (Available for booking)",
      gridClassName: "col-span-1",
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Additional notes or instructions...",
      gridClassName: "col-span-2",
    },
  ];

  // Filter functions
  const filteredItems = itemsWithIcons.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || booking.itemCategory === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Event handlers
  const handleAddItem = () => {
    setItemForm({
      name: "",
      category: "",
      description: "",
      total: 0,
      available: 0,
      condition: "Good",
      borrowingFee: "Free",
      maxBorrowDays: 7,
      deliveryAvailable: true,
      requirements: [],
      notes: "",
      isActive: true,
    });
    setSelectedItem(null);
    setIsItemDialogOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setItemForm({
      name: item.name,
      category: item.category,
      description: item.description,
      total: item.total,
      available: item.available,
      condition: item.condition,
      borrowingFee: item.borrowingFee,
      maxBorrowDays: item.maxBorrowDays,
      deliveryAvailable: item.deliveryAvailable,
      requirements: item.requirements,
      notes: item.notes,
      isActive: item.isActive,
    });
    setIsItemDialogOpen(true);
  };

  const handleSubmitItem = async () => {
    try {
      if (selectedItem) {
        await updateItem(selectedItem.id, itemForm);
      } else {
        await createItem(itemForm);
      }
      setIsItemDialogOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setIsBookingDetailsOpen(true);
  };

  const handleProcessBooking = (booking) => {
    setSelectedBooking(booking);
    setProcessForm({
      status: booking.status,
      notes: booking.notes || "",
      returnDate: booking.returnDate || "",
    });
    setIsProcessBookingOpen(true);
  };

  const handleSubmitProcessing = async () => {
    try {
      await updateBookingStatus(selectedBooking.id, processForm);
      setIsProcessBookingOpen(false);
    } catch (error) {
      console.error("Error processing booking:", error);
    }
  };

  const handleRefresh = () => {
    if (activeTab === "items") {
      refreshItems();
    } else {
      refreshBookings();
    }
  };

  // Page header configuration
  const pageHeaderActions = [
    {
      label: "Add New Item",
      icon: Plus,
      onClick: handleAddItem,
      className: "bg-primary hover:bg-primary/90 text-primary-foreground",
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
    selectedItem,
    selectedBooking,
    isItemDialogOpen,
    setIsItemDialogOpen,
    isBookingDetailsOpen,
    setIsBookingDetailsOpen,
    isProcessBookingOpen,
    setIsProcessBookingOpen,
    itemForm,
    setItemForm,
    processForm,
    setProcessForm,
    
    // Data
    itemsWithIcons,
    bookings,
    filteredItems,
    filteredBookings,
    
    // Loading states
    itemsLoading,
    bookingsLoading,
    
    // Error states
    itemsError,
    bookingsError,
    
    // Configuration
    categories,
    statusOptions,
    stats,
    tabs,
    itemFilters,
    bookingFilters,
    itemFormFields,
    pageHeaderActions,
    
    // Event handlers
    handleAddItem,
    handleEditItem,
    handleSubmitItem,
    handleDeleteItem,
    handleViewBookingDetails,
    handleProcessBooking,
    handleSubmitProcessing,
    handleRefresh,
    toggleItemStatus,
    cancelBooking,
  };
};

export default useManageItem;