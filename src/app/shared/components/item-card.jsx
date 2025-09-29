import { Edit, MoreHorizontal, Eye, Archive, Trash2 } from "lucide-react";
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

const ItemCard = ({
  item,
  onEdit,
  onView,
  onToggleStatus,
  onDelete,
  className = "",
}) => {
  const getConditionBadge = (condition) => {
    const conditionStyles = {
      Excellent: "bg-success/10 text-success border-success/30",
      Good: "bg-primary/10 text-primary border-primary/30",
      Fair: "bg-warning/10 text-warning border-warning/30",
      Poor: "bg-destructive/10 text-destructive border-destructive/30",
    };
    return (
      <Badge className={conditionStyles[condition] || conditionStyles.Good}>
        {condition}
      </Badge>
    );
  };

  return (
    <Card
      className={`border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 ${className}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {item?.icon ? <item.icon className="h-5 w-5 text-primary" /> : ""}
            </div>
            <div>
              <h4 className="font-medium text-foreground">{item?.name}</h4>
              <p className="text-sm text-muted-foreground capitalize">
                {item?.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {getConditionBadge(item?.condition)}
            {!item?.isActive && (
              <Badge className="bg-muted/10 text-muted-foreground border-muted/30">
                Inactive
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Available:</span>
            <span className="font-medium text-success">
              {item?.available}/{item?.total}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Borrowed:</span>
            <span className="font-medium text-accent">{item?.borrowed}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee:</span>
            <span className="font-medium text-primary">
              {item?.borrowingFee}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Bookings:</span>
            <span className="font-medium text-warning">
              {item?.activeBookings}
            </span>
          </div>
          {item?.overdueBookings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overdue:</span>
              <span className="font-medium text-destructive">
                {item?.overdueBookings}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => onEdit(item)}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="px-2">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView(item)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(item?._id)}>
                <Archive className="h-4 w-4 mr-2" />
                {item?.isActive ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(item?._id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Item
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
