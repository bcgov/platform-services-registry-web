import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function RequireAuth({ roles, children }) {
  const location = useLocation();
  const { keycloak } = useKeycloak();

  const isAuthenticated = keycloak.authenticated;

  const isAuthorized = (roles) => {
    if (!Array.isArray(roles) || !roles.length) {
      return true;
    }

    if (keycloak && roles) {
      return roles.some((role) => {
        const realm = keycloak.hasRealmRole(role);
        const resource = keycloak.hasResourceRole(role);
        return realm || resource;
      });
    }
    return false;
  };

  if (!isAuthenticated || !isAuthorized(roles)) {
    console.log("Require Auth not Authenticated");
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
