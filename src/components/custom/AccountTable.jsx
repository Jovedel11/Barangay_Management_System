import {
  BadgeCheck,
  Calendar1,
  SquareArrowOutUpRight,
  CheckCircle,
  ImageIcon,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  ShieldCheck,
  UserCircle,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/core/components/ui/sheet";
import { Button } from "@/core/components/ui/button";
import { CustomToast } from "./CustomToast";
import { SendEmail } from "@/lib/sendEmail";
import { Badge } from "../ui/badge";

export default function AccountTable({ residents = [], refetch }) {
  const [selectedResident, setSelectedResident] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleAction = async (action, user_id) => {
    try {
      const response = await fetch("/api/brgy-residents/update/system-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: action === "approve" ? "approved" : "rejected",
          user_id,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Error response:", result);
        return CustomToast({
          description: result?.message || "Failed to update document.",
          status: "error",
        });
      }
      const { success } = await SendEmail({
        status: result.status,
        email: result.email,
        full_name: result.full_name,
      });
      if (!success) throw new Error("Failed to send email");
      CustomToast({
        description: "Document updated successfully.",
        status: "success",
      });
      setIsSheetOpen(false);
      refetch();
    } catch (error) {
      console.error("Error submitting:", error);
      CustomToast({
        description: "An unexpected error occurred.",
        status: "error",
      });
    }
  };

  const openSheet = (resident) => {
    setSelectedResident(resident);
    setIsSheetOpen(true);
  };

  const onViewBrgyId = (url) => {
    const encodedUrl = encodeURIComponent(url);
    window.open(`/view-brgy-id/${encodedUrl}`, "_blank");
  };

  return (
    <div className="w-full">
      <div className="border rounded-sm overflow-hidden bg-white dark:bg-slate-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Name
              </TableHead>
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Email
              </TableHead>
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Residency Status
              </TableHead>
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Approval Status
              </TableHead>
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Account Created
              </TableHead>
              <TableHead className="text-center font-semibold text-slate-900 dark:text-slate-100">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {residents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-slate-500 py-6"
                >
                  No pending residents found
                </TableCell>
              </TableRow>
            ) : (
              residents?.map((resident, index) => {
                if (resident.role === "admin") return null;
                return (
                  <TableRow
                    key={index}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                      {resident.first_name} {resident.last_name}
                    </TableCell>
                    <TableCell>{resident.email}</TableCell>
                    <TableCell>{resident.phone_number}</TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        variant={
                          resident.residency_status?.toLowerCase() ===
                          "resident"
                            ? "approved"
                            : "returned"
                        }
                      >
                        {resident.residency_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        variant={
                          resident.status === "approved"
                            ? "returned"
                            : "pending"
                        }
                      >
                        {resident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(resident.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openSheet(resident)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full md:max-w-[25rem] gap-y-0 overflow-y-auto font-inter dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-700">
          <SheetHeader className="text-left">
            <SheetTitle className="font-inter text-xl">
              Account Details
            </SheetTitle>
            <SheetDescription className="text-sm">
              Review the account information and take action
            </SheetDescription>
          </SheetHeader>

          {selectedResident && (
            <div className="w-full flex flex-col gap-y-6 px-4">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Full Name"
                  value={`${selectedResident.first_name} ${selectedResident.last_name}`}
                  icon={Users}
                  fullWidth
                />
                <InfoRow
                  label="Email"
                  value={selectedResident.email}
                  icon={Mail}
                  fullWidth
                />
                <InfoRow
                  label="Phone Number"
                  value={selectedResident.phone_number}
                  icon={Phone}
                  fullWidth
                />
                <InfoRow
                  label="Resident Address"
                  value={selectedResident.resident_address}
                  icon={MapPin}
                  fullWidth
                />
              </div>

              {/* Status Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Residency Status"
                  value={selectedResident.residency_status}
                  icon={BadgeCheck}
                  fullWidth
                />
                <InfoRow
                  label="Approval Status"
                  value={selectedResident.status}
                  icon={ShieldCheck}
                  fullWidth
                />
                <InfoRow
                  label="Role"
                  value={selectedResident.role}
                  icon={UserCircle}
                  fullWidth
                />
              </div>

              {/* Created At */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Account Created"
                  value={formatDate(selectedResident.createdAt)}
                  icon={Calendar1}
                  fullWidth
                />
              </div>

              {/* Barangay ID Image */}
              <div className="flex flex-col gap-y-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                  <ImageIcon className="w-3 h-3" />
                  Barangay ID
                </span>
                <div className="mt-2 relative bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewBrgyId(selectedResident.barangay_id_image)}
                    className="absolute cursor-pointer top-2 right-2 z-10 bg-white/70 dark:bg-slate-800/70 hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-md"
                  >
                    <SquareArrowOutUpRight className="w-4 h-4 text-slate-900 dark:text-slate-100" />
                  </Button>
                  <img
                    src={selectedResident.barangay_id_image}
                    alt="Barangay ID"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <SheetFooter className="flex flex-row justify-end gap-x-2 p-0 pb-4">
                <Button
                  variant="outline"
                  className="border border-slate-200 bg-slate-100/30 dark:bg-slate-800 dark:border-slate-700 shadow-none text-slate-600 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800/70"
                  onClick={() => handleAction("reject", selectedResident._id)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleAction("approve", selectedResident._id)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
