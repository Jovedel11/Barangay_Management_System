import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/core/components/ui/button";
import { CheckCircle, GitPullRequest, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItemDialog from "@/components/custom/ItemDialog";
import DocumentTypeCard from "@/app/shared/components/document-type-card";
import customRequest from "@/services/customRequest";
import SearchComponent from "@/components/custom/SearchData";
import useDebounce from "@/app/shared/hooks/useDebounce";
import DocumentRequestsTable from "@/components/custom/DocReqTable";
import ItemCard from "@/app/shared/components/item-card";
import ItemBookingTable from "@/components/custom/ItemBookingTable";
import AddService from "@/components/custom/AddService";
import ServiceCard from "@/app/shared/components/service-card";
import ServiceRequestTable from "@/components/custom/ServiceReqTable";

const filterOptions = [
  "All Categories",
  "Health Services",
  "Community Programs",
  "Legal Services",
  "Social Services",
  "Education",
  "Other",
];

const statusFilterOptions = ["All status", "approved", "completed", "pending", "rescheduled"];

const ManageDocuments = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("available/services");
  const [statusFilter, setStatusFilter] = useState("All status");

  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [activeTab, debouncedSearchQuery, category, statusFilter],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-services/${activeTab}?search=${debouncedSearchQuery}&category=${category}${
          statusFilter !== "All status" ? `&status=${statusFilter}` : ""
        }`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: debouncedSearchQuery !== undefined,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const documents = Array.isArray(data?.response) ? data.response : [];
  console.log(data);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <div className="w-full flex">
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-foreground">
            Service Management
          </span>
          <span className="text-muted-foreground">
            Manage barangay services, appointments, and resident requests
          </span>
        </div>
        <div className="ml-auto">
          <AddService open={open} handleOpenChange={setOpen}>
            <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Add Service</span>
            </Button>
          </AddService>
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
            value="request/services"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <GitPullRequest className="mr-2 h-4 w-4" />
            Service Appointments
          </TabsTrigger>
          <TabsTrigger
            value="available/services"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Service Catalog
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
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              statusFilterOptions={statusFilterOptions}
              showStatus={activeTab === "request/services"}
            />
          </div>

          <TabsContent value="request/services">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Service Appointments
              </span>
              <span className="text-muted-foreground">
                View and manage resident service appointments
              </span>
              {data && (
                <ServiceRequestTable refetch={refetch} requests={data?.response} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="available/services">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Barangay Services
              </span>
              <span className="text-muted-foreground mb-5">
                Manage available services and their details
              </span>
              <div className="grid grid-col-1 md:grid-cols-3 gap-3">
                {isLoading ? (
                  <div className="col-span-3 text-center py-8 text-muted-foreground">
                    <div className="animate-pulse">Loading services...</div>
                  </div>
                ) : error ? (
                  <div className="col-span-3 text-center text-destructive py-8">
                    Error loading data
                  </div>
                ) : documents.length === 0 ? (
                  <div className="col-span-3 text-center text-muted-foreground py-8">
                    No services found
                  </div>
                ) : (
                  documents?.map((service) => (
                    <ServiceCard
                      key={service._id}
                      service={service}
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
