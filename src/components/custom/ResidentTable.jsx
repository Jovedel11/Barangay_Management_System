import {
  Eye,
  MoreHorizontal,
  Trash2,
  Edit,
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  Briefcase,
  Heart,
  Check,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Button } from "@/core/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/core/components/ui/sheet";
import { useState } from "react";
import customRequest from "@/services/customRequest";
import { CustomToast } from "./CustomToast";
import AddResident from "@/components/custom/AddResident";

export default function ResidentTable({ residents = [], refetch }) {
  const [selectedResident, setSelectedResident] = useState(null);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [residentToEdit, setResidentToEdit] = useState(null);

  const handleViewDetails = (resident) => {
    setSelectedResident(resident);
    setIsViewSheetOpen(true);
  };

  const handleEdit = (resident) => {
    setResidentToEdit(resident);
    setOpenEdit(true);
  };

  const handleEditClose = () => setOpenEdit(false);

  const handleDelete = async (residentId) => {
    try {
      if (!residentId) throw new Error();
      const result = await customRequest({
        path: "/api/brgy-residents/delete/system-resident",
        attributes: {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resident_id: residentId }),
        },
      });
      if (!result?.success) {
        return CustomToast({
          description: "Failed to delete the resident",
          status: "error",
        });
      }
      refetch();
      CustomToast({
        description: "Resident has been deleted successfully",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      CustomToast({
        description: "Internal server error",
        status: "error",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

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
          Yes
        </Badge>
      ) : (
        <Badge className="flex items-center gap-x-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700">
          <X className="w-3 h-3" />
          No
        </Badge>
      )}
    </div>
  );

  return (
    <>
      <div className="w-full mt-4 space-y-4">
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                  Resident
                </TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                  Contact
                </TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                  Address
                </TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                  Age / Gender
                </TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                  Occupation
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-900 dark:text-slate-100">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground h-32"
                  >
                    <span className="text-sm">No residents found</span>
                  </TableCell>
                </TableRow>
              ) : (
                residents?.map((resident) => (
                  <TableRow
                    key={resident._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  >
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {resident?.firstName} {resident?.lastName}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {resident?.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {resident?.phoneNumber}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Emergency: {resident?.emergencyPhone}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {resident?.completeAddress}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {calculateAge(resident?.dateOfBirth)} years old
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {resident?.gender}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {resident?.occupation}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-46">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              handleViewDetails(resident);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Resident
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(resident)}
                            className="py-2 flex items-start justify-start"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Resident
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(resident?._id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Resident
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddResident
        refetch={refetch}
        data={residentToEdit}
        isEdit={true}
        open={openEdit}
        handleOpenChange={handleEditClose}
        setOpenChange={setOpenEdit}
      />

      <Sheet open={isViewSheetOpen} onOpenChange={setIsViewSheetOpen}>
        <SheetContent className="w-full md:max-w-[25rem] gap-y-0 overflow-y-auto font-inter dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-700">
          <SheetHeader className="text-left">
            <SheetTitle className="font-inter text-xl">
              Resident Details
            </SheetTitle>
            <SheetDescription className="text-sm">
              View complete resident information
            </SheetDescription>
          </SheetHeader>

          {selectedResident && (
            <div className="w-full flex flex-col gap-y-6 px-4">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Full Name"
                  value={`${selectedResident?.firstName} ${selectedResident?.lastName}`}
                  icon={User}
                  fullWidth
                />
                <InfoRow
                  label="Date of Birth"
                  value={formatDate(selectedResident?.dateOfBirth)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Age"
                  value={`${calculateAge(
                    selectedResident?.dateOfBirth
                  )} years old`}
                />
                <InfoRow label="Gender" value={selectedResident?.gender} />
                <InfoRow
                  label="Civil Status"
                  value={selectedResident?.civilStatus}
                  fullWidth
                />
              </div>

              {/* Occupation */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Occupation"
                  value={selectedResident?.occupation}
                  icon={Briefcase}
                  fullWidth
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Email Address"
                  value={selectedResident?.email}
                  icon={Mail}
                  fullWidth
                />
                <InfoRow
                  label="Phone Number"
                  value={selectedResident?.phoneNumber}
                  icon={Phone}
                  fullWidth
                />
                <InfoRow
                  label="Complete Address"
                  value={selectedResident?.completeAddress}
                  icon={MapPin}
                  fullWidth
                />
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Emergency Contact Person"
                  value={selectedResident?.emergencyContact}
                  icon={User}
                  fullWidth
                />
                <InfoRow
                  label="Emergency Contact Number"
                  value={selectedResident?.emergencyPhone}
                  icon={Phone}
                  fullWidth
                />
              </div>

              {/* Family Information */}
              {selectedResident?.familyMember && (
                <div className="flex flex-col gap-y-1">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                    <Users className="w-3 h-3" />
                    Family Members
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    {selectedResident?.familyMember}
                  </p>
                </div>
              )}

              {/* Status Information */}
              <div className="flex flex-col gap-y-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Additional Information
                </span>
                <div className="space-y-2">
                  <BooleanBadge
                    label="Registered Voter"
                    value={selectedResident?.isRegisteredVoter}
                  />
                  <BooleanBadge
                    label="Senior Citizen"
                    value={selectedResident?.isSenior}
                  />
                  <BooleanBadge label="PWD" value={selectedResident?.isPwd} />
                  <BooleanBadge
                    label="Pregnant"
                    value={selectedResident?.isPregnant}
                  />
                </div>
              </div>

              {/* Record Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Created At"
                  value={formatDateTime(selectedResident?.createdAt)}
                  icon={Calendar}
                  fullWidth
                />
              </div>
            </div>
          )}

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
    </>
  );
}
