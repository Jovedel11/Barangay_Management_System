import {
  CheckCircle,
  Eye,
  Loader,
  MoreHorizontal,
  Trash2,
  X,
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
import { CustomToast } from "./CustomToast";
import customRequest from "@/services/customRequest";
import { Fragment, useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DocumentRequestsTable({ requests = [], refetch }) {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleDocsDeletion = async (requestId) => {
    try {
      if (!requestId) throw new Error();
      const result = await customRequest({
        path: "/api/brgy-docs/delete/request",
        attributes: {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ docs_id: requestId }),
        },
      });
      if (!result?.success) {
        return CustomToast({
          description: "Failed to delete the document",
          status: "error",
        });
      }
      refetch();
      CustomToast({
        description: "Document has been deleted successfully",
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

  const handleUpdate = useCallback(
    async ({ docs_id, status }) => {
      console.log(docs_id, status);
      try {
        updateMutation.mutate({
          path: "/api/brgy-docs/update/request",
          attributes: {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ docs_id, status }),
            credentials: "include",
          },
        });
      } catch (error) {
        console.error("Error submitting:", error);
      }
    },
    [updateMutation]
  );

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
                <TableHead className="w-42">Mode of Delivery</TableHead>
                <TableHead>Request Status</TableHead>
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
                          {" "}
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
                      <span className="pl-5"> {request.quantity}</span>
                    </TableCell>
                    <TableCell>{request.contactNumber}</TableCell>
                    <TableCell className="capitalize text-center w-42 md:pr-8">
                      {request.deliveryMethod}
                    </TableCell>
                    <TableCell className="pl-6">
                      {request?.status === "completed" && (
                        <Badge variant="destructive">Ready for pickup</Badge>
                      )}
                      {request?.status === "pending" && (
                        <Badge variant="destructive">Pending</Badge>
                      )}
                      {request?.status === "delivered" && (
                        <Badge variant="destructive">Delivered</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(request)}
                          >
                            <Eye className="mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {request?.deliveryMethod === "pickup" &&
                            request?.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdate({
                                    docs_id: request?._id,
                                    status: "completed",
                                  })
                                }
                              >
                                <CheckCircle className="mr-2" />
                                Mark as Ready for pickup
                              </DropdownMenuItem>
                            )}
                          {request?.status !== "pending" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdate({
                                  docs_id: request?._id,
                                  status: "pending",
                                })
                              }
                            >
                              <Loader className="mr-2" />
                              Mark as Pending
                            </DropdownMenuItem>
                          )}
                          {request?.deliveryMethod === "delivery" &&
                            request?.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdate({
                                    docs_id: request?._id,
                                    status: request?.status,
                                    isDelivered: "delivered",
                                  })
                                }
                              >
                                <CheckCircle className="mr-2" />
                                Mark as Delivered
                              </DropdownMenuItem>
                            )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDocsDeletion(request?._id)}
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
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              View complete information about this document request
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
                      {`${selectedRequest?.user?.firstName} ${selectedRequest?.user?.lastName}`}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Email
                    </h4>
                    <p className="text-base">{selectedRequest?.user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Contact Number
                    </h4>
                    <p className="text-base">
                      {selectedRequest?.contactNumber}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Delivery Method
                    </h4>
                    <p className="text-base capitalize">
                      {selectedRequest?.deliveryMethod}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Purpose
                    </h4>
                    <p className="text-base">{selectedRequest?.purpose}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Quantity
                    </h4>
                    <p className="text-base">{selectedRequest?.quantity}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Specific Details
                    </h4>
                    <p className="text-base">
                      {selectedRequest?.specificDetails ||
                        "No additional details provided"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                      Progress Status
                    </h4>
                    <p className="text-base">
                      {selectedRequest?.status === "completed" && (
                        <Badge variant="destructive">Ready for pickup</Badge>
                      )}
                      {selectedRequest?.status === "pending" && (
                        <Badge variant="destructive">Pending</Badge>
                      )}
                      {selectedRequest?.status === "delivered" && (
                        <Badge variant="destructive">Delivered</Badge>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
