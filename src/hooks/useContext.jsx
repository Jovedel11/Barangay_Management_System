import { createContext, useContext, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const SearchContext = createContext(null);

const ThesisQuery = ({ children }) => {
  const [search, setSearch] = useState < string > "";
  const debounceSearch = useDebounce(search);

  return (
    <SearchContext.Provider value={{ search, setSearch, debounceSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchThesis = () => {
  const ctx = useContext(SearchContext);
  if (!ctx)
    throw new Error("useSearchThesis must be used within an AuthProvider");
  return ctx;
};

export { useSearchThesis, ThesisQuery };
