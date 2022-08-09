import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RequireAuth from "./utilities/RequireAuth";
import Projects from "../pages/Projects";
import Requests from "../pages/Requests";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Create from "../pages/Create";
import Project from "../pages/Project";
import { useMutation, gql } from "@apollo/client";
import DenseAppBar from "./AppBar";
import Layout from "./Layout";
import LoadingSpinner from "./common/LoadingSpinner";

export const AppRouter = () => {
  const { initialized } = useKeycloak();

  if(!initialized) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path="/"
          roles={[]}
          element={<Navigate to="/private-cloud/projects" replace />}
        />
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
        <Route
          path="private-cloud/create"
          roles={[]}
          element={
            <RequireAuth>
              <Create />
            </RequireAuth>
          }
        />
        <Route
          path="private-cloud/project"
          roles={[]}
          element={
            <RequireAuth>
              <Project />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};