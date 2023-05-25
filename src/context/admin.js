import { createContext } from "react";

const AdminContext = createContext({
  admin: false,
  readOnlyAdmin: false,
  toggleReadOnlyAdmin: () => {},
  toggleAdmin: () => {}
});

export default AdminContext;
