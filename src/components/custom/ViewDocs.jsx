import { Fragment } from "react";
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
import { Check, X } from "lucide-react";

const ViewDocs = ({ children, open, handleOpenChange, data }) => {
  if (!data) return null;

  const InfoRow = ({ label, value, fullWidth = false }) => {
    if (!value) return null;

    return (
      <div className={`flex flex-col gap-y-1 ${fullWidth ? "col-span-2" : ""}`}>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {value}
        </span>
      </div>
    );
  };

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
      "Civil Registry":
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      "Business Permits":
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      Clearance:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
      Certificates:
        "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    };
    return (
      colors[category] ||
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
    );
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="w-full md:max-w-[25rem] gap-y-0 overflow-y-auto font-inter dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-700">
        <SheetHeader className="text-left">
          <SheetTitle className="font-inter text-xl">
            {data.name || "Document Service"}
          </SheetTitle>
          <SheetDescription className="text-sm">
            View document service details and requirements
          </SheetDescription>
        </SheetHeader>

        <div className="w-full flex flex-col gap-y-6 px-4">
          {/* Category Badge */}
          <div className="flex gap-x-2 flex-wrap">
            {data.category && (
              <Badge className={getCategoryColor(data.category)}>
                {data.category}
              </Badge>
            )}
          </div>

          {/* Description */}
          {data.description && (
            <div className="flex flex-col gap-y-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Description
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {data.description}
              </p>
            </div>
          )}

          {/* Fee & Processing Time */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <InfoRow label="Standard Fee" value={data.fee} />
            <InfoRow label="Processing Time" value={data.processingTime} />
          </div>

          {/* Requirements */}
          {data.requirements && (
            <div className="flex flex-col gap-y-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                Requirements
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                {data.requirements}
              </p>
            </div>
          )}

          {/* Purposes */}
          {data.purposes && (
            <div className="flex flex-col gap-y-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                Purposes
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                {data.purposes}
              </p>
            </div>
          )}

          {/* Urgent Service Section */}
          {data.urgent && (data.urgentFee || data.urgentTime) && (
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-orange-900 dark:text-orange-200">
                  Urgent Service Available
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {data.urgentFee && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                      Urgent Fee
                    </span>
                    <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      {data.urgentFee}
                    </span>
                  </div>
                )}
                {data.urgentTime && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                      Urgent Time
                    </span>
                    <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      {data.urgentTime}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Special Note */}
          {data.specialNote && (
            <div className="flex flex-col gap-y-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                Important Note
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                {data.specialNote}
              </p>
            </div>
          )}

          {/* Service Status */}
          <div className="flex flex-col gap-y-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Service Features
            </span>
            <BooleanBadge label="Status" value={data.isActive} />
            <BooleanBadge label="Urgent Service" value={data.urgent} />
            <BooleanBadge
              label="Delivery Available"
              value={data.deliveryAvailable}
            />
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

export default ViewDocs;
