import { Eye, MoreHorizontal, Trash2, Edit, User, Phone, Calendar, Tag, Clock, FileText } from "lucide-react";
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
import ProcessBookingDialog from "@/components/custom/ProcessBooking";

export default function EventParticipantTable({ participants = [], refetch }) {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [processParticipant, setProcessParticipant] = useState(null);

  const handleViewDetails = (participant) => {
    setSelectedParticipant(participant);
    setIsViewSheetOpen(true);
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    };
    return styles[status] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
  };

  const getPaymentBadgeStyle = (paymentStatus) => {
    const styles = {
      paid: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      refunded: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      "not paid": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    };
    return styles[paymentStatus] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
  };

  const handleProcess = (participant) => {
    setProcessParticipant(participant);
    setIsProcessOpen(true);
  };

  const handleDelete = async (participantId) => {
    try {
      if (!participantId) throw new Error();
      const result = await customRequest({
        path: "/api/brgy-events/delete/request",
        attributes: {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event_id: participantId }),
        },
      });
      if (!result?.success) {
        return CustomToast({
          description: "Failed to delete the participant",
          status: "error",
        });
      }
      refetch();
      CustomToast({
        description: "Participant has been deleted successfully",
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

  const onProcessChange = () => {
    setIsProcessOpen((prevstate) => !prevstate);
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

  return (
    <>
      <div className="w-full mt-4 space-y-4">
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
          <ProcessBookingDialog
            participant={processParticipant}
            isOpen={isProcessOpen}
            onOpenChange={onProcessChange}
            refetch={refetch}
          />
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Participant</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Event Details</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Category</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Contact</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Status</TableHead>
                <TableHead className="text-center font-semibold text-slate-900 dark:text-slate-100">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground h-32"
                  >
                    <span className="text-sm">No participants found</span>
                  </TableCell>
                </TableRow>
              ) : (
                participants?.map((participant) => (
                  <TableRow key={participant._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {participant?.teamMemberParticipant}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {participant?.specialRequirements ||
                            "No special requirements"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {participant.eventTitle}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(participant.dateOfEvent)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{participant.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{participant.contactNumber}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyle(participant.status)}`}>
                          {participant.status}
                        </span>
                        {participant.payment && (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentBadgeStyle(participant.paymentStatus)}`}>
                            {participant.paymentStatus}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-46">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              handleViewDetails(participant);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleProcess(participant)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {participant.paymentStatus === "not paid"
                              ? "Process Booking"
                              : "Update Booking"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(participant?._id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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

      <Sheet open={isViewSheetOpen} onOpenChange={setIsViewSheetOpen}>
        <SheetContent className="w-full md:max-w-[25rem] gap-y-0 overflow-y-auto font-inter dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-700">
          <SheetHeader className="text-left">
            <SheetTitle className="font-inter text-xl">
              Participant Details
            </SheetTitle>
            <SheetDescription className="text-sm">
              View complete participant information
            </SheetDescription>
          </SheetHeader>

          {selectedParticipant && (
            <div className="w-full flex flex-col gap-y-6 px-4">
              {/* Status Badges */}
              <div className="flex gap-x-2 flex-wrap">
                <Badge className={getStatusBadgeStyle(selectedParticipant.status)}>
                  {selectedParticipant.status}
                </Badge>
                {selectedParticipant.payment && (
                  <Badge className={getPaymentBadgeStyle(selectedParticipant.paymentStatus)}>
                    {selectedParticipant.paymentStatus}
                  </Badge>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Participant Name"
                  value={selectedParticipant?.teamMemberParticipant}
                  icon={User}
                  fullWidth
                />
                <InfoRow
                  label="Contact Number"
                  value={selectedParticipant?.contactNumber}
                  icon={Phone}
                  fullWidth
                />
              </div>

              {/* Event Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Event Title"
                  value={selectedParticipant?.eventTitle}
                  fullWidth
                />
                <InfoRow
                  label="Date of Event"
                  value={formatDate(selectedParticipant?.dateOfEvent)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Category"
                  value={selectedParticipant?.category}
                  icon={Tag}
                />
              </div>

              {/* Special Requirements */}
              {selectedParticipant?.specialRequirements && (
                <div className="flex flex-col gap-y-1">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                    <FileText className="w-3 h-3" />
                    Special Requirements
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    {selectedParticipant?.specialRequirements}
                  </p>
                </div>
              )}

              {/* Processing Notes */}
              {(selectedParticipant?.paymentStatus === "paid" ||
                selectedParticipant?.paymentStatus === "refunded") &&
                selectedParticipant?.processingNotes && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                      <FileText className="w-3 h-3" />
                      Processing Notes
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                      {selectedParticipant?.processingNotes}
                    </p>
                  </div>
                )}

              {/* Timeline */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Created At"
                  value={formatDateTime(selectedParticipant?.createdAt)}
                  icon={Clock}
                  fullWidth
                />
                <InfoRow
                  label="Last Updated"
                  value={formatDateTime(selectedParticipant?.updatedAt)}
                  icon={Clock}
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