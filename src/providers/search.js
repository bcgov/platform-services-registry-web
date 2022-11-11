import React, { useState } from "react";
import SearchContext from "../context/search";
import useDebounce from "../hooks/useDebounce";

function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const search = searchValue !== "" ? searchValue : null;
  const debouncedSearch = useDebounce(search, 450);

  return (
    <SearchContext.Provider
      value={{ search, debouncedSearch, searchValue, setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
