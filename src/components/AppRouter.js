import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import RequireAuth from "./utilities/RequireAuth";
import Projects from "./Projects";
import Requests from "./Requests";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const AppRouter = () => {
  const { initialized } = useKeycloak();
  if (!initialized) {
    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <CircularProgress
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    );
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
