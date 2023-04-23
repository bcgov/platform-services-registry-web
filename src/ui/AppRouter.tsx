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
import NavLayout from "./Layouts/NavLayout";
import CloudTabs from "./Layouts/CloudTabsLayout";
// import LoadingSpinner from "./common/LoadingSpinner";
// import TabsToolbar from "./TabsToolbar"

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
const PrivateCloudProducts = () => (
  <Placeholder name="Private Cloud Products" />
);
const PrivateCloudRequeststs = () => (
  <Placeholder name="Private Cloud Requests" />
);

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

const PrivateCloudRoutes = () => (
  <RequireAuth roles={[]}>
    <Route path="products" element={<PrivateCloudProducts />} />
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
      <Route path="/" element={<NavLayout />}>
        <Route path="private-cloud" element={null}></Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
