import React, { useState } from "react";
import SearchContext from "../context/search";

function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const search = searchValue !== "" ? searchValue : null;

  return (
    <SearchContext.Provider value={{ search, searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
