import { useState, useMemo } from "react";
import SortContext from "../context/sort";

interface SortProviderProps {
  children: React.ReactNode;
}

function SortProvider({ children }: SortProviderProps) {
  const [sortOrder, setSortOrder] = useState(1);

  const value = useMemo(
    () => ({ sortOrder, setSortOrder }),
    [sortOrder, setSortOrder]
  );

  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
}

export default SortProvider;
