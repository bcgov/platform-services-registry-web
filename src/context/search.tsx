import { createContext } from "react";

interface SearchContextValue {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearch: string | null;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export default SearchContext;
