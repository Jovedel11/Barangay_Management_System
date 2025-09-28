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
  UserPlus,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Clock,
  AlertTriangle,
  UserCheck,
} from "lucide-react";

const PendingSignupCard = ({
  signup,
  onViewDetails,
  onApprove,
  onReject,
  onProcess,
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending_approval":
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending Approval
          </Badge>
        );
      case "under_review":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/30">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-success/10 text-success border-success/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getVerificationBadge = (verificationStatus, isResidentVerified) => {
    const badges = [];

    if (verificationStatus === "email_verified") {
      badges.push(
        <Badge
          key="email"
          className="bg-success/10 text-success border-success/30 text-xs"
        >
          Email Verified
        </Badge>
      );
    } else {
      badges.push(
        <Badge
          key="email"
          className="bg-warning/10 text-warning border-warning/30 text-xs"
        >
          Email Pending
        </Badge>
      );
    }

    if (isResidentVerified) {
      badges.push(
        <Badge
          key="resident"
          className="bg-success/10 text-success border-success/30 text-xs"
        >
          Resident Verified
        </Badge>
      );
    } else {
      badges.push(
        <Badge
          key="resident"
          className="bg-muted/10 text-muted-foreground border-muted/30 text-xs"
        >
          Not Verified
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
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {signup.firstName} {signup.lastName}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {signup.signupId}
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
              <DropdownMenuItem onClick={() => onViewDetails?.(signup)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onProcess?.(signup)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Process Application
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-success"
                onClick={() => onApprove?.(signup)}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onReject?.(signup)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div>
          <p className="text-sm font-medium text-foreground">{signup.email}</p>
          <p className="text-xs text-muted-foreground">{signup.phoneNumber}</p>
        </div>

        {/* Status */}
        <div className="flex flex-wrap gap-2">
          {getStatusBadge(signup.status)}
        </div>

        {/* Verification Status */}
        <div className="flex flex-wrap gap-2">
          {getVerificationBadge(
            signup.verificationStatus,
            signup.isResidentVerified
          )}
        </div>

        {/* Application Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Applied: {new Date(signup.signupDate).toLocaleDateString()}</p>
          <p>Documents: {signup.submittedDocuments?.length || 0} submitted</p>
          {signup.reasonForSignup && (
            <p className="italic">"{signup.reasonForSignup.slice(0, 80)}..."</p>
          )}
        </div>

        {/* Verification Notes */}
        {signup.verificationNotes && (
          <div className="p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning">
            {signup.verificationNotes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingSignupCard;
