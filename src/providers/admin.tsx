import { useState, useMemo, useEffect } from "react";
import AdminContext from "../context/admin";
import { useKeycloak } from "@react-keycloak/web";

interface AdminProviderProps {
  children: React.ReactNode;
}

function AdminProvider({ children }: AdminProviderProps) {
  const { keycloak } = useKeycloak();
  const hasAdminRole = keycloak.hasResourceRole("admin", "registry-web");
  const [admin, toggleAdmin] = useState(false);

  useEffect(() => {
    toggleAdmin(hasAdminRole);
  }, [hasAdminRole]);

  const value = useMemo(
    () => ({
      admin,
      toggleAdmin,
    }),
    [admin]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export default AdminProvider;
