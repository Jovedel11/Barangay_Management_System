import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/core/components/ui/button";
import { Plus, UserRoundCheck, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import customRequest from "@/services/customRequest";
import SearchComponent from "@/components/custom/SearchData";
import useDebounce from "@/app/shared/hooks/useDebounce";
import ResidentTable from "@/components/custom/ResidentTable";
import AddResident from "@/components/custom/AddResident";
import AccountTable from "@/components/custom/AccountTable";

const statusFilterOptions = ["All status", "approved", "pending", "rejected"];

const ManageService = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("system-resident/retrieve");
  const [statusFilter, setStatusFilter] = useState("All status");

  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [activeTab, debouncedSearchQuery, category, statusFilter],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-residents/${activeTab}?search=${debouncedSearchQuery}${
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
            User Management
          </span>
          <span className="text-muted-foreground">
            Manage barangay residents, system users, and review new applications
          </span>
        </div>
        <div className="ml-auto">
          <AddResident>
            <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-0 md:mr-2 h-4 w-4" />
              <span className="hidden md:block">Add Resident</span>
            </Button>
          </AddResident>
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
            value="system-resident/retrieve"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="mr-2 h-4 w-4" />
            Residents
          </TabsTrigger>
          <TabsTrigger
            value="system-user/retrieve"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <UserRoundCheck className="mr-2 h-4 w-4" />
            System Users
          </TabsTrigger>
        </TabsList>

        <div className="border border-border bg-card p-5 rounded-md w-full mt-5 shadow-sm">
          <div className="px-2">
            <SearchComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              category={category}
              setCategory={setCategory}
              filterOptions={[]}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              statusFilterOptions={statusFilterOptions}
              showStatus={activeTab === "system-user/retrieve"}
            />
          </div>

          <TabsContent value="system-resident/retrieve">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Registered Resident
              </span>
              <span className="text-muted-foreground">
                View and manage resident registered resident
              </span>
              {data && (
                <ResidentTable refetch={refetch} residents={data?.response} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="system-user/retrieve">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                System Users
              </span>
              <span className="text-muted-foreground mb-5">
                Manage approved and pending system users
              </span>
              <div className="w-full">
                {isLoading ? (
                  <div className="col-span-3 text-center py-8 text-muted-foreground">
                    <div className="animate-pulse">Loading users...</div>
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
                  <div className="w-full p-0">
                    <AccountTable residents={documents} refetch={refetch} />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ManageService;
