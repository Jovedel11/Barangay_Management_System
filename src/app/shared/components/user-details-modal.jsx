import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { Badge } from "@/core/components/ui/badge";
import {
  User,
  UserCheck,
  UserPlus,
  Edit,
  CheckCircle,
  XCircle,
  Ban,
  Heart,
} from "lucide-react";

const UserDetailsModal = ({
  isOpen,
  onClose,
  user,
  type = "resident", // "resident", "user", "pending"
  onEdit,
}) => {
  if (!user) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-muted/10 text-muted-foreground border-muted/30">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <Ban className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            Pending Approval
          </Badge>
        );
      case "under_review":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30">
            Under Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSpecialBadges = (user) => {
    const badges = [];
    if (user.isSenior) {
      badges.push(
        <Badge
          key="senior"
          className="bg-accent/10 text-accent border-accent/30 text-xs"
        >
          Senior
        </Badge>
      );
    }
    if (user.isPwd) {
      badges.push(
        <Badge
          key="pwd"
          className="bg-primary/10 text-primary border-primary/30 text-xs"
        >
          PWD
        </Badge>
      );
    }
    if (user.isPregnant) {
      badges.push(
        <Badge
          key="pregnant"
          className="bg-success/10 text-success border-success/30 text-xs"
        >
          Pregnant
        </Badge>
      );
    }
    if (user.isVoter === false && type === "resident") {
      badges.push(
        <Badge
          key="non-voter"
          className="bg-muted/10 text-muted-foreground border-muted/30 text-xs"
        >
          Non-Voter
        </Badge>
      );
    }
    return badges;
  };

  const getIcon = () => {
    switch (type) {
      case "user":
        return <UserCheck className="h-5 w-5 text-primary" />;
      case "pending":
        return <UserPlus className="h-5 w-5 text-primary" />;
      default:
        return <User className="h-5 w-5 text-primary" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "user":
        return `User Account Details - ${user.fullName}`;
      case "pending":
        return `Pending Signup Details - ${user.firstName} ${user.lastName}`;
      default:
        return `Resident Details - ${user.fullName}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
          <DialogDescription>
            {type === "pending"
              ? "Review signup application and submitted information"
              : type === "user"
              ? "System account information and activity"
              : "Complete resident information and records"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Personal Information</Label>
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    {type === "pending" ? "First Name:" : "Full Name:"}
                  </span>
                  <p className="font-medium">
                    {type === "pending"
                      ? user.firstName
                      : user.fullName || `${user.firstName} ${user.lastName}`}
                  </p>
                </div>
                {type === "pending" && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Last Name:
                    </span>
                    <p className="font-medium">{user.lastName}</p>
                  </div>
                )}
                {type !== "pending" && user.dateOfBirth && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Date of Birth:
                    </span>
                    <p className="font-medium">
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                      {user.age && ` (${user.age} years old)`}
                    </p>
                  </div>
                )}
                {type !== "pending" && user.gender && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Gender:
                    </span>
                    <p className="font-medium">{user.gender}</p>
                  </div>
                )}
                {type !== "pending" && user.civilStatus && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Civil Status:
                    </span>
                    <p className="font-medium">{user.civilStatus}</p>
                  </div>
                )}
              </div>
              {type !== "pending" && user.address && (
                <div>
                  <span className="text-sm text-muted-foreground">
                    Address:
                  </span>
                  <p className="font-medium">{user.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Contact Information</Label>
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Phone Number:
                  </span>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p className="font-medium">{user.email || "Not provided"}</p>
                </div>
                {type === "resident" && user.emergencyContact && (
                  <>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Emergency Contact:
                      </span>
                      <p className="font-medium">{user.emergencyContact}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Emergency Phone:
                      </span>
                      <p className="font-medium">{user.emergencyPhone}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* User Account Information */}
          {type === "user" && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Account Information</Label>
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      User ID:
                    </span>
                    <p className="font-medium">{user.userId}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Username:
                    </span>
                    <p className="font-medium">@{user.username}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Role:</span>
                    <p className="font-medium">{user.role}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Status:
                    </span>
                    <div className="mt-1">
                      {getStatusBadge(user.accountStatus)}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Account Created:
                    </span>
                    <p className="font-medium">
                      {new Date(user.accountCreated).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Last Login:
                    </span>
                    <p className="font-medium">
                      {new Date(user.lastLogin).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pending Signup Information */}
          {type === "pending" && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Application Status</Label>
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Signup ID:
                    </span>
                    <p className="font-medium">{user.signupId}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Status:
                    </span>
                    <div className="mt-1">{getStatusBadge(user.status)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Signup Date:
                    </span>
                    <p className="font-medium">
                      {new Date(user.signupDate).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Verification:
                    </span>
                    <div className="mt-1">
                      <Badge
                        className={
                          user.verificationStatus === "email_verified"
                            ? "bg-success/10 text-success border-success/30"
                            : "bg-warning/10 text-warning border-warning/30"
                        }
                      >
                        {user.verificationStatus === "email_verified"
                          ? "Email Verified"
                          : "Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Special Status for Residents */}
          {(type === "resident" || type === "user") && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Special Status</Label>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {getSpecialBadges(user)}
                  {getSpecialBadges(user).length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No special status
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submitted Documents for Pending */}
          {type === "pending" && user.submittedDocuments && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Submitted Documents</Label>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {user.submittedDocuments.map((doc, index) => (
                    <Badge
                      key={index}
                      className="bg-primary/10 text-primary border-primary/30"
                    >
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* User Permissions */}
          {type === "user" && user.permissions && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Permissions</Label>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission, index) => (
                    <Badge
                      key={index}
                      className="bg-primary/10 text-primary border-primary/30"
                    >
                      {permission.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onEdit && (
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                onClose();
                onEdit(user);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit{" "}
              {type === "user"
                ? "User"
                : type === "pending"
                ? "Application"
                : "Resident"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
