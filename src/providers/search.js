import React, { useState } from "react";
import SearchContext from "../context/search";

function SearchProvider({ children }) {
  const [search, setSearch] = useState(null);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
