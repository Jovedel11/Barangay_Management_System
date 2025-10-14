import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import { User, Mail, Phone, Shield, Edit } from "lucide-react";
import customRequest from "@/services/customRequest";
import { useQuery } from "@tanstack/react-query";
import { CustomToast } from "@/components/custom/CustomToast";
import { useAuth } from "@/hooks/useAuthProvider";

const ResidentProfile = () => {
  const { user } = useAuth();
  const { data, refetch } = useQuery({
    queryKey: ["resident-profile"],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-residents/profile?user_id=${user._id}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: !!user,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
  const [accountData, setAccountData] = useState({
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    phone_number: "",
    createdAt: "",
    updatedAt: "",
  });

  const [formData, setFormData] = useState({
    first_name: accountData.first_name,
    last_name: accountData.last_name,
    email: accountData.email,
    phone_number: accountData.phone_number,
  });

  const [passwordData, setPasswordData] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { email, ...rest } = formData;
      const payload = {
        ...(accountData.email === email ? {} : { email }),
        ...rest,
      };
      const result = await customRequest({
        path: `/api/brgy-residents/update/account`,
        attributes: {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ docs_id: accountData._id, ...payload }),
        },
      });
      if (result?.success) {
        CustomToast({
          description: "Profile updated successfully",
          status: "success",
        });
        setIsDialogOpen(false);
        return refetch();
      }
      CustomToast({
        description: "Error updating profile",
        status: "error",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      CustomToast({
        description: "New password and confirm password do not match.",
        status: "error",
      });
      return;
    }
    if (passwordData.new_password.length < 8) {
      CustomToast({
        description: "Password must be at least 8 characters long.",
        status: "error",
      });
      return;
    }
    try {
      const result = await customRequest({
        path: `/api/brgy-residents/update/account`,
        attributes: {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            docs_id: accountData._id,
            password: passwordData.new_password,
          }),
        },
      });
      if (result?.success) {
        CustomToast({
          description: "Password updated successfully",
          status: "success",
        });
        setIsDialogOpen(false);
        setPasswordData({
          new_password: "",
          confirm_password: "",
        });
        return refetch();
      }
      CustomToast({
        description: "Failed to update password",
        status: "error",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (data) {
      data?.response?.map((item) => {
        setAccountData({
          _id: item._id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          role: item.role,
          phone_number: item.phone_number,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
        setFormData({
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          phone_number: item.phone_number,
        });
      });
    }
  }, [data]);

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.email.trim() ||
      !formData.phone_number.trim();

    if (anyEmpty) return true;

    const isSameAsData =
      accountData?.first_name === formData.first_name &&
      accountData?.last_name === formData.last_name &&
      accountData?.email === formData.email &&
      accountData?.phone_number === formData.phone_number;

    if (isSameAsData) {
      return true;
    }
    return false;
  }, [accountData, formData]);

  return (
    <div className="p-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Resident Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile information and settings.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Profile Information</CardTitle>
              <CardDescription>Your account details and status</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto gap-y-0">
                <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your account information or update your
                    password
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="profile" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                        />
                      </div>

                      <Button
                        disabled={nothingChanged}
                        onClick={handleUpdateProfile}
                        className="w-full"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="password" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new_password">New Password</Label>
                        <Input
                          id="new_password"
                          name="new_password"
                          type="password"
                          value={passwordData.new_password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm_password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          value={passwordData.confirm_password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <Button onClick={handleUpdatePassword} className="w-full">
                        Update Password
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">
                  {accountData.first_name} {accountData.last_name}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{accountData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{accountData.phone_number}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{accountData.role}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">
                  {formatDate(accountData.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {formatDate(accountData.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentProfile;
