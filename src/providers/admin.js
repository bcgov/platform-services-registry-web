import React, { useState, useMemo, useEffect } from "react";
import AdminContext from "../context/admin";
import { useKeycloak } from "@react-keycloak/web";

function AdminProvider({ children }) {
  const { keycloak } = useKeycloak();
  const hasAdminRole = keycloak.hasResourceRole("admin", "registry-web");
  const hasReadOnlyAdminRole = keycloak.hasResourceRole(
    "read-only-admin",
    "registry-web"
  );
  const [admin, toggleAdmin] = useState(false);
  const [readOnlyAdmin, toggleReadOnlyAdmin] = useState(false);

  useEffect(() => {
    toggleAdmin(hasAdminRole);
  }, [hasAdminRole]);

  useEffect(() => {
    toggleReadOnlyAdmin(hasReadOnlyAdminRole);
  }, [hasReadOnlyAdminRole]);

  const value = useMemo(
    () => ({
      admin,
      readOnlyAdmin,
      toggleReadOnlyAdmin,
      toggleAdmin
    }),
    [admin, readOnlyAdmin]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export default AdminProvider;
