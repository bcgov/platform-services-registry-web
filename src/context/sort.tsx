import { createContext } from "react";

interface SortContextValue {
  sortOrder: number;
  setSortOrder: React.Dispatch<React.SetStateAction<number>>;
}

const SortContext = createContext<SortContextValue | null>(null);

export default SortContext;
