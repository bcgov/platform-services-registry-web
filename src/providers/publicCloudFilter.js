import { useState, useMemo } from "react";
import FilterContext from "../context/publicCloudFilter";

function FilterProvider({ children }) {
  const [ministry, setMinistry] = useState("");
  const [provider, setProvider] = useState("");
  const [accountCoding, setAccountCoding] = useState("");

  const filter = {
    ministry: ministry !== "" ? ministry : null,
    provider: provider !== "" ? provider : null,
    accountCoding: accountCoding !== "" ? accountCoding : null
  };

  const value = useMemo(
    () => ({ filter, setProvider, setAccountCoding }),
    [filter]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export default FilterProvider;
