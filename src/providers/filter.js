import React, { useState } from "react";
import FilterContext from "../context/filter";

function FilterProvider({ children }) {
  const [ministry, setMinistry] = useState("");
  const [cluster, setCluster] = useState("");

  const filter = {
    ministry: ministry !== "" ? ministry : null,
    cluster: cluster !== "" ? cluster : null,
  }

  return (
    <FilterContext.Provider
      value={{ ministry , setMinistry, cluster, setCluster, filter }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
