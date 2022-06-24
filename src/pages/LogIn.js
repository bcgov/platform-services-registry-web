import React, { useCallback } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function LogIn() {
  // let navigate = useNavigate();
  let location = useLocation();
  const { keycloak } = useKeycloak();

  const currentLocationState = location.state || {
    from: { pathname: '/' },
  }  

  const login = useCallback(() => {
    keycloak?.login({ idpHint: "idir" });

  }, [keycloak]);

  if (keycloak?.authenticated) {
    return <Navigate to={currentLocationState?.from} />
  }

  return (
    <div>
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default LogIn;
