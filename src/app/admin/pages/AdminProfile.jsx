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

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Page Header */}
        <PageHeader
          title="Admin Profile"
          description="Manage your personal information and account settings"
          actions={pageHeaderActions}
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

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {isEditMode
                    ? "Update your personal and professional information"
                    : "Your personal and professional information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditMode ? (
                  <ModalForm
                    isOpen={true}
                    onClose={() => {}}
                    title=""
                    description=""
                    fields={profileFormFields}
                    formData={profileForm}
                    setFormData={setProfileForm}
                    onSubmit={handleProfileUpdate}
                    isLoading={isLoading}
                    submitText="Save Changes"
                    showHeader={false}
                    showFooter={true}
                    size="full"
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </Label>
                        <p className="text-lg font-semibold text-foreground">
                          {`${adminData.firstName} ${adminData.middleName} ${adminData.lastName}`}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Employee ID
                        </Label>
                        <p className="text-lg font-semibold text-foreground">
                          {adminData.employeeId}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <p className="text-foreground">{adminData.email}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <p className="text-foreground">
                          {adminData.phoneNumber}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Position
                        </Label>
                        <Badge className="bg-primary/10 text-primary">
                          {adminData.position}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Department
                        </Label>
                        <Badge
                          variant="outline"
                          className="border-accent/30 text-accent"
                        >
                          {adminData.department}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Office Address
                      </Label>
                      <p className="text-foreground">{adminData.address}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Date Hired
                        </Label>
                        <p className="text-foreground">
                          {new Date(adminData.dateHired).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Account Status
                        </Label>
                        <Badge
                          className={
                            adminData.isActive
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          }
                        >
                          {adminData.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Avatar and Quick Actions */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={adminData.avatar} alt="Admin Avatar" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {adminData.firstName.charAt(0)}
                      {adminData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
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
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
