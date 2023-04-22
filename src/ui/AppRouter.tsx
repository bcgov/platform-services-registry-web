import React from "react";
import { Route, Routes, Navigate, Link, Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import RequireAuth from "./utilities/RequireAuth";
// import Login from "../pages/Login";
// import UserProjects from "../pages/projects/UserProjects";
// import UserRequests from "../pages/requests/UserRequests";
// import AdminProjects from "../pages/projects/AdminProjects";
// import AdminRequests from "../pages/requests/AdminRequests";
// import AdminProject from "../pages/project/AdminProject";
// import AdminRequest from "../pages/request/AdminRequest";
// import UserRequest from "../pages/request/UserRequest";
// import Create from "../pages/Create";
// import Project from "../pages/project/Project";
import Layout from "./Layout";
// import LoadingSpinner from "./common/LoadingSpinner";
// import TabsToolbar from "./TabsToolbar"

const routesUser = [
  "/private-cloud/user/dashboard/requests",
  "/private-cloud/user/dashboard/products",
  "/private-cloud/user/create",
];

const routesAdmin = [
  "/private-cloud/admin/dashboard/requests",
  "/private-cloud/admin/dashboard/products",
  "/private-cloud/admin/create",
];

interface PlaceholderProps {
  name: string;
}

const Placeholder = ({ name }: PlaceholderProps) => (
  <div>
    <h2>{name} Page</h2>
    <p>This is a placeholder for the {name} page.</p>
  </div>
);

const Login = () => <Placeholder name="Login" />;
const UserProjects = () => <Placeholder name="User Projects" />;
const UserRequests = () => <Placeholder name="User Requests" />;
const AdminProjects = () => <Placeholder name="Admin Projects" />;
const AdminRequests = () => <Placeholder name="Admin Requests" />;
const AdminProject = () => <Placeholder name="Admin Project" />;
const AdminRequest = () => <Placeholder name="Admin Request" />;
const UserRequest = () => <Placeholder name="User Request" />;
const Create = () => <Placeholder name="Create" />;
const Project = () => <Placeholder name="Project" />;
const LoadingSpinner = () => <Placeholder name="Loading Spinner" />;
const TabsToolbar = () => <Placeholder name="Tabs Toolbar" />;

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

const AdminRoutes = () => (
  <RequireAuth roles={["admin", "read-only-admin"]}>
    <Route path="products" element={<AdminProjects />} />
    <Route path="requests" element={<AdminRequests />} />
    <Route path="product/:id" element={<AdminProject />} />
    <Route path="request/:id" element={<AdminRequest />} />
    <Route path="create" element={<Create />} />
  </RequireAuth>
);

const UserRoutes = () => (
  <RequireAuth roles={[]}>
    <Route path="products" element={<UserProjects />} />
    <Route path="requests" element={<UserRequests />} />
    <Route path="product/:id" element={<Project />} />
    <Route path="request/:id" element={<UserRequest />} />
    <Route path="create" element={<Create />} />
  </RequireAuth>
);

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
          <Route path="admin" element={<AdminRoutes />} />
          <Route path="user" element={<UserRoutes />} />
        </Route>
      </Route>
    </Routes>
  );
};
