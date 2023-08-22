import { useState, useMemo, useEffect } from "react";
import FilterContext from "../context/publicCloudFilter";

function FilterProvider({ children }) {
  const [ministry, setMinistry] = useState("");
  // const [provider, setProvider] = useState("");

  const filter = {
    ministry: ministry !== "" ? ministry : null,
    // provider: provider !== "" ? provider : null,
  };

  const value = useMemo(
    () => ({ filter, setMinistry, }),
    [filter, setMinistry]
  );

  return (
    <FilterContext.Provider
      value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
