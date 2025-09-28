import {
  Edit,
  MoreHorizontal,
  Eye,
  Settings,
  Archive,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";

const DocumentTypeCard = ({
  documentType,
  onEdit,
  onView,
  onToggleStatus,
  onDelete,
  onSettings,
  className = "",
}) => {
  return (
    <Card
      className={`border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 ${className}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <documentType.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {documentType.name}
              </h4>
              <p className="text-sm text-muted-foreground capitalize">
                {documentType.category}
              </p>
            </div>
          </div>
          <Badge
            className={
              documentType.isActive
                ? "bg-success/10 text-success border-success/30"
                : "bg-destructive/10 text-destructive border-destructive/30"
            }
          >
            {documentType.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium text-primary">{documentType.fee}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Processing:</span>
            <span className="font-medium text-foreground">
              {documentType.processingTime}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Requests:</span>
            <span className="font-medium text-foreground">
              {documentType.totalRequests}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pending:</span>
            <span className="font-medium text-warning">
              {documentType.pendingRequests}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => onView(documentType)}
          >
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="px-2">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(documentType)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Document Type
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSettings(documentType)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(documentType.id)}>
                <Archive className="h-4 w-4 mr-2" />
                {documentType.isActive ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(documentType.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Document Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentTypeCard;
