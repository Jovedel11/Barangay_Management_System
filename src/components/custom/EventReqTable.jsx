import { Eye, MoreHorizontal, Trash2, Edit } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import customRequest from "@/services/customRequest";
import { CustomToast } from "./CustomToast";
import ProcessBookingDialog from "@/components/custom/ProcessBooking";

export default function EventParticipantTable({ participants = [], refetch }) {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [processParticipant, setProcessParticipant] = useState(null);

  const handleViewDetails = (participant) => {
    setSelectedParticipant(participant);
    setIsViewDialogOpen(true);
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    };
    return styles[status] || "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
  };

  const getPaymentBadgeStyle = (paymentStatus) => {
    const styles = {
      paid: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      refunded: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      "not paid": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    };
    return styles[paymentStatus] || "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
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
                              : "Edit Booking"}
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
          <DialogHeader className="space-y-3 pb-6 border-b dark:border-slate-800">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Participant Details
            </DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              View complete information about this participant
            </DialogDescription>
          </DialogHeader>

          {selectedParticipant && (
            <div className="space-y-6 py-6">
              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Participant Name
                    </h4>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {selectedParticipant?.teamMemberParticipant}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Contact Number
                    </h4>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {selectedParticipant?.contactNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Event Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Event Title
                    </h4>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {selectedParticipant?.eventTitle}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Date of Event
                    </h4>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {formatDate(selectedParticipant?.dateOfEvent)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Category
                    </h4>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {selectedParticipant?.category}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Status
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadgeStyle(selectedParticipant.status)}`}>
                        {selectedParticipant.status}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getPaymentBadgeStyle(selectedParticipant.paymentStatus)}`}>
                        {selectedParticipant.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Additional Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Special Requirements
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedParticipant?.specialRequirements || "None"}
                    </p>
                  </div>

                  {(selectedParticipant?.paymentStatus === "paid" ||
                    selectedParticipant?.paymentStatus === "refunded") &&
                    selectedParticipant?.processingNotes && (
                      <div className="space-y-2 pt-4 border-t dark:border-slate-700">
                        <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                          Processing Notes
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {selectedParticipant?.processingNotes}
                        </p>
                      </div>
                    )}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Created At
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDateTime(selectedParticipant?.createdAt)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                      Last Updated
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDateTime(selectedParticipant?.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="border-t dark:border-slate-800 pt-6">
            <DialogClose asChild>
              <Button variant="outline" className="px-6">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}