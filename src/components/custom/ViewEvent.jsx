import { useMemo } from "react";
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
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Users,
  Award,
  CheckCircle2,
  ListChecks,
  Activity,
  Tag,
  Star,
} from "lucide-react";

const ViewEvent = ({ children, data }) => {
  const formattedStartDate = useMemo(() => {
    return data?.startDate ? format(new Date(data.startDate), "PPP") : "N/A";
  }, [data?.startDate]);

  const formattedEndDate = useMemo(() => {
    return data?.endDate ? format(new Date(data.endDate), "PPP") : "N/A";
  }, [data?.endDate]);

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      ongoing:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      completed:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      postponed:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };
    return colors[status] || colors.upcoming;
  };

  const InfoRow = ({ icon, label, value }) => {
    const Icon = icon;
    if (!value) return null;

    return (
      <div className="flex gap-x-3 py-2">
        <Icon className="h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-y-1 flex-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </span>
          <span className="text-sm text-slate-900 dark:text-slate-100">
            {value}
          </span>
        </div>
      </div>
    );
  };

  const TextSection = ({ icon, label, value }) => {
    const Icon = icon;
    if (!value || value.trim() === "") return null;

    return (
      <div className="flex flex-col gap-y-2 py-3 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-x-2">
          <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap pl-6">
          {value}
        </p>
      </div>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[500px] md:max-w-[28rem] overflow-y-auto gap-y-0 font-inter dark:bg-slate-900 flex flex-col">
        <SheetHeader className="text-left">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex-1 flex flex-col">
              <SheetTitle className="font-inter text-xl">
                {data?.eventTitle || "Event Details"}
              </SheetTitle>
              <SheetDescription className="text-sm mt-1">
                View event information
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="w-full flex flex-col gap-y-2 px-4 mt-4">
          {/* Status Badge */}
          {data?.status && (
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <Badge className={getStatusColor(data.status)}>
                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </Badge>
              {data?.category && (
                <Badge variant="outline" className="text-xs">
                  {data.category}
                </Badge>
              )}
              {data?.featuredEvent && (
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 flex items-center gap-x-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Badge>
              )}

              <Badge className="border border-rose-700 bg-rose-50 text-rose-800 dark:bg-rose-800/60 dark:text-rose-200 flex items-center gap-x-1">
                {data?.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          )}

          {/* Description */}
          {data?.description && (
            <div className="py-3 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {data.description}
              </p>
            </div>
          )}

          {/* Date and Time */}
          <div className="border-t border-slate-200 dark:border-slate-700">
            <InfoRow
              icon={Calendar}
              label="Start Date"
              value={formattedStartDate}
            />
            <InfoRow
              icon={Calendar}
              label="End Date"
              value={formattedEndDate}
            />
            <InfoRow icon={Clock} label="Time" value={data?.time} />
          </div>

          {/* Venue and Organizer */}
          <div className="border-t border-slate-200 dark:border-slate-700">
            <InfoRow icon={MapPin} label="Venue" value={data?.venue} />
            <InfoRow icon={User} label="Organizer" value={data?.organizer} />
          </div>

          {/* Contact Information */}
          <div className="border-t border-slate-200 dark:border-slate-700">
            <InfoRow
              icon={User}
              label="Contact Person"
              value={data?.contactPerson}
            />
            <InfoRow
              icon={Phone}
              label="Phone Number"
              value={data?.phoneNumber}
            />
          </div>

          {/* Participants */}
          <div className="border-t border-slate-200 dark:border-slate-700">
            <InfoRow
              icon={Users}
              label="Participants"
              value={data?.participants}
            />
          </div>

          {/* Optional Sections */}
          <TextSection
            icon={Award}
            label="Prizes & Awards"
            value={data?.prizesAwards}
          />

          <TextSection
            icon={CheckCircle2}
            label="Requirements"
            value={data?.requirements}
          />

          <TextSection
            icon={Activity}
            label="Activities"
            value={data?.activities}
          />

          <TextSection icon={Tag} label="Categories" value={data?.categories} />
        </div>

        <SheetFooter className="flex flex-row justify-end gap-x-2 mt-4">
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

export default ViewEvent;
