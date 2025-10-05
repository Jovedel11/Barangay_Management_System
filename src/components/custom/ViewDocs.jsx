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
import {
  FileText,
  DollarSign,
  Clock,
  ClipboardList,
  Target,
  CheckCircle2,
  Zap,
  AlertCircle,
  Package,
  Activity,
} from "lucide-react";

const ViewDocs = ({ children, open, handleOpenChange, data }) => {
  if (!data) return null;

  const InfoCard = ({ icon, label, value, highlight = false }) => {
    const Icon = icon;
    if (!value) return null;

    return (
      <div className="flex gap-x-2 sm:gap-x-3 p-2.5 sm:p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600">
          <Icon
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              highlight
                ? "text-orange-600 dark:text-orange-400"
                : "text-slate-600 dark:text-slate-300"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {label}
          </span>
          <p
            className={`mt-0.5 text-sm sm:text-base font-semibold ${
              highlight
                ? "text-orange-600 dark:text-orange-400"
                : "text-slate-900 dark:text-slate-100"
            } break-words`}
          >
            {value}
          </p>
        </div>
      </div>
    );
  };

  const TextSection = ({ icon, label, value, className = "" }) => {
    const Icon = icon;
    if (!value || value.trim() === "") return null;

    return (
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
        </div>
        <p
          className={`text-sm text-slate-600 dark:text-slate-400 pl-6 break-words ${className}`}
        >
          {value}
        </p>
      </div>
    );
  };

  const StatusBadge = ({ active, label }) => (
    <div className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
      {active ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
      )}
      <span
        className={`text-xs sm:text-sm font-medium ${
          active
            ? "text-slate-900 dark:text-slate-100"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="w-full sm:max-w-[500px] md:max-w-[32rem] overflow-y-auto gap-y-0 font-inter dark:bg-slate-900 flex flex-col p-4 sm:p-6">
        <SheetHeader className="text-left px-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-y-2 sm:gap-x-3">
            <div className="flex-1 min-w-0">
              <SheetTitle className="font-inter text-lg sm:text-xl leading-tight break-words">
                {data.name || "Document Service"}
              </SheetTitle>
              <SheetDescription className="text-xs sm:text-sm mt-1.5">
                Complete service information and requirements
              </SheetDescription>
            </div>
            {data.category && (
              <Badge
                variant="secondary"
                className="text-xs font-medium shrink-0 self-start"
              >
                {data.category}
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="w-full flex flex-col gap-y-4 sm:gap-y-5 px-0 mt-4">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30">
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                data.isActive ? "bg-green-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
              {data.isActive ? "Currently Available" : "Not Available"}
            </span>
          </div>

          {/* Description */}
          {data.description && (
            <div className="p-3 sm:p-4 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-300">
                  Description
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300/90 leading-relaxed break-words">
                {data.description}
              </p>
            </div>
          )}

          {/* Fee & Processing Time */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
            <InfoCard icon={DollarSign} label="Standard Fee" value={data.fee} />
            <InfoCard
              icon={Clock}
              label="Processing Time"
              value={data.processingTime}
            />
          </div>

          {/* Requirements */}
          <TextSection
            icon={ClipboardList}
            label="Requirements"
            value={data.requirements}
          />

          {/* Purposes */}
          <TextSection icon={Target} label="Purposes" value={data.purposes} />

          {/* Urgent Service Section */}
          {data.urgent && (data.urgentFee || data.urgentTime) && (
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 sm:pt-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                  Urgent Service Available
                </span>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {data.urgentFee && (
                  <InfoCard
                    icon={DollarSign}
                    label="Urgent Fee"
                    value={data.urgentFee}
                    highlight={true}
                  />
                )}
                {data.urgentTime && (
                  <InfoCard
                    icon={Clock}
                    label="Urgent Time"
                    value={data.urgentTime}
                    highlight={true}
                  />
                )}
              </div>
            </div>
          )}

          {/* Special Note */}
          {data.specialNote && (
            <div className="p-3 sm:p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-600">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 block mb-1">
                    Important Note
                  </span>
                  <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300/90 leading-relaxed break-words">
                    {data.specialNote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Service Options */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 sm:pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                Service Features
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <StatusBadge
                active={data.deliveryAvailable}
                label="Delivery Available"
              />
              <StatusBadge
                active={data.urgent}
                label="Urgent Service Available"
              />
              <StatusBadge active={data.isActive} label="Currently Active" />
            </div>
          </div>
        </div>

        <SheetFooter className="flex flex-row justify-end gap-x-2 mt-4 sm:mt-6 px-0">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70 text-sm"
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
