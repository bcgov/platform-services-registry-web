import { useState, useMemo, useEffect } from "react";
import RolesContext from "../context/roles";
import { useKeycloak } from "@react-keycloak/web";

function AdminProvider({ children }) {
  const { keycloak } = useKeycloak();

  const hasAdminRole = keycloak.hasResourceRole("admin", "registry-web");
  const hasReadOnlyAdminRole = keycloak.hasResourceRole(
    "read-only-admin",
    "registry-web"
  );
  const hasFeatureTesterRole = keycloak.hasResourceRole(
    "feature-tester",
    "registry-web"
  );

  const [admin, toggleAdmin] = useState(false);
  const [readOnlyAdmin, toggleReadOnlyAdmin] = useState(false);
  const [featureTester, toggleFeatureTester] = useState(false);

  useEffect(() => {
    toggleAdmin(hasAdminRole);
  }, [hasAdminRole]);

  useEffect(() => {
    toggleReadOnlyAdmin(hasReadOnlyAdminRole);
  }, [hasReadOnlyAdminRole]);

  useEffect(() => {
    toggleFeatureTester(hasFeatureTesterRole);
  }, [hasFeatureTesterRole]);

  const value = useMemo(
    () => ({
      admin,
      readOnlyAdmin,
      featureTester,
      toggleReadOnlyAdmin,
      toggleAdmin,
      toggleFeatureTester,
    }),
    [admin, readOnlyAdmin, featureTester]
  );

  return (
    <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
  );
}

export default AdminProvider;
