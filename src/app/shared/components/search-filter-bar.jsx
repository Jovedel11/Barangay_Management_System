import { Search, Plus, Download, RefreshCw } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  filters = [],
  onAdd,
  onExport,
  onRefresh,
  addButtonText = "Add New",
  searchPlaceholder = "Search...",
  showAddButton = true,
  showExportButton = true,
  showRefreshButton = true,
  className = "",
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      {filters.map((filter, index) => (
        <Select
          key={index}
          value={filter.value}
          onValueChange={filter.onChange}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {showRefreshButton && (
          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
        {showExportButton && (
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
        {showAddButton && (
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
