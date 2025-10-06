import { Eye, MoreHorizontal, Trash2, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <SheetContent className="w-full md:max-w-[28rem] sm:max-w-xl overflow-y-auto gap-0">
          <SheetHeader className="space-y-3 pb-6 border-b dark:border-slate-800">
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Resident Details
            </SheetTitle>
            <SheetDescription className="text-slate-600 dark:text-slate-400">
              View complete information about this resident
            </SheetDescription>
          </SheetHeader>

          {selectedResident && (
            <div className="space-y-6 py-6 px-4">
              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Full Name
                    </h4>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {selectedResident?.firstName} {selectedResident?.lastName}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        Date of Birth
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {formatDate(selectedResident?.dateOfBirth)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        Age
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {calculateAge(selectedResident?.dateOfBirth)} years old
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        Gender
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {selectedResident?.gender}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        Civil Status
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 capitalize">
                        {selectedResident?.civilStatus}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Occupation
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedResident?.occupation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Email Address
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedResident?.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Phone Number
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedResident?.phoneNumber}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Complete Address
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedResident?.completeAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Contact Person
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedResident?.emergencyContact}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Contact Number
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedResident?.emergencyPhone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Family Members
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {selectedResident?.familyMember}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        Registered Voter
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {selectedResident?.isRegisteredVoter ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        Senior Citizen
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {selectedResident?.isSenior ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        PWD
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {selectedResident?.isPwd ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                        Pregnant
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {selectedResident?.isPregnant ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Record Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Created At
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDateTime(selectedResident?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
