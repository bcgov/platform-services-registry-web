import React, { useState, useMemo } from "react";
import FilterContext from "../context/filter";

function FilterProvider({ children }) {
  const [ministry, setMinistry] = useState("");
  const [cluster, setCluster] = useState("");

  const filter = {
    ministry: ministry !== "" ? ministry : null,
    cluster: cluster !== "" ? cluster : null,
  };

  const value = useMemo(
    () => ({ filter, setMinistry, setCluster }),
    [filter, setMinistry, setCluster]
  );

  return (
    <FilterContext.Provider
      value={value}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
