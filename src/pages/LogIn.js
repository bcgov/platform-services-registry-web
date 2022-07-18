import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function LogIn() {
  let location = useLocation();
  const { keycloak } = useKeycloak();

  const currentLocationState = location.state || {
    from: { pathname: '/' },
  }  

  if (keycloak?.authenticated) {
    return <Navigate to={currentLocationState?.from} />
  }

  return; // LogIn page - can put old login page here (use this as a hoc)
}

export default LogIn;
