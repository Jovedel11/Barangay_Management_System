import {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
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

const AddResident = ({
  children,
  open,
  handleOpenChange = () => {},
  data,
  isEdit = false,
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const closeRef = useRef(null);
  const [info, setInfo] = useState({
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    email: data?.email ?? "",
    phoneNumber: data?.phoneNumber ?? "",
    dateOfBirth: data?.dateOfBirth ?? "",
    gender: data?.gender ?? "",
    civilStatus: data?.civilStatus ?? "",
    occupation: data?.occupation ?? "",
    completeAddress: data?.completeAddress ?? "",
    emergencyContact: data?.emergencyContact ?? "",
    emergencyPhone: data?.emergencyPhone ?? "",
    familyMember: data?.familyMember ?? "",
    isRegisteredVoter: data?.isRegisteredVoter ?? false,
    isSenior: data?.isSenior ?? false,
    isPwd: data?.isPwd ?? false,
    isPregnant: data?.isPregnant ?? false,
  });

  const genderOptions = ["Male", "Female"];
  const civilStatusOptions = ["Single", "Married", "Widowed", "Separated"];

  const nothingChanged = useMemo(() => {
    const isSameAsData =
      data?.firstName === info.firstName &&
      data?.lastName === info.lastName &&
      data?.email === info.email &&
      data?.phoneNumber === info.phoneNumber &&
      data?.dateOfBirth === info.dateOfBirth &&
      data?.gender === info.gender &&
      data?.civilStatus === info.civilStatus &&
      data?.occupation === info.occupation &&
      data?.completeAddress === info.completeAddress &&
      data?.emergencyContact === info.emergencyContact &&
      data?.emergencyPhone === info.emergencyPhone &&
      data?.familyMember === info.familyMember &&
      data?.isRegisteredVoter === info.isRegisteredVoter &&
      data?.isSenior === info.isSenior &&
      data?.isPwd === info.isPwd &&
      data?.isPregnant === info.isPregnant;

    return isSameAsData;
  }, [data, info]);

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
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        phoneNumber: data.phoneNumber ?? "",
        dateOfBirth: data.dateOfBirth?.split("T")[0] ?? "",
        gender: data.gender ?? "",
        civilStatus: data.civilStatus ?? "",
        occupation: data.occupation ?? "",
        completeAddress: data.completeAddress ?? "",
        emergencyContact: data.emergencyContact ?? "",
        emergencyPhone: data.emergencyPhone ?? "",
        familyMember: data.familyMember ?? "",
        isRegisteredVoter: data.isRegisteredVoter ?? false,
        isSenior: data.isSenior ?? false,
        isPwd: data.isPwd ?? false,
        isPregnant: data.isPregnant ?? false,
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
          queryKey: ["system-resident/retrieve"],
        });
        closeRef.current?.click();
        return CustomToast({
          description: `Resident ${isEdit ? "updated" : "added"} successfully!`,
          status: "success",
        });
      }
      return CustomToast({
        description: `Failed to ${isEdit ? "update" : "add"} resident`,
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
      const phonePattern = /^(?:\+63|0)9\d{9}$/;
      const isValidPhone = phonePattern.test(info.phoneNumber);
      const isValidEmergencyPhone = phonePattern.test(info.emergencyPhone);

      if (!isValidPhone)
        return CustomToast({
          description: "Invalid format of Phone Number",
          status: "error",
        });

      if (!isValidEmergencyPhone)
        return CustomToast({
          description: "Invalid format of Emergency Phone Number",
          status: "error",
        });
      const payload = {
        ...info,
        dateOfBirth: new Date(info.dateOfBirth).toISOString(),
      };
      submitMutation.mutate({
        path: isEdit
          ? "/api/brgy-residents/update/system-resident"
          : "/api/brgy-residents/insert/system-resident",
        attributes: {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            !isEdit
              ? {
                  civilStatus: info.civilStatus.toLowerCase(),
                  dateOfBirth: new Date(info.dateOfBirth).toISOString(),
                  ...info,
                }
              : { docs_id: data?._id, ...payload }
          ),
          credentials: "include",
        },
      });
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsLoading(false);
    }
  }, [info, submitMutation, data, isEdit]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-[500px] w-full md:max-w-[28rem] overflow-y-auto font-inter dark:bg-slate-900 flex flex-col gap-y-0">
        <SheetHeader className="text-left">
          <SheetTitle className="font-inter">Edit Resident</SheetTitle>
          <SheetDescription className="text-sm">
            Update resident information
          </SheetDescription>
        </SheetHeader>

        <div className="w-full flex flex-col gap-y-4 px-5">
          {/* Personal Information */}
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Personal Information
            </span>

            <div className="flex gap-x-2">
              <div className="w-full flex flex-col gap-y-1">
                <span className="text-sm font-medium">First Name</span>
                <Input
                  id="firstName"
                  value={info.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <span className="text-sm font-medium">Last Name</span>
                <Input
                  id="lastName"
                  value={info.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="flex gap-x-2">
              <div className="w-full flex flex-col gap-y-1">
                <span className="text-sm font-medium">Date of Birth</span>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={info.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <span className="text-sm font-medium">Gender</span>
                <Select
                  value={info.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-x-2">
              <div className="w-full flex flex-col gap-y-1">
                <span className="text-sm font-medium">Civil Status</span>
                <Select
                  value={info.civilStatus}
                  onValueChange={(value) =>
                    handleSelectChange("civilStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {civilStatusOptions.map((status) => (
                      <SelectItem key={status} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <span className="text-sm font-medium">Occupation</span>
                <Input
                  id="occupation"
                  value={info.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Contact Information
            </span>

            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Email Address</span>
              <Input
                id="email"
                type="email"
                value={info.email}
                onChange={handleChange}
                placeholder="Enter email address"
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

            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Complete Address</span>
              <Textarea
                id="completeAddress"
                value={info.completeAddress}
                onChange={handleChange}
                placeholder="Enter complete address"
                rows={2}
                className="resize-none"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Emergency Contact
            </span>

            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Contact Person</span>
              <Input
                id="emergencyContact"
                value={info.emergencyContact}
                onChange={handleChange}
                placeholder="Enter contact person"
              />
            </div>

            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Contact Number</span>
              <Input
                id="emergencyPhone"
                value={info.emergencyPhone}
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Additional Information
            </span>

            <div className="w-full flex flex-col gap-y-1">
              <span className="text-sm font-medium">Family Members</span>
              <Input
                id="familyMember"
                value={info.familyMember}
                onChange={handleChange}
                placeholder="Enter family members"
              />
            </div>

            <div className="w-full flex flex-col gap-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isRegisteredVoter"
                  checked={info.isRegisteredVoter}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isRegisteredVoter", checked)
                  }
                />
                <label
                  htmlFor="isRegisteredVoter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Registered Voter
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isSenior"
                  checked={info.isSenior}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isSenior", checked)
                  }
                />
                <label
                  htmlFor="isSenior"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Senior Citizen
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPwd"
                  checked={info.isPwd}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isPwd", checked)
                  }
                />
                <label
                  htmlFor="isPwd"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  PWD (Person with Disability)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPregnant"
                  checked={info.isPregnant}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isPregnant", checked)
                  }
                />
                <label
                  htmlFor="isPregnant"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pregnant
                </label>
              </div>
            </div>
          </div>
        </div>
        <SheetClose ref={closeRef} />
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
            {isLoading ? "Updating..." : "Update Resident"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddResident;
