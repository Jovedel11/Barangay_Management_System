import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/core/components/ui/button";
import { CheckCircle, GitPullRequest, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import customRequest from "@/services/customRequest";
import SearchComponent from "@/components/custom/SearchData";
import useDebounce from "@/app/shared/hooks/useDebounce";
import ServiceRequestTable from "@/components/custom/ServiceReqTable";
import AddEvent from "@/components/custom/AddEvents";
import EventCard from "@/app/shared/components/event-card";

const filterOptions = [
  "All Categories",
  "Sports Athletic",
  "Beauty Pageants",
  "Entertainment",
  "Competitions",
  "Community Events",
  "Fiesta & Celebration",
];

const statusFilterOptions = [
  "All status",
  "approved",
  "completed",
  "pending",
  "rescheduled",
];

const ManageEvents = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("available/retrieve");
  const [statusFilter, setStatusFilter] = useState("All status");

  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [activeTab, debouncedSearchQuery, category, statusFilter],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-events/${activeTab}?search=${debouncedSearchQuery}&category=${category}${
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
            Event Management
          </span>
          <span className="text-muted-foreground">
            Manage barangay events, registrations, and community activities
          </span>
        </div>
        <div className="ml-auto">
          <AddEvent open={open} handleOpenChange={setOpen}>
            <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-0 md:mr-2 h-4 w-4" />
              <span className="hidden md:block">Add Event</span>
            </Button>
          </AddEvent>
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
            Event Request
          </TabsTrigger>
          <TabsTrigger
            value="available/retrieve"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Event Catalog
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
                <ServiceRequestTable
                  refetch={refetch}
                  requests={data?.response}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="available/retrieve">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Barangay Events
              </span>
              <span className="text-muted-foreground mb-5">
                Manage community events, sports tournaments, and celebrations
              </span>
              <div className="flex flex-col gap-3">
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
                  documents?.map((brgyEvent) => (
                    <EventCard
                      key={brgyEvent._id}
                      event={brgyEvent}
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

export default ManageEvents;
