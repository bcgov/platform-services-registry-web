import { createContext } from "react";

const AdminContext = createContext({
  admin: true,
  toggleAdmin: () => {},
});

export default AdminContext;
