import { createContext } from "react";

const ReadOnlyAdminContext = createContext({
    readOnlyAdmin: false,
    toggleReadOnlyAdmin: () => {},
});

export default ReadOnlyAdminContext;
