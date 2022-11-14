import React, { useState, useMemo } from "react";
import SearchContext from "../context/search";
import useDebounce from "../hooks/useDebounce";

function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const search = searchValue !== "" ? searchValue : null;
  const debouncedSearch = useDebounce(search, 450);

  const value = useMemo(
    () => ({ searchValue, setSearchValue, debouncedSearch }),
    [searchValue, setSearchValue, debouncedSearch]
  );

  return (
    <SearchContext.Provider
      value={value}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
