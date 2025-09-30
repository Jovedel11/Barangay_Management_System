import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function DocumentRequestsTable({ requests = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = requests?.filter((request) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      request.user?.first_name?.toLowerCase().includes(searchLower) ||
      request.user?.last_name?.toLowerCase().includes(searchLower) ||
      request.user?.email?.toLowerCase().includes(searchLower) ||
      request.purpose?.toLowerCase().includes(searchLower) ||
      request.contactNumber?.includes(searchTerm)
    );
  });

  const handleViewDetails = (requestId) => {
    // Add your view details logic here
    console.log("View details for:", requestId);
  };

  const handleDelete = (requestId) => {
    // Add your delete logic here
    console.log("Delete request:", requestId);
  };

  console.log(requests);

  return (
    <div className="w-full mt-4 space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resident</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No requests found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((request) => (
                <TableRow key={request._id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>
                        {`${request.user.firstName} ${request.user.lastName}`}
                      </span>
                        <span className="text-zinc-400"> {request.user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>{request.contactNumber}</TableCell>
                  <TableCell className="capitalize">
                    {request.deliveryMethod}
                  </TableCell>
                  <TableCell>
                    {request.urgentRequest ? (
                      <Badge variant="destructive">Urgent</Badge>
                    ) : (
                      <Badge variant="secondary">Normal</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      onValueChange={(value) => {
                        if (value === "view") handleViewDetails(request._id);
                        if (value === "delete") handleDelete(request._id);
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Actions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="delete">
                          <div className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
