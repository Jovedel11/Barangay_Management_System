import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Camera,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Edit,
  Save,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/core/components/ui/alert";

// Shared Components
import PageHeader from "@/app/shared/components/page-header";
import StatsGrid from "@/app/shared/components/stats-grid";
import ModalForm from "@/app/shared/components/modal-form";

// Hook
import useAdminProfile from "@/app/admin/hooks/useAdminProfile";

const AdminProfile = () => {
  const {
    // Data
    adminData,
    profileStats,

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
    setError,
  } = useAdminProfile();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleAvatarUpload(file);
    }
  };

  const handlePasswordSubmit = async (formData) => {
    await handlePasswordChange(formData);
  };

  // Custom password fields with visibility toggle
  const getPasswordFields = () => {
    return passwordFormFields.map((field) => ({
      ...field,
      render: (value, handleInputChange, formData) => (
        <div className="space-y-2">
          <Label htmlFor={field.name} className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          <div className="relative">
            <Input
              id={field.name}
              type={
                field.name === "currentPassword"
                  ? showCurrentPassword
                    ? "text"
                    : "password"
                  : field.name === "newPassword"
                  ? showNewPassword
                    ? "text"
                    : "password"
                  : field.name === "confirmPassword"
                  ? showConfirmPassword
                    ? "text"
                    : "password"
                  : "password"
              }
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => {
                if (field.name === "currentPassword")
                  setShowCurrentPassword(!showCurrentPassword);
                else if (field.name === "newPassword")
                  setShowNewPassword(!showNewPassword);
                else if (field.name === "confirmPassword")
                  setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {(field.name === "currentPassword" && showCurrentPassword) ||
              (field.name === "newPassword" && showNewPassword) ||
              (field.name === "confirmPassword" && showConfirmPassword) ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ),
    }));
  };

  // Render individual form field for inline editing
  const renderProfileField = (field, value, onChange) => {
    if (field.type === "select") {
      return (
        <select
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required={field.required}
        >
          <option value="">{field.placeholder}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <Input
        type={field.type || "text"}
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        className="bg-background border-border text-foreground"
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <PageHeader
          title="Admin Profile"
          description="Manage your personal information and account settings"
        />

        {/* Error Alert */}
        {error && (
          <Alert className="border-destructive/30 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive">Error</AlertTitle>
            <AlertDescription className="text-destructive/80">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Statistics */}
        <StatsGrid stats={profileStats} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <User className="h-5 w-5 text-primary" />
                      Profile Information
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {isEditMode
                        ? "Update your personal and professional information"
                        : "Your personal and professional information"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!isEditMode ? (
                      <Button
                        onClick={handleEditToggle}
                        variant="outline"
                        size="sm"
                        className="border-border text-foreground hover:bg-muted"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleEditToggle}
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:bg-muted"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleProfileUpdate(profileForm)}
                          size="sm"
                          disabled={isLoading}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        First Name{" "}
                        {isEditMode && (
                          <span className="text-destructive">*</span>
                        )}
                      </Label>
                      {isEditMode ? (
                        renderProfileField(
                          {
                            name: "firstName",
                            type: "text",
                            placeholder: "Enter first name",
                            required: true,
                          },
                          profileForm.firstName,
                          (name, value) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              [name]: value,
                            }))
                        )
                      ) : (
                        <p className="text-lg font-semibold text-foreground">
                          {adminData.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Last Name{" "}
                        {isEditMode && (
                          <span className="text-destructive">*</span>
                        )}
                      </Label>
                      {isEditMode ? (
                        renderProfileField(
                          {
                            name: "lastName",
                            type: "text",
                            placeholder: "Enter last name",
                            required: true,
                          },
                          profileForm.lastName,
                          (name, value) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              [name]: value,
                            }))
                        )
                      ) : (
                        <p className="text-lg font-semibold text-foreground">
                          {adminData.lastName}
                        </p>
                      )}
                    </div>

                    {/* Employee ID */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Employee ID
                      </Label>
                      <p className="text-lg font-semibold text-foreground">
                        {adminData.employeeId}
                      </p>
                    </div>

                    {/* Position */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Position
                      </Label>
                      {isEditMode ? (
                        renderProfileField(
                          {
                            name: "position",
                            type: "select",
                            placeholder: "Select position",
                            options: [
                              {
                                value: "Barangay Captain",
                                label: "Barangay Captain",
                              },
                              {
                                value: "Barangay Secretary",
                                label: "Barangay Secretary",
                              },
                              {
                                value: "Barangay Treasurer",
                                label: "Barangay Treasurer",
                              },
                              {
                                value: "Barangay Clerk",
                                label: "Barangay Clerk",
                              },
                            ],
                          },
                          profileForm.position,
                          (name, value) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              [name]: value,
                            }))
                        )
                      ) : (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {adminData.position}
                        </Badge>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address{" "}
                        {isEditMode && (
                          <span className="text-destructive">*</span>
                        )}
                      </Label>
                      {isEditMode ? (
                        renderProfileField(
                          {
                            name: "email",
                            type: "email",
                            placeholder: "Enter email address",
                            required: true,
                          },
                          profileForm.email,
                          (name, value) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              [name]: value,
                            }))
                        )
                      ) : (
                        <p className="text-foreground">{adminData.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number{" "}
                        {isEditMode && (
                          <span className="text-destructive">*</span>
                        )}
                      </Label>
                      {isEditMode ? (
                        renderProfileField(
                          {
                            name: "phoneNumber",
                            type: "tel",
                            placeholder: "Enter phone number",
                            required: true,
                          },
                          profileForm.phoneNumber,
                          (name, value) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              [name]: value,
                            }))
                        )
                      ) : (
                        <p className="text-foreground">
                          {adminData.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Office Address
                    </Label>
                    {isEditMode ? (
                      renderProfileField(
                        {
                          name: "address",
                          type: "text",
                          placeholder: "Enter office address",
                        },
                        profileForm.address,
                        (name, value) =>
                          setProfileForm((prev) => ({ ...prev, [name]: value }))
                      )
                    ) : (
                      <p className="text-foreground">{adminData.address}</p>
                    )}
                  </div>

                  {/* Account Status */}
                  {!isEditMode && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Account Status
                      </Label>
                      <Badge
                        className={
                          adminData.isActive
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {adminData.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avatar and Quick Actions */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-lg text-foreground">
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4 pt-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                    <AvatarImage src={adminData.avatar} alt="Admin Avatar" />
                    <AvatarFallback className="text-lg sm:text-2xl bg-primary/10 text-primary border-2 border-primary/20">
                      {adminData.firstName?.charAt(0)}
                      {adminData.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">
                    {adminData.firstName} {adminData.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {adminData.position}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <Button
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Last Login
                  </Label>
                  <p className="text-sm text-foreground">
                    {new Date(adminData.lastLogin).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Change Password Modal */}
        <ModalForm
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
          title="Change Password"
          description="Update your account password for better security"
          fields={getPasswordFields()}
          formData={passwordForm}
          setFormData={setPasswordForm}
          onSubmit={handlePasswordSubmit}
          isLoading={isLoading}
          submitText="Change Password"
          size="sm"
        />
      </div>
    </div>
  );
};

export default AdminProfile;
