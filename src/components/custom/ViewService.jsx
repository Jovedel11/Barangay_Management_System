import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/core/components/ui/sheet";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, MapPin, Phone } from "lucide-react";

const ViewServiceSheet = ({ children, open, handleOpenChange, data }) => {
  if (!data) return null;

  const InfoRow = ({ label, value, fullWidth = false, icon: Icon }) => (
    <div className={`flex flex-col gap-y-1 ${fullWidth ? "col-span-2" : ""}`}>
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
        {Icon && <Icon className="w-3 h-3" />}
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
          Active
        </Badge>
      ) : (
        <Badge className="flex items-center gap-x-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700">
          <X className="w-3 h-3" />
          Inactive
        </Badge>
      )}
    </div>
  );

  const getCategoryColor = (category) => {
    const colors = {
      Health:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
      Education:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      "Community Services":
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      Emergency:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      Support:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
    };
    return (
      colors[category] ||
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
    );
  };

  const getServiceTypeColor = (type) => {
    const colors = {
      "One-time":
        "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
      Recurring:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      "On-demand":
        "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 border-violet-200 dark:border-violet-800",
    };
    return (
      colors[type] ||
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
    );
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full md:max-w-[25rem] gap-y-0 overflow-y-auto font-inter dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-700">
        <SheetHeader className="text-left">
          <SheetTitle className="font-inter text-xl">{data.name}</SheetTitle>
          <SheetDescription className="text-sm">
            View service details and information
          </SheetDescription>
        </SheetHeader>

        <div className="w-full flex flex-col gap-y-6 px-4">
          <div className="flex gap-x-2 flex-wrap">
            <Badge className={getCategoryColor(data.category)}>
              {data.category}
            </Badge>
            {data.serviceType && (
              <Badge className={getServiceTypeColor(data.serviceType)}>
                {data.serviceType}
              </Badge>
            )}
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
            <InfoRow label="Schedule" value={data.schedule} icon={Clock} />
            <InfoRow label="Time" value={data.time} icon={Clock} />
            <InfoRow
              label="Location"
              value={data.location}
              fullWidth
              icon={MapPin}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Cost" value={data.cost} />
            <InfoRow label="Available Slots" value={data.slots} />
          </div>

          <InfoRow label="Requirements" value={data.requirements} fullWidth />

          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <InfoRow label="Contact Person" value={data.contact} fullWidth />
            <InfoRow
              label="Phone Number"
              value={data.phone}
              icon={Phone}
              fullWidth
            />
          </div>

          {data.details && (
            <div className="flex flex-col gap-y-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Additional Details
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                {data.details}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-y-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Service Status
            </span>
            <BooleanBadge label="Status" value={data.status} />
          </div>
        </div>

        <SheetFooter className="flex flex-row justify-end gap-x-2">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70"
            >
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ViewServiceSheet;
