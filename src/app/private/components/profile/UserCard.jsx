import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";

const UserCard = ({ userProfile }) => {
  // Handle missing fields safely
  const fullName = `${userProfile.first_name || ""} ${
    userProfile.last_name || ""
  }`.trim();
  const email = userProfile.email || "No email provided";
  const phone = userProfile.phone_number || "No phone provided";
  const role = userProfile.role
    ? userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)
    : "Resident";
  const address = userProfile.address || "No address provided";
  const createdDate = userProfile.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString()
    : "N/A";

  return (
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
        <CardTitle className="text-xl text-foreground">{fullName}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {role} • Barangay Kaypian
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{phone}</span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-foreground">{address}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">Member since {createdDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
