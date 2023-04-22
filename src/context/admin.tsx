import { createContext } from "react";

interface AdminContextType {
  admin: boolean;
  toggleAdmin: (admin: boolean) => void;
}

const AdminContext = createContext<AdminContextType>({
  admin: false,
  toggleAdmin: () => {},
});

export default AdminContext;
