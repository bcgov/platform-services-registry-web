import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import NavTabs from "./NavTabs"

export default function Home() {
  const { keycloak } = useKeycloak();

  return (
    <>
      <NavTabs />
    </>
  );
}
