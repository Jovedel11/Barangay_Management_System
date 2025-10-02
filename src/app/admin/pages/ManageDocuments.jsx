import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/core/components/ui/button";
import { CheckCircle, GitPullRequest, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddDocument from "@/components/custom/AddDocument";
import DocumentTypeCard from "@/app/shared/components/document-type-card";
import customRequest from "@/services/customRequest";
import SearchComponent from "@/components/custom/SearchData";
import useDebounce from "@/app/shared/hooks/useDebounce";
import DocumentRequestsTable from "@/components/custom/DocReqTable";

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
  const [activeTab, setActiveTab] = useState("get-available");

  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [activeTab, debouncedSearchQuery, category],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-docs/${activeTab}?search=${debouncedSearchQuery}&category=${category}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: debouncedSearchQuery !== undefined,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const handleOpenChange = () => setOpen((prev) => !prev);
  const documents = Array.isArray(data?.response) ? data.response : [];
  console.log(data);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <div className="w-full flex">
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-foreground">
            Document Management
          </span>
          <span className="text-muted-foreground">
            View and manage your documents
          </span>
        </div>
        <div className="ml-auto">
          <AddDocument open={open} handleOpenChange={handleOpenChange}>
            <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus />
              <span className="hidden md:block">Add Document</span>
            </Button>
          </AddDocument>
        </div>
      </div>

      <Tabs
        defaultValue="request"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full mt-5"
      >
        <TabsList className="rounded-sm bg-muted">
          <TabsTrigger
            value="get-request"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <GitPullRequest className="mr-2 h-4 w-4" />
            Request Docs
          </TabsTrigger>
          <TabsTrigger
            value="get-available"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Available Docs
          </TabsTrigger>
        </TabsList>

        <div className="border border-border bg-card p-5 rounded-md w-full mt-5 shadow-sm">
          <div className="px-2">
            <SearchComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              category={category}
              setCategory={setCategory}
              filterOptions={filterOptions}
            />
          </div>

          <TabsContent value="get-request">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Document Requests
              </span>
              <span className="text-muted-foreground">
                View and manage document requests
              </span>
              {data && (
                <DocumentRequestsTable
                  refetch={refetch}
                  requests={data?.response}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="get-available">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Available Documents
              </span>
              <span className="text-muted-foreground mb-5">
                View and manage your available documents
              </span>
              <div className="grid grid-col-1 md:grid-cols-3 gap-3">
                {isLoading ? (
                  <div className="col-span-3 text-center py-8 text-muted-foreground">
                    <div className="animate-pulse">Loading documents...</div>
                  </div>
                ) : error ? (
                  <div className="col-span-3 text-center text-destructive py-8">
                    Error loading data
                  </div>
                ) : documents.length === 0 ? (
                  <div className="col-span-3 text-center text-muted-foreground py-8">
                    No documents found
                  </div>
                ) : (
                  documents.map((doc) => (
                    <DocumentTypeCard
                      key={doc._id}
                      documentType={doc}
                      onView={() => {}}
                      onToggleStatus={() => {}}
                      onDelete={() => {}}
                      onSettings={(doc) => console.log("Settings for:", doc)}
                      refetch={refetch}
                    />
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ManageDocuments;
