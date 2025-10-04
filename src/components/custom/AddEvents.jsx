import { useCallback, useEffect, useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import customRequest from "@/services/customRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomToast } from "./CustomToast";

const AddEvent = ({
  children,
  open,
  handleOpenChange,
  data,
  isEdit = false,
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    eventTitle: data?.eventTitle ?? "",
    category: data?.category ?? "",
    description: data?.description ?? "",
    startDate: data?.startDate ?? null,
    endDate: data?.endDate ?? null,
    time: data?.time ?? "",
    venue: data?.venue ?? "",
    organizer: data?.organizer ?? "",
    contactPerson: data?.contactPerson ?? "",
    phoneNumber: data?.phoneNumber ?? "",
    participants: data?.participants ?? "",
    status: data?.status ?? "",
    prizesAwards: data?.prizesAwards ?? "",
    requirements: data?.requirements ?? "",
    activities: data?.activities ?? "",
    categories: data?.categories ?? "",
    featuredEvent: data?.featuredEvent ?? false,
  });

  const categoryOptions = [
    "Sports Athletic",
    "Beauty Pageants",
    "Entertainment",
    "Competitions",
    "Community Events",
    "Fiesta & Celebration",
  ];

  const statusOptions = [
    "upcoming",
    "ongoing",
    "completed",
    "cancelled",
    "postponed",
  ];

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !isEdit &&
      (!info.eventTitle.trim() ||
        !info.category.trim() ||
        !info.description.trim() ||
        !info.startDate ||
        !info.endDate ||
        !info.time.trim() ||
        !info.venue.trim() ||
        !info.organizer.trim() ||
        !info.contactPerson.trim() ||
        !info.phoneNumber.trim() ||
        !info.participants.trim() ||
        !info.status.trim() ||
        !info.requirements.trim() ||
        !info.activities.trim());

    if (anyEmpty) return true;

    const isSameAsData =
      data?.eventTitle === info.eventTitle &&
      data?.category === info.category &&
      data?.description === info.description &&
      data?.startDate === info.startDate &&
      data?.endDate === info.endDate &&
      data?.time === info.time &&
      data?.venue === info.venue &&
      data?.organizer === info.organizer &&
      data?.contactPerson === info.contactPerson &&
      data?.phoneNumber === info.phoneNumber &&
      data?.participants === info.participants &&
      data?.status === info.status &&
      data?.prizesAwards === info.prizesAwards &&
      data?.requirements === info.requirements &&
      data?.activities === info.activities &&
      data?.categories === info.categories &&
      data?.featuredEvent === info.featuredEvent;

    if (isSameAsData) {
      return true;
    }
    return false;
  }, [data, info, isEdit]);

  const handleChange = useCallback((e) => {
    const { id, value, type, checked } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value.trimStart(),
    }));
  }, []);

  const handleSelectChange = useCallback((field, value) => {
    setInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((field, checked) => {
    setInfo((prevState) => ({
      ...prevState,
      [field]: checked,
    }));
  }, []);

  const handleDateChange = useCallback((field, date) => {
    setInfo((prevState) => ({
      ...prevState,
      [field]: date,
    }));
  }, []);

  useEffect(() => {
    if (data) {
      setInfo({
        eventTitle: data.eventTitle ?? "",
        category: data.category ?? "",
        description: data.description ?? "",
        startDate: data.startDate ?? null,
        endDate: data.endDate ?? null,
        time: data.time ?? "",
        venue: data.venue ?? "",
        organizer: data.organizer ?? "",
        contactPerson: data.contactPerson ?? "",
        phoneNumber: data.phoneNumber ?? "",
        participants: data.participants ?? "",
        status: data.status ?? "",
        prizesAwards: data.prizesAwards ?? "",
        requirements: data.requirements ?? "",
        activities: data.activities ?? "",
        categories: data.categories ?? "",
        featuredEvent: data.featuredEvent ?? false,
      });
    }
  }, [data]);

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      return customRequest(data);
    },
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: ["events"],
        });
        handleOpenChange();
        return CustomToast({
          description: !isEdit
            ? "Event added successfully!"
            : "Event updated successfully!",
          status: "success",
        });
      }
      return CustomToast({
        description: !isEdit ? "Failed to add event" : "Failed to update event",
        status: "error",
      });
    },
    onError: (error) => {
      console.log(error);
      CustomToast({
        description: "Something went wrong",
        status: "error",
      });
    },
  });

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      submitMutation.mutate({
        path: isEdit ? "/api/events/update" : "/api/events/insert",
        attributes: {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            !isEdit ? info : { docs_id: data?._id, ...info }
          ),
          credentials: "include",
        },
      });
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsLoading(false);
    }
  }, [info, submitMutation, isEdit, data]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[500px] md:max-w-[28rem] overflow-y-auto gap-y-0 font-inter dark:bg-slate-900 flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="font-inter">
            {isEdit ? "Edit Event" : "Add New Event"}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {isEdit
              ? "view or update event information"
              : "add new event information"}
          </SheetDescription>
        </SheetHeader>
        <div className="w-full flex flex-col gap-y-4 px-4">
          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Event Title</span>
            <Input
              id="eventTitle"
              value={info.eventTitle}
              onChange={handleChange}
              placeholder="Enter event title"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Category</span>
            <Select
              value={info.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Description</span>
            <Textarea
              id="description"
              value={info.description}
              onChange={handleChange}
              placeholder="Enter event description"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Start Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {info.startDate ? (
                      format(info.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={info.startDate}
                    onSelect={(date) => handleDateChange("startDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">End Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {info.endDate ? (
                      format(info.endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={info.endDate}
                    onSelect={(date) => handleDateChange("endDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Time</span>
              <Input
                id="time"
                value={info.time}
                onChange={handleChange}
                placeholder="e.g., 8:00 AM - 5:00 PM"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Venue</span>
              <Input
                id="venue"
                value={info.venue}
                onChange={handleChange}
                placeholder="Enter venue"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Organizer</span>
            <Input
              id="organizer"
              value={info.organizer}
              onChange={handleChange}
              placeholder="Enter organizer"
            />
          </div>

          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Contact Person</span>
              <Input
                id="contactPerson"
                value={info.contactPerson}
                onChange={handleChange}
                placeholder="Enter contact person"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Phone Number</span>
              <Input
                id="phoneNumber"
                value={info.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Participants</span>
            <Input
              id="participants"
              value={info.participants}
              onChange={handleChange}
              placeholder="Enter number of participants"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Status</span>
            <Select
              value={info.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">
              Prizes & Awards (Optional)
            </span>
            <Textarea
              id="prizesAwards"
              value={info.prizesAwards}
              onChange={handleChange}
              placeholder="Enter prizes and awards"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Requirements</span>
            <Textarea
              id="requirements"
              value={info.requirements}
              onChange={handleChange}
              placeholder="Enter requirements"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Activities</span>
            <Textarea
              id="activities"
              value={info.activities}
              onChange={handleChange}
              placeholder="Enter activities"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Categories (Optional)</span>
            <Textarea
              id="categories"
              value={info.categories}
              onChange={handleChange}
              placeholder="Enter categories"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="w-full flex flex-col gap-y-3">
            <span className="text-sm font-medium">Featured Event</span>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featuredEvent"
                checked={info.featuredEvent}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("featuredEvent", checked)
                }
              />
              <label
                htmlFor="featuredEvent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as Featured Event
              </label>
            </div>
          </div>
        </div>

        <SheetFooter className="flex flex-row justify-end gap-x-2 mt-4">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70"
            >
              Cancel
            </Button>
          </SheetClose>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || nothingChanged}
            type="button"
            className="rounded-sm transition-all active:scale-95"
          >
            {isLoading
              ? `${isEdit ? "Updating..." : "Adding..."}`
              : `${isEdit ? "Update Event" : "Add Event"}`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddEvent;
 