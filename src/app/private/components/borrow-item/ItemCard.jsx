import { Card, CardContent } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { Plus, Eye, Armchair, Laptop, Tent, Wrench } from "lucide-react";
import BorrowSheet from "./BorrowSheet";
import { useState } from "react";
import ViewItemDialog from "./ViewDialog";

const ItemCard = ({ item, refetch }) => {
  const [openBorrow, setOpenBorrow] = useState(false);
  const getCategoryIcon = (category) => {
    const iconMap = {
      Furniture: Armchair,
      Electronics: Laptop,
      "Shelter & Tents": Tent,
      "Tools & Equipment": Wrench,
    };
    return iconMap[category] || Wrench;
  };

  const getConditionBadge = (condition) => {
    const conditionStyles = {
      Excellent: "bg-green-500/10 text-green-600 border-green-500/30",
      Good: "bg-blue-500/10 text-blue-600 border-blue-500/30",
      Fair: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      Poor: "bg-red-500/10 text-red-600 border-red-500/30",
    };
    return (
      <Badge className={conditionStyles[condition] || conditionStyles.Good}>
        {condition}
      </Badge>
    );
  };

  const Icon = getCategoryIcon(item.category);
  const onBorrow = () => setOpenBorrow((set) => !set);
  return (
    <Card className="border bg-background/50 border-border hover:shadow-sm transition-all duration-200 hover:border-primary/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground">{item?.category}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item?.description}
              </p>
            </div>
          </div>
          {getConditionBadge(item.condition)}
        </div>

        <div className="space-y-2 mb-4">
          {item?.available !== 0 && <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Available:</span>
            <span
              className={`font-medium ${
                item?.available === 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {item?.available === 0
                ? "Not Available"
                : `${item?.available} / ${item?.total} units`}
            </span>
          </div>}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Max Days:</span>
            <span className="font-medium text-foreground">
              {item?.maxBorrowDays} days
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery:</span>
            <span
              className={`font-medium ${
                item.deliveryAvailable ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {item?.deliveryAvailable ? "Available" : "Walk-in Only"}
            </span>
          </div>
        </div>

        {item?.available === 0 && (
          <div className="p-3 mb-4 border rounded-md border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40">
            <p className="text-xs text-amber-900 dark:text-amber-100">
              <span className="font-semibold">Currently unavailable</span> – You can still book for a future date. Your reservation will be pending admin approval.
            </p>
          </div>
        )}

        <BorrowSheet
          refetch={refetch}
          selectedItem={item}
          open={openBorrow}
          onOpenChange={onBorrow}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={onBorrow}
          >
            <Plus className="h-3 w-3 mr-1" />
            Book Now
          </Button>
          <ViewItemDialog selectedItem={item}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {}}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </ViewItemDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;