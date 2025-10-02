import { useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Heart,
  Plus,
  Download,
} from "lucide-react";

// Import the shared hook
import { useManageUsers as useSharedManageUsers } from "@/app/shared/hooks/useManageUsers";

// Form configurations
import {
  residentFormFields,
  userFormFields,
  pendingProcessFormFields,
} from "@/app/admin/config/user-form-config";

const useManageUsers = () => {
  // Use the shared hook for core functionality
  const sharedHook = useSharedManageUsers();

  // Modal states - specific to admin UI
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [modalType, setModalType] = useState("resident");

  // Form data - specific to admin UI
  const [formData, setFormData] = useState({});

  // Filter configurations
  const getFilters = () => {
    const baseFilters = [];

    if (sharedHook.activeTab !== "pending") {
      baseFilters.push({
        placeholder: "Filter by status",
        value: sharedHook.filterStatus,
        onChange: sharedHook.setFilterStatus,
        options: [
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "suspended", label: "Suspended" },
        ],
      });
    }

    if (sharedHook.activeTab === "residents") {
      baseFilters.push(
        {
          placeholder: "Filter by age",
          value: sharedHook.filterAge,
          onChange: sharedHook.setFilterAge,
          options: [
            { value: "all", label: "All Ages" },
            { value: "minor", label: "Minor (0-17)" },
            { value: "adult", label: "Adult (18-59)" },
            { value: "senior", label: "Senior (60+)" },
          ],
        },
        {
          placeholder: "Filter by gender",
          value: sharedHook.filterGender,
          onChange: sharedHook.setFilterGender,
          options: [
            { value: "all", label: "All Genders" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ],
        }
      );
    }

    if (sharedHook.activeTab === "pending") {
      baseFilters.push({
        placeholder: "Filter by status",
        value: sharedHook.filterStatus,
        onChange: sharedHook.setFilterStatus,
        options: [
          { value: "all", label: "All Status" },
          { value: "pending_approval", label: "Pending Approval" },
          { value: "under_review", label: "Under Review" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ],
      });
    }

    return baseFilters;
  };

  // Get stats with proper icons
  const getStatsWithIcons = () => {
    return sharedHook.stats.map((stat) => ({
      ...stat,
      icon:
        stat.icon === "Users"
          ? Users
          : stat.icon === "UserCheck"
          ? UserCheck
          : stat.icon === "UserPlus"
          ? UserPlus
          : Heart,
    }));
  };

  // Event handlers
  const handleViewDetails = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setFormData(
      type === "user"
        ? {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            address: item.address,
            dateOfBirth: item.dateOfBirth,
            gender: item.gender,
            civilStatus: item.civilStatus,
            occupation: item.occupation,
            isActive: item.accountStatus === "active",
          }
        : item
    );
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setFormData({
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      gender: "",
      civilStatus: "",
      address: "",
      phoneNumber: "",
      email: "",
      occupation: "",
      familyMembers: 1,
      emergencyContact: "",
      emergencyPhone: "",
      isSenior: false,
      isPwd: false,
      isPregnant: false,
      isVoter: false,
      voterIdNumber: "",
      philhealthNumber: "",
      sssNumber: "",
      tinNumber: "",
    });
    setIsAddModalOpen(true);
  };

  const handleProcess = (signup) => {
    setSelectedItem(signup);
    setFormData({
      action: "",
      notes: "",
      reason: "",
    });
    setIsProcessModalOpen(true);
  };

  const handleDelete = async (item, type) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        await sharedHook.deleteResident(item.id);
        // Show success message
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleSuspend = async (user) => {
    if (confirm("Are you sure you want to suspend this user?")) {
      try {
        await sharedHook.suspendUser(user.userId);
        // Show success message
      } catch (error) {
        console.error("Error suspending user:", error);
      }
    }
  };

  const handleResetPassword = async (user) => {
    if (confirm("Send password reset email to this user?")) {
      try {
        await sharedHook.resetUserPassword(user.userId);
        // Show success message
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  };

  // Form submission handlers
  const handleSubmitResident = async (data) => {
    try {
      if (selectedItem) {
        await sharedHook.updateResident(selectedItem.id, data);
      } else {
        await sharedHook.createResident(data);
      }
      setIsEditModalOpen(false);
      setIsAddModalOpen(false);
      // Show success message
    } catch (error) {
      console.error("Error saving resident:", error);
    }
  };

  const handleSubmitUser = async (data) => {
    try {
      await sharedHook.updateUser(selectedItem.userId, data);
      setIsEditModalOpen(false);
      // Show success message
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmitProcess = async (data) => {
    try {
      await sharedHook.processPendingSignup(
        selectedItem.id,
        data.action,
        data.notes,
        data.reason
      );
      setIsProcessModalOpen(false);
      // Show success message
    } catch (error) {
      console.error("Error processing signup:", error);
    }
  };

  // Table column configurations (data only, no JSX)
  const getTableColumnsConfig = () => {
    if (sharedHook.activeTab === "residents") {
      return [
        {
          key: "fullName",
          label: "Name",
          sortable: true,
          type: "nameWithId",
          idPrefix: "RES-",
        },
        {
          key: "age",
          label: "Age/Gender",
          type: "ageGender",
        },
        {
          key: "phoneNumber",
          label: "Contact",
          type: "contactInfo",
        },
        {
          key: "occupation",
          label: "Occupation",
          type: "occupationIncome",
        },
      ];
    }

    if (sharedHook.activeTab === "users") {
      return [
        {
          key: "fullName",
          label: "User",
          sortable: true,
          type: "userInfo",
        },
        {
          key: "email",
          label: "Contact",
          type: "userContact",
        },
        {
          key: "role",
          label: "Role",
          type: "role",
        },
        {
          key: "loginCount",
          label: "Activity",
          type: "activity",
        },
      ];
    }

    return [];
  };

  // Page header configuration
  const pageHeaderActions = [
    {
      label: "Add Resident",
      icon: Plus,
      onClick: handleAdd,
      className: "bg-primary hover:bg-primary/90 text-primary-foreground",
    },
  ];

  return {
    // Shared hook data and methods
    ...sharedHook,

    // Admin-specific modal states
    selectedItem,
    setSelectedItem,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isAddModalOpen,
    setIsAddModalOpen,
    isProcessModalOpen,
    setIsProcessModalOpen,
    modalType,
    setModalType,
    formData,
    setFormData,

    // Admin-specific configurations
    getFilters,
    getStatsWithIcons,
    getTableColumnsConfig,
    pageHeaderActions,

    // Form configurations
    residentFormFields,
    userFormFields,
    pendingProcessFormFields,

    // Admin-specific event handlers
    handleViewDetails,
    handleEdit,
    handleAdd,
    handleProcess,
    handleDelete,
    handleSuspend,
    handleResetPassword,
    handleSubmitResident,
    handleSubmitUser,
    handleSubmitProcess,
  };
};

export default useManageUsers;