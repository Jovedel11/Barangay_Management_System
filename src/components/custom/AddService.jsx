import { Fragment, useCallback, useEffect, useState, useMemo } from "react";
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
import customRequest from "@/services/customRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomToast } from "./CustomToast";

const AddService = ({
  children,
  open,
  handleOpenChange,
  data,
  isEdit = false,
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    name: data?.name ?? "",
    category: data?.category ?? "",
    description: data?.description ?? "",
    schedule: data?.schedule ?? "",
    time: data?.time ?? "",
    location: data?.location ?? "",
    cost: data?.cost ?? "",
    requirements: data?.requirements ?? "",
    serviceType: data?.serviceType ?? "",
    status: data?.status ?? false,
    slots: data?.slots ?? "",
    contact: data?.contact ?? "",
    phone: data?.phone ?? "",
    details: data?.details ?? "",
  });

  const categoryOptions = [
    "Health Services",
    "Community Programs",
    "Legal Services",
    "Social Services",
    "Education",
    "Other",
  ];

  const serviceTypeOptions = [
    "Walk-in",
    "Appointment Required",
    "Online",
    "Home Visit",
  ];

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !isEdit &&
      (!info.name.trim() ||
        !info.category.trim() ||
        !info.description.trim() ||
        !info.schedule.trim() ||
        !info.time.trim() ||
        !info.location.trim() ||
        !info.cost.trim() ||
        !info.requirements.trim() ||
        !info.serviceType.trim() ||
        !info.slots.trim() ||
        !info.contact.trim() ||
        !info.phone.trim() ||
        !info.details.trim());

    if (anyEmpty) return true;

    const isSameAsData =
      data?.name === info.name &&
      data?.category === info.category &&
      data?.description === info.description &&
      data?.schedule === info.schedule &&
      data?.time === info.time &&
      data?.location === info.location &&
      data?.cost === info.cost &&
      data?.requirements === info.requirements &&
      data?.serviceType === info.serviceType &&
      data?.status === info.status &&
      data?.slots === info.slots &&
      data?.contact === info.contact &&
      data?.phone === info.phone &&
      data?.details === info.details;

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

  useEffect(() => {
    if (data) {
      setInfo({
        name: data.name ?? "",
        category: data.category ?? "",
        description: data.description ?? "",
        schedule: data.schedule ?? "",
        time: data.time ?? "",
        location: data.location ?? "",
        cost: data.cost ?? "",
        requirements: data.requirements ?? "",
        serviceType: data.serviceType ?? "",
        status: data.status ?? false,
        slots: data.slots ?? "",
        contact: data.contact ?? "",
        phone: data.phone ?? "",
        details: data.details ?? "",
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
          queryKey: ["available/services"],
        });
        handleOpenChange();
        return CustomToast({
          description: !isEdit
            ? "Service added successfully!"
            : "Service updated successfully!",
          status: "success",
        });
      }
      return CustomToast({
        description: !isEdit
          ? "Failed to add service"
          : "Failed to update service",
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
        path: isEdit
          ? "/api/brgy-services/update/available"
          : "/api/brgy-services/insert/available",
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
      <SheetContent className="sm:max-w-[500px] overflow-y-auto font-inter dark:bg-slate-900 flex flex-col gap-y-0">
        <SheetHeader className="text-left">
          <SheetTitle className="font-inter">
            {isEdit ? "Edit Service" : "Add New Service"}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {isEdit
              ? "View or update service information"
              : "Add new service information"}
          </SheetDescription>
        </SheetHeader>

        <div className="w-full flex flex-col gap-y-4 px-5">
          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Service Name</span>
              <Input
                id="name"
                value={info.name}
                onChange={handleChange}
                placeholder="Enter service name"
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
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Description</span>
            <Textarea
              id="description"
              value={info.description}
              onChange={handleChange}
              placeholder="Enter service description"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Schedule</span>
              <Input
                id="schedule"
                value={info.schedule}
                onChange={handleChange}
                placeholder="e.g., Mon-Fri"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Time</span>
              <Input
                id="time"
                value={info.time}
                onChange={handleChange}
                placeholder="e.g., 8:00 AM - 5:00 PM"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Location</span>
            <Input
              id="location"
              value={info.location}
              onChange={handleChange}
              placeholder="Enter service location"
            />
          </div>

          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Cost</span>
              <Input
                id="cost"
                value={info.cost}
                onChange={handleChange}
                placeholder="₱ 0.00"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Available Slots</span>
              <Input
                id="slots"
                value={info.slots}
                onChange={handleChange}
                placeholder="e.g., 20"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Requirements</span>
            <Input
              id="requirements"
              value={info.requirements}
              onChange={handleChange}
              placeholder="Enter required documents"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Service Type</span>
            <Select
              value={info.serviceType}
              onValueChange={(value) =>
                handleSelectChange("serviceType", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Contact Person</span>
              <Input
                id="contact"
                value={info.contact}
                onChange={handleChange}
                placeholder="Enter contact person"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Phone Number</span>
              <Input
                id="phone"
                value={info.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Additional Details</span>
            <Textarea
              id="details"
              value={info.details}
              onChange={handleChange}
              placeholder="Enter additional details"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="w-full flex flex-col gap-y-3">
            <span className="text-sm font-medium">Service Status</span>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="status"
                checked={info.status}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("status", checked)
                }
              />
              <label
                htmlFor="status"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Service Available
              </label>
            </div>
          </div>
        </div>

        <SheetFooter className="flex flex-row justify-end gap-x-2 mt-auto">
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
              : `${isEdit ? "Update Service" : "Add Service"}`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddService;
