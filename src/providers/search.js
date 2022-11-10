import React, { useState } from "react";
import SearchContext from "../context/search";

function SearchProvider({ children }) {
  const [search, setSearch] = useState(undefined);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
