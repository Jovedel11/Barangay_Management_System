import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const ViewItemDialog = ({ children, open, handleOpenChange, data }) => {
  if (!data) return null;

  const InfoRow = ({ label, value, fullWidth = false }) => (
    <div className={`flex flex-col gap-y-1 ${fullWidth ? "col-span-2" : ""}`}>
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
        {value || "N/A"}
      </span>
    </div>
  );

  const BooleanBadge = ({ label, value }) => (
    <div className="flex items-center gap-x-2">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}:
      </span>
      {value ? (
        <Badge className="flex items-center gap-x-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
          <Check className="w-3 h-3" />
          Yes
        </Badge>
      ) : (
        <Badge className="flex items-center gap-x-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700">
          <X className="w-3 h-3" />
          No
        </Badge>
      )}
    </div>
  );

  const getCategoryColor = (category) => {
    const colors = {
      Furniture:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      Electronics:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      "Shelter & Tents":
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      "Tools & Equipment":
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
    };
    return (
      colors[category] ||
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
    );
  };

  const getConditionColor = (condition) => {
    const colors = {
      Excellent:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      Good: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      Fair: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      Poor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    };
    return (
      colors[condition] ||
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:min-w-[35rem] max-h-[90vh] overflow-y-auto font-inter dark:bg-slate-900 flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="font-inter text-xl">{data.name}</DialogTitle>
          <DialogDescription className="text-sm">
            View item details and information
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-y-6">
          <div className="flex gap-x-2">
            <Badge className={getCategoryColor(data.category)}>
              {data.category}
            </Badge>
            <Badge className={getConditionColor(data.condition)}>
              {data.condition}
            </Badge>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Description
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <InfoRow label="Available" value={data.available} />
            <InfoRow label="Total" value={data.total} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow
              label="Max Borrow Days"
              value={`${data.maxBorrowDays} days`}
            />
          </div>
          <InfoRow label="Requirements" value={data.requirements} fullWidth />
          <div className="flex flex-col gap-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Notes
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              {data.notes}
            </p>
          </div>
          <div className="flex flex-col gap-y-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Item Options
            </span>
            <div className="flex flex-wrap gap-4">
              <BooleanBadge
                label="Delivery Available"
                value={data.deliveryAvailable}
              />
              <BooleanBadge label="Active Status" value={data.status} />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-x-2 mt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewItemDialog;
