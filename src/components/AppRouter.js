import React from "react";
import { Route, Routes } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import RequireAuth from "./Utilities/RequireAuth";

export const AppRouter = () => {
  const { initialized } = useKeycloak();
  if (!initialized) {
    return <h3>Loading ... </h3>;
  }
  return (
    <Routes>
      <Route>
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/"
          roles={[]}
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};
