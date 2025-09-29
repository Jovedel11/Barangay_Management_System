import { useState, useCallback } from "react";
import {
  User,
  Shield,
  Calendar,
  Edit,
  X,
} from "lucide-react";

const useAdminProfile = () => {
  // Mock admin data - replace with actual API call
  const [adminData, setAdminData] = useState({
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleName: "Santos",
    email: "admin@barangay.gov.ph",
    phoneNumber: "09123456789",
    address: "123 Main Street, Barangay Hall, City",
    position: "Barangay Captain",
    department: "Executive Office",
    dateHired: "2020-01-15",
    employeeId: "BRGY-001",
    avatar: "/images/admin-avatar.jpg",
    isActive: true,
    lastLogin: "2024-01-20T08:30:00Z",
  });

  // State management
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form data states
  const [profileForm, setProfileForm] = useState({
    firstName: adminData.firstName,
    lastName: adminData.lastName,
    middleName: adminData.middleName,
    email: adminData.email,
    phoneNumber: adminData.phoneNumber,
    address: adminData.address,
    position: adminData.position,
    department: adminData.department,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Profile form fields configuration
  const profileFormFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      gridClassName: "md:col-span-1",
    },
    {
      name: "middleName",
      label: "Middle Name",
      type: "text",
      gridClassName: "md:col-span-1",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
      gridClassName: "md:col-span-1",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      gridClassName: "md:col-span-2",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: true,
      placeholder: "09XXXXXXXXX",
      gridClassName: "md:col-span-1",
    },
    {
      name: "position",
      label: "Position",
      type: "select",
      required: true,
      options: [
        { value: "Barangay Captain", label: "Barangay Captain" },
        { value: "Barangay Secretary", label: "Barangay Secretary" },
        { value: "Barangay Treasurer", label: "Barangay Treasurer" },
        { value: "Barangay Councilor", label: "Barangay Councilor" },
        { value: "SK Chairman", label: "SK Chairman" },
        { value: "Admin Staff", label: "Admin Staff" },
      ],
      gridClassName: "md:col-span-1",
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      required: true,
      options: [
        { value: "Executive Office", label: "Executive Office" },
        { value: "Legislative", label: "Legislative" },
        { value: "Finance", label: "Finance" },
        { value: "Health Services", label: "Health Services" },
        { value: "Public Safety", label: "Public Safety" },
        { value: "Social Services", label: "Social Services" },
      ],
      gridClassName: "md:col-span-1",
    },
    {
      name: "address",
      label: "Complete Address",
      type: "textarea",
      required: true,
      placeholder: "Complete office address",
      rows: 3,
      gridClassName: "md:col-span-3",
    },
  ];

  // Password form fields configuration
  const passwordFormFields = [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      required: true,
      gridClassName: "col-span-full",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      required: true,
      gridClassName: "col-span-full",
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      required: true,
      gridClassName: "col-span-full",
    },
  ];

  // Statistics for admin profile
  const getProfileStats = () => [
    {
      title: "Total Logins",
      value: adminData.loginCount,
      description: "System access count",
      icon: User,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Account Status",
      value: adminData.isActive ? "Active" : "Inactive",
      description: "Current status",
      icon: Shield,
      color: adminData.isActive ? "text-success" : "text-destructive",
      bgColor: adminData.isActive ? "bg-success/10" : "bg-destructive/10",
      borderColor: adminData.isActive ? "border-success/20" : "border-destructive/20",
    },
    {
      title: "Last Login",
      value: new Date(adminData.lastLogin).toLocaleDateString(),
      description: "Recent access",
      icon: Calendar,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "Years of Service",
      value: new Date().getFullYear() - new Date(adminData.dateHired).getFullYear(),
      description: "Experience",
      icon: Calendar,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  ];

  // Event handlers
  const handleEditToggle = () => {
    if (isEditMode) {
      // Reset form data if canceling
      setProfileForm({
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        middleName: adminData.middleName,
        email: adminData.email,
        phoneNumber: adminData.phoneNumber,
        address: adminData.address,
        position: adminData.position,
        department: adminData.department,
      });
    }
    setIsEditMode(!isEditMode);
  };

  const handleProfileUpdate = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update admin data
      const updatedAdmin = {
        ...adminData,
        ...formData,
        lastUpdated: new Date().toISOString(),
      };
      
      setAdminData(updatedAdmin);
      setIsEditMode(false);
      
      return updatedAdmin;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [adminData]);

  const handlePasswordChange = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate passwords match
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("New passwords do not match");
      }
      
      // Validate password strength (basic)
      if (formData.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset password form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setIsChangePasswordOpen(false);
      
      return true;
    } catch (err) {
      setError(err.message || "Failed to change password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAvatarUpload = useCallback(async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error("Please select a valid image file");
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }
      
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create temporary URL for preview
      const avatarUrl = URL.createObjectURL(file);
      
      setAdminData(prev => ({
        ...prev,
        avatar: avatarUrl,
        lastUpdated: new Date().toISOString(),
      }));
      
      return avatarUrl;
    } catch (err) {
      setError(err.message || "Failed to upload avatar");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to refresh data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real implementation, this would fetch fresh data from API
      console.log("Profile data refreshed");
    } catch (err) {
      setError(err.message || "Failed to refresh profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Page header configuration
  const pageHeaderActions = [
    {
      label: isEditMode ? "Cancel" : "Edit Profile",
      variant: isEditMode ? "outline" : "default",
      icon: isEditMode ? X : Edit,
      onClick: handleEditToggle,
      className: isEditMode 
        ? "border-destructive/30 text-destructive hover:bg-destructive/10" 
        : "bg-primary hover:bg-primary/90 text-primary-foreground",
    },
  ];

  return {
    // Data
    adminData,
    profileStats: getProfileStats(),
    
    // State
    isLoading,
    error,
    isEditMode,
    isChangePasswordOpen,
    setIsChangePasswordOpen,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    
    // Form data
    profileForm,
    setProfileForm,
    passwordForm,
    setPasswordForm,
    
    // Form configurations
    profileFormFields,
    passwordFormFields,
    pageHeaderActions,
    
    // Event handlers
    handleEditToggle,
    handleProfileUpdate,
    handlePasswordChange,
    handleAvatarUpload,
    refreshProfile,
    
    // Utility functions
    setError,
  };
};

export default useAdminProfile;