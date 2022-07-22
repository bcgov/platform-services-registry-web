import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import RequireAuth from "./Utilities/RequireAuth";
import Projects from "./Projects";
import Requests from "./Requests";
import NavTabs from "../pages/NavTabs";

export const AppRouter = () => {
  const { initialized } = useKeycloak();
  if (!initialized) {
    return <h3>Loading ... </h3>;
  }
  return (
    <Routes>
      <Route>
        <Route
          path="/"
          roles={[]}
          element={<Navigate to="/private-cloud/projects" replace />}
        />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="private-cloud/projects"
          roles={[]}
          element={
            <RequireAuth>
              <Projects />
            </RequireAuth>
          }
        />
        <Route
          path="private-cloud/requests"
          roles={[]}
          element={
            <RequireAuth>
              <Requests />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};
