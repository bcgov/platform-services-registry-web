import React, { useCallback } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import LoginOld from "./LoginOld";

function Login() {
  let location = useLocation();
  const { keycloak } = useKeycloak();

  const currentLocationState = location.state || {
    from: { pathname: "/" },
  };

  const loginHandler = useCallback(() => {
    keycloak?.login({ idpHint: "idir" });
  }, [keycloak]);

  if (keycloak?.authenticated) {
    return <Navigate to={currentLocationState?.from} />;
  }

  return <LoginOld />;
}

export default Login;
