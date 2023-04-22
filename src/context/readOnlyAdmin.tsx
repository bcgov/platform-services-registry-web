import { createContext } from "react";

interface ReadOnlyAdminContextValue {
  readOnlyAdmin: boolean;
  toggleReadOnlyAdmin: (value: boolean) => void;
}

const ReadOnlyAdminContext = createContext<ReadOnlyAdminContextValue>({
  readOnlyAdmin: false,
  toggleReadOnlyAdmin: () => {},
});

export default ReadOnlyAdminContext;
