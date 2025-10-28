import { useCallback, useEffect, useState, useMemo } from "react";
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

const ItemDialog = ({
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
    available: data?.available ?? "",
    total: data?.total ?? "",
    condition: data?.condition ?? "",
    maxBorrowDays: data?.maxBorrowDays ?? "",
    deliveryAvailable: data?.deliveryAvailable ?? false,
    status: data?.status ?? false,
    requirements: data?.requirements ?? "",
    notes: data?.notes ?? "",
  });

  const categoryOptions = [
    "Furniture",
    "Electronics",
    "Shelter & Tents",
    "Tools & Equipment",
  ];

  const conditionOptions = ["Excellent", "Good", "Fair", "Poor"];

  const nothingChanged = useMemo(() => {
    const anyEmpty =
      !isEdit &&
      (!info.name.trim() ||
        !info.category.trim() ||
        !info.description.trim() ||
        !info.available.toString().trim() ||
        !info.total.toString().trim() ||
        !info.condition.trim() ||
        !info.maxBorrowDays.toString().trim() ||
        !info.requirements.trim() ||
        !info.notes.trim());

    if (anyEmpty) return true;

    const isSameAsData =
      data?.name === info.name &&
      data?.category === info.category &&
      data?.description === info.description &&
      data?.available === info.available &&
      data?.total === info.total &&
      data?.condition === info.condition &&
      data?.maxBorrowDays === info.maxBorrowDays &&
      data?.deliveryAvailable === info.deliveryAvailable &&
      data?.status === info.status &&
      data?.requirements === info.requirements &&
      data?.notes === info.notes;

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
        available: data.available ?? "",
        total: data.total ?? "",
        condition: data.condition ?? "",
        maxBorrowDays: data.maxBorrowDays ?? "",
        deliveryAvailable: data.deliveryAvailable ?? false,
        status: data.status ?? false,
        requirements: data.requirements ?? "",
        notes: data.notes ?? "",
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
          queryKey: ["available/items"],
        });
        handleOpenChange();
        return CustomToast({
          description: !isEdit
            ? "Adding item success!"
            : "Updating item success!",
          status: "success",
        });
      }
      return CustomToast({
        description: !isEdit ? "Failed to add item" : "Failed updating item",
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
          ? "/api/borrow-item/update/available"
          : "/api/borrow-item/available/insert",
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:min-w-[35rem] max-h-[90vh] overflow-y-auto font-inter dark:bg-slate-900 flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="font-inter">
            {isEdit ? "Edit Item" : "Add Item"}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {isEdit
              ? "View or update item information"
              : "View or add item information"}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-y-4">
          <div className="flex gap-x-2">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Item Name</span>
              <Input
                id="name"
                value={info.name}
                onChange={handleChange}
                placeholder="Enter item name"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Category</span>
              <Select
                value={info.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
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
              <span className="text-sm font-medium">Available</span>
              <Input
                id="available"
                type="number"
                value={info.available}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Total</span>
              <Input
                id="total"
                type="number"
                value={info.total}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Condition</span>
              <Select
                value={info.condition}
                onValueChange={(value) =>
                  handleSelectChange("condition", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditionOptions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full flex gap-x-3">
            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Max Borrow Days</span>
              <Input
                id="maxBorrowDays"
                type="number"
                value={info.maxBorrowDays}
                onChange={handleChange}
                placeholder="7"
                min="1"
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
              placeholder="Enter requirements"
            />
          </div>

          <div className="w-full flex flex-col gap-y-1">
            <span className="text-sm font-medium">Notes</span>
            <Textarea
              id="notes"
              value={info.notes}
              onChange={handleChange}
              placeholder="Enter any special notes or instructions"
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="w-full flex flex-col gap-y-3">
            <span className="text-sm font-medium">Item Options</span>
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
                  Active Status
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-x-2 mt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || nothingChanged}
            type="button"
            className="rounded-sm transition-all active:scale-95"
          >
            {isLoading
              ? `${isEdit ? "...Updating" : "...Adding"}`
              : `${isEdit ? "Update item" : "Add item"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialog;
