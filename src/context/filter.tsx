import { createContext } from "react";
import { Interface } from "readline";

interface FilterContextValue {
  filter: {
    ministry: string | null;
    cluster: string | null;
  };
  setMinistry: (ministry: string) => void;
  setCluster: (cluster: string) => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export default FilterContext;
