import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import {
  User,
  UserCheck,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Shield,
  RefreshCw,
  Ban,
  CheckCircle,
  XCircle,
  Heart,
} from "lucide-react";

const UserCard = ({
  user,
  type = "resident",
  onViewDetails,
  onEdit,
  onDelete,
  onCreateAccount,
  onSuspend,
  onResetPassword,
  onManagePermissions,
}) => {
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
    if (!user.isVoter && type === "resident") {
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

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {type === "user" ? (
                <UserCheck className="h-6 w-6 text-primary" />
              ) : (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {user.fullName || `${user.firstName} ${user.lastName}`}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {type === "user"
                  ? `@${user.username} • ${user.userId}`
                  : `ID: RES-${user.id.toString().padStart(4, "0")}`}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails?.(user)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(user)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit {type === "user" ? "User" : "Resident"}
              </DropdownMenuItem>

              {type === "user" && (
                <>
                  <DropdownMenuItem onClick={() => onManagePermissions?.(user)}>
                    <Shield className="h-4 w-4 mr-2" />
                    Manage Permissions
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onResetPassword?.(user)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Password
                  </DropdownMenuItem>
                </>
              )}

              {type === "resident" && !user.hasAccount && (
                <DropdownMenuItem onClick={() => onCreateAccount?.(user)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              {type === "user" && (
                <DropdownMenuItem onClick={() => onSuspend?.(user)}>
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend Account
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete?.(user)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {type === "user" ? "Delete Account" : "Remove Resident"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div>
          <p className="text-sm font-medium text-foreground">
            {user.email || user.phoneNumber}
          </p>
          <p className="text-xs text-muted-foreground">
            {user.email && user.phoneNumber
              ? user.phoneNumber
              : user.address?.slice(0, 50) + "..."}
          </p>
        </div>

        {/* Status and Special Badges */}
        <div className="flex flex-wrap gap-2">
          {type === "user" && getStatusBadge(user.accountStatus)}
          {type === "resident" &&
            user.hasAccount &&
            getStatusBadge(user.accountStatus)}
          {type === "resident" && !user.hasAccount && (
            <Badge className="bg-muted/10 text-muted-foreground border-muted/30">
              No Account
            </Badge>
          )}
          {getSpecialBadges(user)}
        </div>

        {/* Additional Info for Users */}
        {type === "user" && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              Role: {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
            </p>
            <p>Last Login: {new Date(user.lastLogin).toLocaleDateString()}</p>
            <p>Permissions: {user.permissions?.length || 0}</p>
          </div>
        )}

        {/* Additional Info for Residents */}
        {type === "resident" && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              Age: {user.age} years • {user.gender}
            </p>
            <p>Occupation: {user.occupation}</p>
            {user.hasAccount && (
              <p>
                Account since:{" "}
                {new Date(user.registeredDate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
