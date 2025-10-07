import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Badge } from "@/core/components/ui/badge";
import { Label } from "@/core/components/ui/label";
import { Armchair, Laptop, Tent, Wrench } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";

const ViewItemDialog = ({ selectedItem, children }) => {
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

  const Icon = selectedItem ? getCategoryIcon(selectedItem.category) : Wrench;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {selectedItem && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                {selectedItem.name}
              </DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Available</Label>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedItem.available} / {selectedItem.total}
                  </p>
                  <p className="text-xs text-muted-foreground">units</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Condition</Label>
                  <div className="mt-1">
                    {getConditionBadge(selectedItem.condition)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Category:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedItem.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Borrowing Fee:
                  </span>
                  <span className="text-sm font-medium text-primary">
                    ₱{selectedItem.borrowingFee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Max Borrow Days:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedItem.maxBorrowDays} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Delivery Available:
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      selectedItem.deliveryAvailable
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {selectedItem.deliveryAvailable ? "Yes" : "Walk-in Only"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span
                    className={`text-sm font-medium ${
                      selectedItem.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {selectedItem.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {selectedItem.requirements &&
                selectedItem.requirements !== "N/A" && (
                  <div>
                    <Label className="text-sm font-medium">Requirements:</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedItem.requirements}
                    </p>
                  </div>
                )}

              {selectedItem.notes && selectedItem.notes !== "N/A" && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-yellow-600 font-medium">
                    Important:
                  </p>
                  <p className="text-sm text-yellow-600/80 mt-1">
                    {selectedItem.notes}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewItemDialog;
