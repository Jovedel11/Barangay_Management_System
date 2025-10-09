import customRequest from "@/services/customRequest";
import FeaturedEvent from "../components/events/FeaturedEvent";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/app/shared/hooks/useDebounce";
import { useState } from "react";
import EventsCard from "../components/events/EventsCard";
import SearchComponent from "@/components/custom/SearchData";

const filterOptions = [
  "All Categories",
  "Sports Athletic",
  "Beauty Pageants",
  "Entertainment",
  "Competitions",
  "Community Events",
  "Fiesta & Celebration",
];

const BarangayEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [debouncedSearchQuery, category],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-events/available/retrieve?search=${debouncedSearchQuery}&category=${category}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: debouncedSearchQuery !== undefined,
  });

  const brgyEvents = Array.isArray(data?.response) ? data.response : [];
  return (
    <div className="w-full flex flex-col">
      <span className="text-3xl font-extrabold">Barangay Events</span>
      <span className="text-slate-400">
        Stay updated with community activities, sports tournaments, and
        celebrations
      </span>
      <div className="mt-3">
        <FeaturedEvent />
      </div>
      <div className="w-full md:min-w-[48rem] flex mt-5  dark:border dark:border-slate-700 dark:bg-slate-800 shadow-sm bg-white rounded-md p-6">
        <div className="w-full flex flex-col">
          <span className="text-2xl font-extrabold dark:text-slate-200">
            Available Documents
          </span>
          <span className="text-slate-500">
            request online • all payments at barangay office only
          </span>
          <div className="w-full mt-4">
            <SearchComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              category={category}
              setCategory={setCategory}
              filterOptions={filterOptions}
            />

            {/* Items Grid */}
            <div className="mt-6 max-h-[50rem] overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <span className="text-slate-500">Loading items...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8">
                  <span className="text-destructive">Error loading items</span>
                </div>
              ) : brgyEvents.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <span className="text-slate-500">No items available</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {brgyEvents.map((event, index) => (
                    <EventsCard key={index} event={event} refetch={refetch} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangayEvents;
