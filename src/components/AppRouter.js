import React from "react";
import { Route, Routes, Navigate, Link, Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import RequireAuth from "./utilities/RequireAuth";
import Login from "../pages/Login";
import UserPrivateCloudProjects from "../pages/projects/privateCloud/UserProjects";
import UserRequests from "../pages/requests/UserRequests";
import AdminPrivateCloudProjects from "../pages/projects/privateCloud/AdminProjects";
import AdminPrivateCloudRequests from "../pages/requests/AdminRequests";
import AdminPrivateCloudProject from "../pages/project/privateCloud/AdminProject";
import AdminPrivateCloudRequest from "../pages/request/privateCloud/AdminRequest";
import AdminPublicCloudProjects from "../pages/projects/publicCloud/AdminProjects";
import AdminPublicCloudProject from "../pages/project/publicCloud/AdminProject";
import AdminPublicCloudRequest from "../pages/request/publicCloud/AdminRequest";
import UserPublicCloudProjects from "../pages/projects/publicCloud/UserProjects";
import UserPublicCloudProject from "../pages/project/publicCloud/Project";
import UserPublicCloudRequest from "../pages/request/publicCloud/UserRequest";
import UserPrivateCloudRequest from "../pages/request/privateCloud/UserRequest";
import PrivateCloudCreate from "../pages/create/PrivateCloudCreate";
import PublicCloudCreate from "../pages/create/PublicCloudCreate";
import UserPrivateCloudProject from "../pages/project/privateCloud/Project";
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

export const routesUser = [
  "/registry/user/dashboard/requests",
  "/registry/user/dashboard/private-cloud-products",
  "/registry/user/private-cloud/create",
  "/registry/user/dashboard/public-cloud-products",
  "/registry/user/public-cloud/create",
];

export const routesAdmin = [
  "/registry/admin/dashboard/requests",
  "/registry/admin/dashboard/private-cloud-products",
  "/registry/admin/private-cloud/create",
  "/registry/admin/dashboard/public-cloud-products",
  "/registry/admin/public-cloud/create",
];

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
        <Route path="registry">
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
              element={<TabsToolbar routes={routesAdmin} />}
            >
              <Route
                path="private-cloud-products"
                element={<AdminPrivateCloudProjects />}
              />
              <Route
                path="public-cloud-products"
                element={<AdminPublicCloudProjects />}
              />
              <Route path="requests" element={<AdminPrivateCloudRequests />} />
            </Route>
            <Route
              path="private-cloud/product/:id"
              element={
                <AdminPrivateCloudProject requestsRoute={routesAdmin[0]} />
              }
            />
            <Route
              path="private-cloud/request/:id"
              element={<AdminPrivateCloudRequest />}
            />
            <Route
              path="private-cloud/create"
              element={<PrivateCloudCreate requestsRoute={routesUser[0]} />}
            />
            <Route
              path="public-cloud/product/:id"
              element={
                <AdminPublicCloudProject requestsRoute={routesAdmin[0]} />
              }
            />
            <Route
              path="public-cloud/request/:id"
              element={<AdminPublicCloudRequest />}
            />
            <Route
              path="public-cloud/create"
              element={<PublicCloudCreate requestsRoute={routesAdmin[0]} />}
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
              <Route
                path="private-cloud-products"
                element={<UserPrivateCloudProjects />}
              />
              <Route
                path="public-cloud-products"
                element={<UserPublicCloudProjects />}
              />
              <Route path="requests" element={<UserRequests />} />
            </Route>
            <Route
              path="private-cloud/product/:id"
              element={
                <UserPrivateCloudProject requestsRoute={routesUser[0]} />
              }
            />
            <Route
              path="private-cloud/request/:id"
              element={<UserPrivateCloudRequest />}
            />
            <Route
              path="private-cloud/create"
              element={<PrivateCloudCreate requestsRoute={routesUser[0]} />}
            />
            <Route
              path="public-cloud/product/:id"
              element={<UserPublicCloudProject requestsRoute={routesUser[0]} />}
            />
            <Route
              path="public-cloud/request/:id"
              element={<UserPublicCloudRequest />}
            />
            <Route
              path="public-cloud/create"
              element={<PublicCloudCreate requestsRoute={routesUser[0]} />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
