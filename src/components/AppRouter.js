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
  const isAdmin = keycloak.hasResourceRole("administrator");

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
              <Navigate to="/private-cloud/admin/dashboard/products" replace />
            ) : (
              <Navigate to="/private-cloud/user/dashboard/requests" replace />
            )
          }
        />
        <Route path="*" element={<NoMatch />} />
        <Route path="private-cloud">
          <Route
            path="admin"
            element={
              <RequireAuth roles={["administrator"]}>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route
              path="dashboard"
              element={
                <TabsToolbar
                  routes={[
                    "/private-cloud/admin/dashboard/requests",
                    "/private-cloud/admin/dashboard/products"
                  ]}
                  createButtonRoute={"/private-cloud/admin/create"}
                />
              }
            >
              <Route path="products" element={<AdminProjects />} />
              <Route path="requests" element={<AdminRequests />} />
            </Route>
            <Route
              path="product/:id"
              element={
                <AdminProject requestsRoute="/private-cloud/admin/dashboard/requests" />
              }
            />
            <Route path="request/:id" element={<AdminRequest />} />

            <Route
              path="create"
              element={
                <Create requestsRoute="/private-cloud/admin/dashboard/requests" />
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
                  routes={[
                    "/private-cloud/user/dashboard/requests",
                    "/private-cloud/user/dashboard/products"
                  ]}
                  createButtonRoute={"/private-cloud/user/create"}
                />
              }
            >
              <Route path="products" element={<UserProjects />} />
              <Route path="requests" element={<UserRequests />} />
            </Route>
            <Route
              path="product/:id"
              element={
                <Project requestsRoute="/private-cloud/admin/dashboard/requests" />
              }
            />
            <Route path="request/:id" element={<UserRequest />} />
            <Route
              path="create"
              element={
                <Create requestsRoute="/private-cloud/user/dashboard/requests" />
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
