import { CheckCircle, MoreHorizontal, XCircle } from "lucide-react";
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
import { CustomToast } from "./CustomToast";

export default function AccountTable({ residents = [], refetch }) {
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
          docs_id: user_id,
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

      CustomToast({
        description: "Document updated successfully.",
        status: "success",
      });
      refetch();
    } catch (error) {
      console.error("Error submitting:", error);
      CustomToast({
        description: "An unexpected error occurred.",
        status: "error",
      });
    }
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
                Role
              </TableHead>
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-900 dark:text-slate-100">
                Created At
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
              residents.map((resident, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    {resident.first_name} {resident.last_name}
                  </TableCell>
                  <TableCell>{resident.email}</TableCell>
                  <TableCell>{resident.phone_number}</TableCell>
                  <TableCell className="capitalize">{resident.role}</TableCell>
                  <TableCell className="capitalize">
                    {resident.status}
                  </TableCell>
                  <TableCell>{formatDate(resident.createdAt)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleAction("approve", resident._id);
                          }}
                        >
                          <CheckCircle />
                          Approve User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleAction("reject", resident._id);
                          }}
                        >
                          <XCircle />
                          Reject User
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
  );
}
