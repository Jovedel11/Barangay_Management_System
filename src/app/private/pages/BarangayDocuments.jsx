import { useState } from "react";
import SearchComponent from "@/components/custom/SearchData";
import DocsRequest from "../components/documents/DocsRequest";
import useDebounce from "@/app/shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import DocCard from "../components/documents/DocsCard";

const filterOptions = [
  "All Categories",
  "Barangay Clearance",
  "Indengency Certificate",
  "Residency Certificate",
  "Business Permit",
  "Other",
];

const ManageBorrowItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["brgy-docs", debouncedSearchQuery, category],
    queryFn: () =>
      customRequest({
        path: `/api/brgy-docs/get-available?search=${debouncedSearchQuery}&category=${category}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: debouncedSearchQuery !== undefined,
  });

  const documents = Array.isArray(data?.response) ? data.response : [];

  return (
    <div className="w-full flex flex-col">
      <span className="text-3xl font-extrabold">Barangay Documents</span>
      <span className="text-slate-400">
        Request documents online • Pay and collect at barangay office
      </span>
      <div className="flex flex-col md:flex-row gap-x-2">
        <div className="w-full md:min-w-[48rem] flex mt-5 dark:border dark:border-slate-700 dark:bg-slate-800 shadow-sm bg-white rounded-md p-6">
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
                ) : documents.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="text-slate-500">No items available</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc, index) => (
                      <DocCard key={index} doc={doc} refetch={refetch} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-5 min-h-80 dark:border dark:border-slate-700 dark:bg-slate-800 shadow-sm bg-white rounded-md pb-5">
          <div className="w-full flex flex-col max-h-[50rem] overflow-auto">
            <DocsRequest />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBorrowItems;
