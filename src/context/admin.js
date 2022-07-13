import { createContext } from "react";

const AdminContext = createContext({
  admin: false,
  toggleAdmin: () => {},
});

export default AdminContext;
