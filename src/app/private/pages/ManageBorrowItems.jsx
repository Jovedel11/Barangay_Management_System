import { useState } from "react";
import SearchComponent from "@/components/custom/SearchData";
import ItemCard from "@/app/private/components/borrow-item/ItemCard";
import useDebounce from "@/app/shared/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import customRequest from "@/services/customRequest";
import { BookingCard } from "../components/borrow-item/MyBookings";

const filterOptions = [
  "All Categories",
  "Furniture",
  "Electronics",
  "Shelter & Tents",
  "Tools & Equipment",
];

const ManageBorrowItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["available-items", debouncedSearchQuery, category],
    queryFn: () =>
      customRequest({
        path: `/api/borrow-item/available/items?search=${debouncedSearchQuery}&category=${category}`,
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
      <span className="text-3xl font-extrabold">Borrow Items</span>
      <span className="text-slate-400">
        Manage and monitor items available for borrowing
      </span>
      <div className="flex flex-col md:flex-row gap-x-2">
        <div className="w-full md:min-w-[48rem] flex mt-5 min-h-80 dark:border dark:border-slate-700 dark:bg-slate-800 shadow-sm bg-white rounded-md p-6">
          <div className="w-full flex flex-col">
            <span className="text-2xl font-extrabold dark:text-slate-200">
              Available Items to Borrow
            </span>
            <span className="text-slate-500">
              book a barangay item for your needs
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
              <div className="mt-6 max-h-[70rem] overflow-auto">
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
                    {documents.map((item, index) => {
                      if (!item.status) return null;
                      return (
                        <ItemCard key={index} item={item} refetch={refetch} />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-5 min-h-80 dark:border dark:border-slate-700 dark:bg-slate-800 shadow-sm bg-white rounded-md pb-5">
          <div className="w-full flex flex-col max-h-[70rem] overflow-auto">
            <BookingCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBorrowItems;
