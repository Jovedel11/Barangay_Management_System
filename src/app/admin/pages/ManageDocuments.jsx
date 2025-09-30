import { Button } from "@/core/components/ui/button";
import { CheckCircle, GitPullRequest, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddDocument from "@/components/custom/AddDocument";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DocumentTypeCard from "@/app/shared/components/document-type-card";
import customRequest from "@/services/customRequest";
import SearchComponent from "@/components/custom/SearchData";
import useDebounce from "@/app/shared/hooks/useDebounce";

const filterOptions = [
  "All Categories",
  "Barangay Clearance",
  "Indengency Certificate",
  "Residency Certificate",
  "Business Permit",
  "Other",
];

const ManageDocuments = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["availableDocs", debouncedSearchQuery, category],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-docs/search?search=${debouncedSearchQuery}&category=${category}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: debouncedSearchQuery !== undefined,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const handleOpenChange = () => {
    setOpen((prevState) => !prevState);
  };
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
            <div>
              <SearchComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                category={category}
                setCategory={setCategory}
                filterOptions={filterOptions}
              />
            </div>
            <div className="grid grid-col-1 md:grid-cols-3 gap-3">
              {isLoading ? (
                <div className="col-span-3 text-center py-4">
                  Loading documents...
                </div>
              ) : error || !data?.response ? (
                <div className="col-span-3 text-center text-red-500 py-4">
                  No documents found
                </div>
              ) : data?.response?.length === 0 ? (
                <div className="col-span-3 text-center text-slate-500 py-4">
                  No documents found
                </div>
              ) : (
                data?.response?.map((docType) => (
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
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageDocuments;
