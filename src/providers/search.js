import React, { useState, useCallback } from "react";
import SearchContext from "../context/search";

function SearchProvider({ children }) {
  const [search, setSearch] = useState(null);

  // const setSearchValue = useCallback(
  //   (value) => {
  //     setSearch(value);
  //   },
  //   [search]
  // );

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
