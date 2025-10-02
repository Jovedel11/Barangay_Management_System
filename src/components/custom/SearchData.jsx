import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Search } from "lucide-react";

export default function SearchComponent({
  filterOptions,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  statusFilter,
  statusFilterOptions = [],
  setStatusFilter,
}) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  return (
    <div className="w-full mx-auto mb-3">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-x-2">
          <div className="relative w-full mr-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-3 md:-translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 border border-slate-700 w-full mb-2 md:mb-0 md:max-w-[30rem] lg:max-w-[35rem]"
            />
          </div>
          {statusFilterOptions?.length > 0 && (
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border border-slate-700 mb-2 md:mb-0">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                {statusFilterOptions?.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px] border border-slate-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions?.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
