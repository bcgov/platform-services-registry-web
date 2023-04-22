import { useState, useMemo, useEffect } from "react";
import ReadOnlyAdminContext from "../context/readOnlyAdmin";
import { useKeycloak } from "@react-keycloak/web";

interface ReadOnlyAdminProviderProps {
  children: React.ReactNode;
}

function ReadOnlyAdminProvider({ children }: ReadOnlyAdminProviderProps) {
  const { keycloak } = useKeycloak();
  const hasReadOnlyAdminRole = keycloak.hasResourceRole(
    "read-only-admin",
    "registry-web"
  );
  const [readOnlyAdmin, toggleReadOnlyAdmin] = useState(false);

  useEffect(() => {
    toggleReadOnlyAdmin(hasReadOnlyAdminRole);
  }, [hasReadOnlyAdminRole]);

  const value = useMemo(
    () => ({
      readOnlyAdmin,
      toggleReadOnlyAdmin,
    }),
    [readOnlyAdmin]
  );

  return (
    <ReadOnlyAdminContext.Provider value={value}>
      {children}
    </ReadOnlyAdminContext.Provider>
  );
}

export default ReadOnlyAdminProvider;
