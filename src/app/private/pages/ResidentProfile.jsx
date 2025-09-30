import { useState } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Heart,
  Badge as BadgeIcon,
  Edit,
  Camera,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

// UI Components
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
import { Label } from "@/core/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Separator } from "@/core/components/ui/separator";

export default function ResidentProfile() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock user profile data (would come from auth context)
  const [userProfile, setUserProfile] = useState({
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleName: "Santos",
    fullName: "Juan Santos Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "09123456789",
    dateOfBirth: "1988-05-15",
    age: 35,
    gender: "Male",
    civilStatus: "Married",
    address:
      "123 Main Street, Sitio 1, Barangay Kaypian, San Jose Del Monte, Bulacan",
    emergencyContact: "Maria Dela Cruz",
    emergencyPhone: "09987654321",
    isSenior: false,
    isPwd: false,
    isPregnant: false,
    isVoter: true,
    registeredDate: "2023-06-15",
    profilePicture: "/images/default-avatar.jpg",
  });

  const [editForm, setEditForm] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    middleName: userProfile.middleName,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
    emergencyContact: userProfile.emergencyContact,
    emergencyPhone: userProfile.emergencyPhone,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleEditProfile = () => {
    setEditForm({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      middleName: userProfile.middleName,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address,
      emergencyContact: userProfile.emergencyContact,
      emergencyPhone: userProfile.emergencyPhone,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    // TODO: Replace with actual API call
    const updatedProfile = {
      ...userProfile,
      ...editForm,
      fullName: `${editForm.firstName} ${editForm.middleName} ${editForm.lastName}`,
    };

    setUserProfile(updatedProfile);
    setIsEditDialogOpen(false);

    // TODO: Show success toast
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    // TODO: Replace with actual API call
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    console.log("Password change request:", {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangePasswordOpen(false);

    // TODO: Show success toast
    alert("Password changed successfully!");
  };

  const getStatusBadges = () => {
    const badges = [];

    if (userProfile.isSenior) {
      badges.push(
        <Badge
          key="senior"
          className="bg-accent/10 text-accent border-accent/30"
        >
          <Heart className="h-3 w-3 mr-1" />
          Senior Citizen
        </Badge>
      );
    }

    if (userProfile.isPwd) {
      badges.push(
        <Badge
          key="pwd"
          className="bg-primary/10 text-primary border-primary/30"
        >
          <BadgeIcon className="h-3 w-3 mr-1" />
          PWD
        </Badge>
      );
    }

    if (userProfile.isPregnant) {
      badges.push(
        <Badge
          key="pregnant"
          className="bg-success/10 text-success border-success/30"
        >
          <Heart className="h-3 w-3 mr-1" />
          Pregnant
        </Badge>
      );
    }

    if (userProfile.isVoter) {
      badges.push(
        <Badge
          key="voter"
          className="bg-warning/10 text-warning border-warning/30"
        >
          <BadgeIcon className="h-3 w-3 mr-1" />
          Registered Voter
        </Badge>
      );
    }

    return badges;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              View and manage your personal information
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleEditProfile}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordOpen(true)}
              className="border-accent/30 text-accent hover:bg-accent/10"
            >
              Change Password
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-card border-border hover:shadow-lg transition-all duration-200">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto overflow-hidden">
                  {userProfile.profilePicture ? (
                    <img
                      src={userProfile.profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-primary" />
                  )}
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-2 rounded-full h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-xl text-foreground">
                {userProfile.fullName}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Resident • Barangay Kaypian
              </CardDescription>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {getStatusBadges()}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userProfile.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-foreground">{userProfile.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    Member since{" "}
                    {new Date(userProfile.registeredDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2 bg-card border-border hover:shadow-lg transition-all duration-200 w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your basic personal details and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-1">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </Label>
                    <p className="text-foreground font-medium">
                      {userProfile.fullName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Date of Birth
                    </Label>
                    <p className="text-foreground font-medium">
                      {new Date(userProfile.dateOfBirth).toLocaleDateString()}
                      <span className="text-muted-foreground ml-2">
                        ({calculateAge(userProfile.dateOfBirth)} years old)
                      </span>
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Gender
                    </Label>
                    <p className="text-foreground font-medium">
                      {userProfile.gender}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Civil Status
                    </Label>
                    <p className="text-foreground font-medium">
                      {userProfile.civilStatus}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Emergency Contact
                    </Label>
                    <p className="text-foreground font-medium">
                      {userProfile.emergencyContact}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {userProfile.emergencyPhone}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Security */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BadgeIcon className="h-5 w-5 text-primary" />
              Account Security
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Last changed 30 days ago
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-primary" />
                Edit Profile
              </DialogTitle>
              <DialogDescription>
                Update your personal information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={editForm.middleName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, middleName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={editForm.emergencyContact}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        emergencyContact: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={editForm.emergencyPhone}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        emergencyPhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSaveProfile}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog
          open={isChangePasswordOpen}
          onOpenChange={setIsChangePasswordOpen}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BadgeIcon className="h-5 w-5 text-primary" />
                Change Password
              </DialogTitle>
              <DialogDescription>
                Update your account password
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Password must be at least 8 characters long
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsChangePasswordOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
