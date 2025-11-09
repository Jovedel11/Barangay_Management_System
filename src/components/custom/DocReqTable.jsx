import {
  CheckCircle,
  Loader,
  MoreHorizontal,
  X,
  User,
  Mail,
  Phone,
  FileText,
  Hash,
  Truck,
  File,
  Image,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/core/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { CustomToast } from "./CustomToast";
import customRequest from "@/services/customRequest";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Component for info rows
const InfoRow = ({ label, value, icon: Icon, fullWidth = false }) => (
  <div className={`flex flex-col gap-y-1 ${fullWidth ? "col-span-2" : ""}`}>
    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
    <span className="text-sm text-slate-900 dark:text-slate-100">{value}</span>
  </div>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function DocumentRequestsTable({ requests = [], refetch }) {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsSheetOpen(true);
    setUploadedFile(null);
    setSelectedStatus("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      return customRequest(data);
    },
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({
          queryKey: ["get-request"],
        });
        return CustomToast({
          description: "Progress status has been updated!",
          status: "success",
        });
      }
      return CustomToast({
        description: "Failed to update status",
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

  const handleUpdate = useCallback(async () => {
    try {
      const formData = new FormData();

      formData.append("docs_id", selectedRequest?._id);

      // Determine the status based on selectedStatus
      let statusToSend = "";
      if (
        selectedStatus === "ready-for-pickup" ||
        selectedStatus === "ready-for-delivery" ||
        selectedStatus === "document-done"
      ) {
        statusToSend = "completed";
      } else if (selectedStatus === "processing") {
        statusToSend = "processing";
      } else if (selectedStatus === "rejected") {
        statusToSend = "rejected";
      }

      if (
        selectedRequest?.digitallyAvailable &&
        uploadedFile &&
        selectedStatus === "document-done"
      ) {
        formData.append("status", "completed");
        formData.append("file", uploadedFile);
      } else {
        formData.append("status", statusToSend);
      }

      await updateMutation.mutateAsync({
        path: "/api/brgy-docs/update/request",
        attributes: {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      });

      setIsSheetOpen(false);
      setSelectedStatus("");
    } catch (error) {
      console.error("Error submitting:", error);
    }
  }, [updateMutation, uploadedFile, selectedRequest, selectedStatus]);

  return (
    <>
      <div className="w-full mt-4 space-y-4">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="w-42">Mode of Transaction</TableHead>
                <TableHead>Request Status</TableHead>
                <TableHead className="text-center">Timestamp</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    <span className="block my-5">No requests found</span>
                  </TableCell>
                </TableRow>
              ) : (
                requests?.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>
                          {`${request?.user?.firstName} ${request?.user?.lastName}`}
                        </span>
                        <span className="text-zinc-400">
                          {request?.user?.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{request.name}</span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {request.purpose}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="pl-5">{request.quantity}</span>
                    </TableCell>
                    <TableCell>{request.contactNumber}</TableCell>
                    <TableCell className="capitalize text-center w-42 md:pr-8">
                      {request.deliveryMethod}
                    </TableCell>
                    <TableCell className="pl-6">
                      {request?.status === "completed" && (
                        <Badge variant="default">Completed</Badge>
                      )}
                      {request?.status === "pending" && (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                      {request?.status === "processing" && (
                        <Badge variant="outline">Processing</Badge>
                      )}
                      {request?.status === "rejected" && (
                        <Badge variant="destructive">Rejected</Badge>
                      )}
                    </TableCell>
                    <TableCell className="capitalize text-center w-42 md:pr-8">
                      <div className="flex flex-col text-sm">
                        <span>
                          Request : {formatDate(request?.createdAt)}
                        </span>
                        {request.recieveDate && (
                          <span>
                            Receive : {formatDate(request?.recieveDate)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(request)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full md:max-w-[25rem] gap-y-0 overflow-y-auto font-inter dark:bg-slate-900 flex flex-col border-l border-slate-200 dark:border-slate-700">
          <SheetHeader className="text-left">
            <SheetTitle className="font-inter text-xl">
              Request Details
            </SheetTitle>
            <SheetDescription className="text-sm">
              Review the request information and process the document
            </SheetDescription>
          </SheetHeader>

          {selectedRequest && (
            <div className="w-full flex-1 flex flex-col gap-y-6 px-4 mt-4">
              {/* Resident Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Full Name"
                  value={`${selectedRequest?.user?.firstName} ${selectedRequest?.user?.lastName}`}
                  icon={User}
                  fullWidth
                />
                <InfoRow
                  label="Email"
                  value={selectedRequest?.user?.email}
                  icon={Mail}
                  fullWidth
                />
                <InfoRow
                  label="Contact Number"
                  value={selectedRequest?.contactNumber}
                  icon={Phone}
                  fullWidth
                />
              </div>

              {/* Request Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <InfoRow
                  label="Document Name"
                  value={selectedRequest?.name}
                  icon={FileText}
                  fullWidth
                />
                <InfoRow
                  label="Purpose"
                  value={selectedRequest?.purpose}
                  icon={FileText}
                  fullWidth
                />
                <InfoRow
                  label="Quantity"
                  value={selectedRequest?.quantity}
                  icon={Hash}
                />
                <InfoRow
                  label="Mode of Transaction"
                  value={selectedRequest?.deliveryMethod}
                  icon={Truck}
                />
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="col-span-2 flex flex-col gap-y-1">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                    <FileText className="w-3 h-3" />
                    Specific Details
                  </span>
                  <span className="text-sm text-slate-900 dark:text-slate-100">
                    {selectedRequest?.specificDetails ||
                      "No additional details provided"}
                  </span>
                </div>
                <div className="col-span-2 flex flex-col gap-y-1">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Progress Status
                  </span>
                  <div>
                    {selectedRequest?.status === "completed" && (
                      <Badge variant="default">Completed</Badge>
                    )}
                    {selectedRequest?.status === "pending" && (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                    {selectedRequest?.status === "processing" && (
                      <Badge variant="outline">Processing</Badge>
                    )}
                    {selectedRequest?.status === "rejected" && (
                      <Badge variant="destructive">Rejected</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* File Upload for Digital delivery */}
              {selectedRequest?.digitallyAvailable &&
                (selectedRequest?.status === "pending" ||
                  selectedRequest?.status === "completed") && (
                  <div className="flex flex-col gap-y-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-x-1">
                      <File className="w-3 h-3" />
                      Upload Document (PDF/Image)
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Note: File upload is only available for documents that can
                      be sent digitally.
                    </p>
                    {!uploadedFile ? (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="w-full rounded-lg py-6 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
                          <File className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Click to upload document
                          </p>
                        </div>
                      </label>
                    ) : (
                      <div className="pr-8 gap-x-3 h-14 flex mt-2 items-center relative truncate w-full rounded-lg py-2 px-2 border border-dashed border-purple-300 dark:border-purple-700 text-sm">
                        <span className="p-2 border rounded-md border-purple-200 bg-purple-50 dark:bg-purple-900/80 dark:border-purple-800 text-purple-500 dark:text-purple-500">
                          <File size={19} />
                        </span>
                        <div className="h-full truncate flex flex-col">
                          <span className="text-sm max-w-[9rem] md:max-w-[13rem] truncate text-slate-900 dark:text-slate-100">
                            {uploadedFile.name}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500">
                            {formatFileSize(uploadedFile.size)}
                          </span>
                        </div>
                        <Button
                          onClick={removeFile}
                          className="shadow-none right-2 absolute bg-transparent text-slate-900 dark:text-slate-200 cursor-pointer hover:bg-transparent p-0 h-5 w-2"
                        >
                          <X className="size-[18px]" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              {/* Status Selection Dropdown */}
              <div className="flex flex-col gap-y-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Set Status
                </span>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-fit min-w-[200px]">
                    <SelectValue placeholder="Choose action to process" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRequest?.deliveryMethod === "pickup" && (
                      <>
                        {selectedRequest?.status !== "completed" && (
                          <SelectItem value="ready-for-pickup">
                            Mark as Ready for Pickup
                          </SelectItem>
                        )}
                        {selectedRequest?.status !== "processing" && (
                          <SelectItem value="processing">
                            Mark as Processing
                          </SelectItem>
                        )}
                        {selectedRequest?.status !== "rejected" && (
                          <SelectItem value="rejected">
                            Reject Request
                          </SelectItem>
                        )}
                      </>
                    )}
                    {selectedRequest?.deliveryMethod === "delivery" && (
                      <>
                        {selectedRequest?.status !== "completed" && (
                          <SelectItem value="ready-for-delivery">
                            Mark as Ready for Delivery
                          </SelectItem>
                        )}
                        {selectedRequest?.status !== "processing" && (
                          <SelectItem value="processing">
                            Mark as Processing
                          </SelectItem>
                        )}
                        {selectedRequest?.status !== "rejected" && (
                          <SelectItem value="rejected">
                            Reject Request
                          </SelectItem>
                        )}
                      </>
                    )}
                    {selectedRequest?.digitallyAvailable && (
                      <>
                        {selectedRequest?.status !== "completed" && (
                          <SelectItem value="document-done">
                            Document Done
                          </SelectItem>
                        )}
                        {selectedRequest?.status !== "processing" && (
                          <SelectItem value="processing">
                            Mark as Processing
                          </SelectItem>
                        )}
                        {selectedRequest?.status !== "rejected" && (
                          <SelectItem value="rejected">
                            Reject Request
                          </SelectItem>
                        )}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <SheetFooter className="flex flex-col gap-y-2 px-4 pb-4">
            <Button
              onClick={handleUpdate}
              disabled={
                !selectedStatus ||
                (selectedRequest?.digitallyAvailable &&
                  selectedStatus === "document-done" &&
                  !uploadedFile &&
                  selectedRequest?.deliveryMethod === "digitally") ||
                updateMutation.isPending
              }
              className="w-full"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Process Document
                </>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
