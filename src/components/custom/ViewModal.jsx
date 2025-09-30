import { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

const ViewModal = ({ children, open, handleOpenChange, data }) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && (
        <DialogTrigger asChild className="">
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px] md:min-w-[35rem] max-h-[90vh] overflow-y-auto font-inter dark:bg-slate-900 flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="font-inter">
            Document Service Details
          </DialogTitle>
          <DialogDescription className="text-sm">
            View document service information
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-y-6 py-2">
          {/* Service Name & Category */}
          <div className="flex gap-x-4">
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Service Name
              </span>
              <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
                {data.name || "N/A"}
              </p>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Category
              </span>
              <p className="mt-1">
                <Badge variant="secondary" className="font-normal">
                  {data.category || "N/A"}
                </Badge>
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Description
            </span>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              {data.description || "N/A"}
            </p>
          </div>

          {/* Fee & Processing Time */}
          <div className="flex gap-x-4">
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Fee
              </span>
              <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                {data.fee || "N/A"}
              </p>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Processing Time
              </span>
              <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
                {data.processingTime || "N/A"}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Requirements
            </span>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              {data.requirements || "N/A"}
            </p>
          </div>

          {/* Purposes */}
          <div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Purposes
            </span>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              {data.purposes || "N/A"}
            </p>
          </div>

          {/* Urgent Service */}
          {data.urgent && (
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 block">
                Urgent Service
              </span>
              <div className="flex gap-x-4">
                <div className="flex-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Urgent Fee
                  </span>
                  <p className="mt-1 text-base font-semibold text-orange-600 dark:text-orange-400">
                    {data.urgentFee || "N/A"}
                  </p>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Urgent Processing Time
                  </span>
                  <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
                    {data.urgentTime || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Special Note */}
          {data.specialNote && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3">
              <span className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Special Note
              </span>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
                {data.specialNote}
              </p>
            </div>
          )}

          {/* Service Options */}
          <div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 block">
              Service Options
            </span>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                {data.deliveryAvailable ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                )}
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Delivery Available
                </span>
              </div>

              <div className="flex items-center gap-2">
                {data.urgent ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                )}
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Urgent Available
                </span>
              </div>

              <div className="flex items-center gap-2">
                {data.isActive ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                )}
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Active Service
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70"
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
