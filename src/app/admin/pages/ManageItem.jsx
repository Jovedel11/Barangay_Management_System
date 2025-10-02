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

const filterOptions = [
  "All Categories",
  "Furniture",
  "Electronics",
  "Shelter & Tents",
  "Tools & Equipment",
];

const statusFilterOptions = ["All status", "approved", "completed", "pending"];

const ManageDocuments = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("available/items");
  const [statusFilter, setStatusFilter] = useState("All status");

  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [activeTab, debouncedSearchQuery, category, statusFilter],
    queryFn: () =>
      customRequest({
        path: `/api/borrow-item/${activeTab}?search=${debouncedSearchQuery}&category=${category}${
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
            Item Management
          </span>
          <span className="text-muted-foreground">
            Manage inventory, track bookings, and process resident requests
          </span>
        </div>
        <div className="ml-auto">
          <ItemDialog open={open} handleOpenChange={setOpen}>
            <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Add Item</span>
            </Button>
          </ItemDialog>
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
            value="request/items"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <GitPullRequest className="mr-2 h-4 w-4" />
            Request Items
          </TabsTrigger>
          <TabsTrigger
            value="available/items"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Item Inventory
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
            />
          </div>

          <TabsContent value="request/items">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Item Bookings
              </span>
              <span className="text-muted-foreground">
                View and manage resident item bookings
              </span>
              {data && (
                <ItemBookingTable refetch={refetch} bookings={data?.response} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="available/items">
            <div className="flex flex-col bg-card px-2 rounded-md w-full mt-3">
              <span className="text-2xl font-extrabold text-card-foreground">
                Items Inventory
              </span>
              <span className="text-muted-foreground mb-5">
                Manage available items and their details
              </span>
              <div className="grid grid-col-1 md:grid-cols-3 gap-3">
                {isLoading ? (
                  <div className="col-span-3 text-center py-8 text-muted-foreground">
                    <div className="animate-pulse">Loading items...</div>
                  </div>
                ) : error ? (
                  <div className="col-span-3 text-center text-destructive py-8">
                    Error loading data
                  </div>
                ) : documents.length === 0 ? (
                  <div className="col-span-3 text-center text-muted-foreground py-8">
                    No items found
                  </div>
                ) : (
                  documents?.map((item) => (
                    <ItemCard key={item._id} item={item} refetch={refetch} />
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
