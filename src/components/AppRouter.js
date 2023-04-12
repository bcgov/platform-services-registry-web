import React from "react";
import { Route, Routes, Navigate, Link, Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import RequireAuth from "./utilities/RequireAuth";
import Login from "../pages/Login";
import UserProjects from "../pages/projects/UserProjects";
import UserRequests from "../pages/requests/UserRequests";
import AdminProjects from "../pages/projects/AdminProjects";
import AdminRequests from "../pages/requests/AdminRequests";
import AdminProject from "../pages/project/AdminProject";
import AdminRequest from "../pages/request/AdminRequest";
import UserRequest from "../pages/request/UserRequest";
import Create from "../pages/Create";
import Project from "../pages/project/Project";
import Layout from "./Layout";
import LoadingSpinner from "./common/LoadingSpinner";
import TabsToolbar from "./TabsToolbar";
import {routesUser, routesAdmin} from "./common/Constants";
const NoMatch = () => {
  return (
    <div style={{ marginLeft: 24, marginTop: 20 }}>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export const AppRouter = () => {
  const { initialized, keycloak } = useKeycloak();
  const isAdmin =
    keycloak.hasResourceRole("admin") ||
    keycloak.hasResourceRole("read-only-admin");

  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            isAdmin ? (
              <Navigate to={routesAdmin[1]} replace />
            ) : (
              <Navigate to={routesUser[1]} replace />
            )
          }
        />
        <Route path="*" element={<NoMatch />} />
        <Route path="private-cloud">
          <Route
            path="admin"
            element={
              <RequireAuth roles={["admin", "read-only-admin"]}>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route
              path="dashboard"
              element={
                <TabsToolbar
                  routes={routesAdmin}
                />
              }
            >
              <Route path="products" element={<AdminProjects />} />
              <Route path="requests" element={<AdminRequests />} />
            </Route>
            <Route
              path="product/:id"
              element={
                <AdminProject requestsRoute={routesAdmin[0]} />
              }
            />
            <Route path="request/:id" element={<AdminRequest />} />

            <Route
              path="create"
              element={
                <Create requestsRoute={routesAdmin[0]} />
              }
            />
          </Route>
          <Route
            path="user"
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route
              path="dashboard"
              element={
                <TabsToolbar
                  routes={routesUser}
                  createButtonRoute={routesUser[2]}
                />
              }
            >
              <Route path="products" element={<UserProjects />} />
              <Route path="requests" element={<UserRequests />} />
            </Route>
            <Route
              path="product/:id"
              element={
                <Project requestsRoute={routesUser[0]} />
              }
            />
            <Route path="request/:id" element={<UserRequest />} />
            <Route
              path="create"
              element={
                <Create requestsRoute={routesUser[0]} />
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
