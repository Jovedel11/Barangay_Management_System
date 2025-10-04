import { Eye, MoreHorizontal, Trash2, CheckCircle } from "lucide-react";
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
import ProcessRequestDialog from "./ProcessReq";

export default function ServiceRequestTable({ requests = [], refetch }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [processReq, setProcessReq] = useState(null);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const getStatusVariant = (status) => {
    const variants = {
      confirmed: "default",
      pending: "secondary",
      completed: "default",
      "no show": "destructive",
    };
    return variants[status] || "secondary";
  };


  const handleEdit = (request) => {
    setProcessReq(request);
    setIsProcessOpen(true);
  };

  const handleDelete = async (requestId) => {
    try {
      if (!requestId) throw new Error();
      const result = await customRequest({
        path: "/api/brgy-services/delete/request",
        attributes: {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ service_id: requestId }),
        },
      });
      if (!result?.success) {
        return CustomToast({
          description: "Failed to delete the service",
          status: "error",
        });
      }
      refetch();
      CustomToast({
        description: "Service has been deleted successfully",
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
        <div className="border rounded-lg">
          <ProcessRequestDialog
            request={processReq}
            isOpen={isProcessOpen}
            onOpenChange={onProcessChange}
            onSubmit={() => {}}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    <span className="block my-5">
                      No service requests found
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                requests?.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>
                          {`${request?.user?.firstName || ""} ${
                            request?.user?.lastName || ""
                          }`}
                        </span>
                        <span className="text-sm text-zinc-400">
                          {request?.user?.email || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{request.service}</span>
                        <span className="text-sm text-zinc-400">
                          {request.category}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {formatDateTime(request.createdAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        {request.details}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-46">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(request)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(request)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Process Request
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(request?._id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Service Request Details</DialogTitle>
            <DialogDescription>
              View complete information about this service request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Resident Name
                    </h4>
                    <p className="text-base">
                      {`${selectedRequest?.user?.firstName || ""} ${
                        selectedRequest?.user?.lastName || ""
                      }`}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Email
                    </h4>
                    <p className="text-base">
                      {selectedRequest?.user?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Service Name
                    </h4>
                    <p className="text-base">{selectedRequest?.service}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Category
                    </h4>
                    <p className="text-base">{selectedRequest?.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Status
                    </h4>
                    <div className="mt-1">
                      <Badge variant={getStatusVariant(selectedRequest.status)}>
                        {selectedRequest.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Created At
                    </h4>
                    <p className="text-base">
                      {formatDateTime(selectedRequest?.createdAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                    Request Details
                  </h4>
                  <p className="text-base">{selectedRequest?.details}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                    Last Updated
                  </h4>
                  <p className="text-base">
                    {formatDateTime(selectedRequest?.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
