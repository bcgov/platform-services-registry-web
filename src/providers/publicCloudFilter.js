import { useState, useMemo } from "react";
import FilterContext from "../context/publicCloudFilter";

function FilterProvider({ children }) {
  const [ministry, setMinistry] = useState("");
  const [provider, setProvider] = useState("");
  const [billingGroup, setBillingGroup] = useState("");

  const filter = {
    ministry: ministry !== "" ? ministry : null,
    provider: provider !== "" ? provider : null,
    billingGroup: billingGroup !== "" ? billingGroup : null
  };

  const value = useMemo(
    () => ({ filter, setProvider, setBillingGroup }),
    [filter]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export default FilterProvider;
