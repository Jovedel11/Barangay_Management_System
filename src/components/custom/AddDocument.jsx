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
import customRequest from "@/services/customRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomToast } from "./CustomToast";

const AddDocument = ({
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
    fee: data?.fee ?? "",
    processingTime: data?.processingTime ?? "",
    requirements: data?.requirements ?? "",
    purposes: data?.purposes ?? "",
    deliveryAvailable: data?.deliveryAvailable ?? false,
    urgent: data?.urgent ?? false,
    urgentFee: data?.urgentFee ?? "",
    urgentTime: data?.urgentTime ?? "",
    isActive: data?.isActive ?? false,
    specialNote: data?.specialNote ?? "",
  });

  const categoryOptions = [
    "Barangay Clearance",
    "Indengency Certificate",
    "Residency Certificate",
    "Business Permit",
    "Other",
  ];

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !isEdit &&
      (!info.name.trim() ||
        !info.category.trim() ||
        !info.description.trim() ||
        !info.fee.trim() ||
        !info.processingTime.trim() ||
        !info.requirements.trim() ||
        !info.purposes.trim() ||
        !info.urgentFee.trim() ||
        !info.urgentTime.trim() ||
        !info.specialNote.trim());

    if (anyEmpty) return true;

    const isSameAsData =
      data?.name === info.name &&
      data?.category === info.category &&
      data?.description === info.description &&
      data?.fee === info.fee &&
      data?.processingTime === info.processingTime &&
      data?.requirements === info.requirements &&
      data?.purposes === info.purposes &&
      data?.deliveryAvailable === info.deliveryAvailable &&
      data?.urgent === info.urgent &&
      data?.urgentFee === info.urgentFee &&
      data?.urgentTime === info.urgentTime &&
      data?.isActive === info.isActive &&
      data?.specialNote === info.specialNote;

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

  const handleSelectChange = useCallback((value) => {
    setInfo((prevState) => ({
      ...prevState,
      category: value,
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
        fee: data.fee ?? "",
        processingTime: data.processingTime ?? "",
        requirements: data.requirements ?? "",
        purposes: data.purposes ?? "",
        deliveryAvailable: data.deliveryAvailable ?? false,
        urgent: data.urgent ?? false,
        urgentFee: data.urgentFee ?? "",
        urgentTime: data.urgentTime ?? "",
        isActive: data.isActive ?? false,
        specialNote: data.specialNote ?? "",
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
          queryKey: ["get-available"],
        });
        handleOpenChange();
        return CustomToast({
          description: !isEdit
            ? "Adding documents success!"
            : "Updating documents success!",
          status: "success",
        });
      }
      return CustomToast({
        description: !isEdit
          ? "Failed to add documents"
          : "Failed updating documents",
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
          ? "/api/brgy-docs/update/available"
          : "/api/brgy-docs/available/insert",
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
            {isEdit ? "Edit Available Documents" : "Add Available Document"}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {isEdit
              ? "View or update document service information"
              : "View or add document service information"}
          </SheetDescription>
        </SheetHeader>
        <div className="w-full flex flex-col gap-y-4 px-4">
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
              <Select value={info.category} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
              placeholder="Enter detailed description"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="w-full flex gap-x-3">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Fee</span>
              <Input
                id="fee"
                value={info.fee}
                onChange={handleChange}
                placeholder="₱ 0.00"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Processing Time</span>
              <Input
                id="processingTime"
                value={info.processingTime}
                onChange={handleChange}
                placeholder="e.g., 3-5 days"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Requirements</span>
            <Input
              type="text"
              id="requirements"
              value={info.requirements}
              onChange={handleChange}
              placeholder="Enter required documents"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Purposes</span>
            <Textarea
              id="purposes"
              value={info.purposes}
              onChange={handleChange}
              placeholder="Enter purposes for this service"
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="w-full flex gap-x-3">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Urgent Fee</span>
              <Input
                id="urgentFee"
                value={info.urgentFee}
                onChange={handleChange}
                placeholder="₱ 0.00"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">
                Urgent Processing Time
              </span>
              <Input
                id="urgentTime"
                value={info.urgentTime}
                onChange={handleChange}
                placeholder="e.g., 1-2 days"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Special Note</span>
            <Textarea
              id="specialNote"
              value={info.specialNote}
              onChange={handleChange}
              placeholder="Enter any special notes or instructions"
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="w-full flex flex-col gap-y-3">
            <span className="text-sm font-medium">Service Options</span>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="deliveryAvailable"
                  checked={info.deliveryAvailable}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("deliveryAvailable", checked)
                  }
                />
                <label
                  htmlFor="deliveryAvailable"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Delivery Available
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={info.urgent}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("urgent", checked)
                  }
                />
                <label
                  htmlFor="urgent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Urgent Available
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={info.isActive}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isActive", checked)
                  }
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active Service
                </label>
              </div>
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
              : `${isEdit ? "Update document" : "Add document"}`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddDocument;
