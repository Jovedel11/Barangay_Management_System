import { Button } from "@/core/components/ui/button";
import { CheckCircle, GitPullRequest, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddDocument from "@/components/custom/AddDocument";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DocumentTypeCard from "@/app/shared/components/document-type-card";
import customRequest from "@/services/customRequest";

const ManageDocuments = () => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["availableDocs"],
    queryFn: () =>
      customRequest({
        path: "/api/brgy-docs/retrieve-all",
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
  }); // UseQuery for imitating real-time or making the data refetched as soon as there's an update

  const handleOpenChange = () => {
    setOpen((prevState) => !prevState);
  };

  console.log(data?.response?.documents);
  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex">
        {/*header */}
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold">Document Management</span>
          <span className="text-slate-500">view and manage your documents</span>
        </div>
        <div className="ml-auto">
          <AddDocument open={open} handleOpenChange={handleOpenChange}>
            <Button className="ml-auto">
              <Plus />
              <span className="hidden md:block">Add Document</span>
            </Button>
          </AddDocument>
        </div>
      </div>
      <Tabs
        defaultValue="request"
        onValueChange={(value) => {
          console.log("Active tab:", value);
        }}
        className="w-full mt-5"
      >
        <TabsList className="rounded-sm">
          <TabsTrigger
            value="request"
            className="rounded-sm data-[state=active]:bg-slate-950"
          >
            <GitPullRequest />
            Request Docs
          </TabsTrigger>
          <TabsTrigger
            value="available"
            className="rounded-sm data-[state=active]:bg-slate-950"
          >
            <CheckCircle />
            Available Docs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          <div className="border flex flex-col border-slate-700 bg-slate-800 p-5 rounded-md w-full mt-5">
            <span className="text-2xl font-extrabold">
              Service Appointments
            </span>
            <span className="text-slate-500">
              view and manage your appointments
            </span>
          </div>
        </TabsContent>
        <TabsContent value="available">
          <div className="border flex flex-col border-slate-700 bg-slate-800 p-5 rounded-md w-full mt-5">
            <span className="text-2xl font-extrabold">Available Documents</span>
            <span className="text-slate-500 mb-5">
              view and manage your appointments documents
            </span>
            <div className="grid grid-col-1 md:grid-cols-3 gap-3">
              {data?.response?.documents?.map((docType) => (
                <DocumentTypeCard
                  key={docType._id}
                  documentType={docType}
                  onView={() => {}}
                  onToggleStatus={() => {}}
                  onDelete={() => {}}
                  onSettings={(docType) =>
                    console.log("Settings for:", docType)
                  }
                  refetch={refetch}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageDocuments;
