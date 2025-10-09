import { useState } from "react";
import SearchComponent from "@/components/custom/SearchData";
import useDebounce from "@/app/shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import ServiceCard from "../components/services/ServiceCard";
import ServiceRequests from "../components/services/ServiceRequest";

const filterOptions = [
  "All Categories",
  "Health Services",
  "Community Programs",
  "Legal Services",
  "Social Services",
  "Education",
  "Other",
];

const BarangayServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error } = useQuery({
    queryKey: [debouncedSearchQuery, category],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-services/available/services?search=${debouncedSearchQuery}&category=${category}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: debouncedSearchQuery !== undefined,
  });

  const services = Array.isArray(data?.response) ? data.response : [];

  return (
    <div className="w-full flex flex-col">
      <span className="text-3xl font-extrabold">Barangay Services</span>
      <span className="text-slate-400">
        Access free and affordable community services in our barangay
      </span>
      <div className="flex flex-col md:flex-row gap-x-2">
        <div className="w-full md:min-w-[48rem] flex mt-5  dark:border dark:border-slate-700 dark:bg-slate-800 shadow-sm bg-white rounded-md p-6">
          <div className="w-full flex flex-col">
            <span className="text-2xl font-extrabold dark:text-slate-200">
              Available Services
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
              <div className="mt-6 max-h-[40rem] overflow-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="text-slate-500">Loading items...</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="text-destructive">
                      Error loading items
                    </span>
                  </div>
                ) : services.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="text-slate-500">No items available</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service, index) => (
                      <ServiceCard key={index} selectedService={service} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-5 dark:border dark:border-slate-700 dark:bg-slate-800 shadow-sm bg-white rounded-md pb-5">
          <div className="w-full flex flex-col max-h-[50rem] overflow-auto">
            <ServiceRequests />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangayServices;
