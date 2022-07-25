import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import TabsToolbar from "../components/TabsToolbar"

export default function Home() {
  const { keycloak } = useKeycloak();

  return (
    <>
      <TabsToolbar />
    </>
  );
}
