import {
  Edit,
  MoreHorizontal,
  Eye,
  Archive,
  Trash2,
  WarehouseIcon,
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
import { useCallback, useState } from "react";
import ItemDialog from "@/components/custom/ItemDialog";
import ViewItemDialog from "@/components/custom/ViewItem";
import customRequest from "@/services/customRequest";
import { CustomToast } from "@/components/custom/CustomToast";

const ItemCard = ({ item, className = "", refetch }) => {
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);

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

  const onOpen = () => {
    setOpenView((state) => !state);
  };

  const onDelete = async (requestId) => {
    try {
      if (!requestId) throw new Error();
      const result = await customRequest({
        path: "/api/borrow-item/delete",
        attributes: {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_id: requestId }),
        },
      });
      if (!result?.success) {
        return CustomToast({
          description: "Failed to delete the item",
          status: "error",
        });
      }
      refetch();
      CustomToast({
        description: "Item has been deleted successfully",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      CustomToast({
        description: "Internal server error",
        status: "error",
      });
    }
  };

  const onUpdate = useCallback(
    async ({ item_id, status }) => {
      try {
        // Send the opposite of current status to toggle it
        const result = await customRequest({
          path: "/api/borrow-item/update/available",
          attributes: {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docs_id: item_id,
              status: !status, // Just negate the current status
            }),
            credentials: "include",
          },
        });
        if (result?.success) {
          refetch();
          return CustomToast({
            description: "Item status has been updated",
            status: "success",
          });
        }
        CustomToast({
          description: "Failed to update item's status",
          status: "error",
        });
      } catch (error) {
        console.log(error);
        CustomToast({
          description: "Internal server error",
          status: "error",
        });
      }
    },
    [refetch]
  );

  return (
    <Card
      className={`border bg-background/50 border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30 ${className}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <WarehouseIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="truncate w-24 md:w-32">
              <h4 className="font-medium text-foreground truncate">
                {item?.name}
              </h4>
              <p className="text-sm text-muted-foreground capitalize">
                {item?.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {getConditionBadge(item?.condition)}
            {!item?.status && (
              <Badge className="bg-muted/10 text-muted-foreground border-muted/30">
                Inactive
              </Badge>
            )}
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Available:</span>
            <span
              className={`font-medium ${
                item?.available === 0 ? "text-destructive" : "text-success"
              }`}
            >
              {item?.available === 0
                ? "Not Available"
                : `${item?.available}/${item?.total}`}
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
        <ViewItemDialog data={item} open={openView} handleOpenChange={onOpen} />

        <div className="flex gap-2">
          <ItemDialog
            open={open}
            data={item}
            handleOpenChange={setOpen}
            isEdit={true}
          >
            <Button
              size="sm"
              variant="outline"
              className="flex-1 dark:border-slate-700 text-primary hover:bg-primary/10"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </ItemDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="px-2 dark:border-slate-700"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onOpen}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onUpdate({ item_id: item?._id, status: item?.status })
                }
              >
                <Archive className="h-4 w-4 mr-2" />
                {item?.status ? "Deactivate" : "Activate"}
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
