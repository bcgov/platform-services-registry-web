// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useKeycloak } from "@react-keycloak/web";
// import RequireAuth from "./utilities/RequireAuth";
// import Login from "../pages/Login";
// import UserProjects from "../pages/projects/UserProjects";
// import UserRequests from "../pages/requests/UserRequests";
// import AdminProjects from "../pages/projects/AdminProjects";
// import AdminRequests from "../pages/requests/AdminRequests";
// import Create from "../pages/Create";
// import Project from "../pages/Project";
// import Layout from "./Layout";
// import LoadingSpinner from "./common/LoadingSpinner";
// import TabsToolbar from "./TabsToolbar";

// export const AppRouter = () => {
//   const { initialized, keycloak } = useKeycloak();

//   if (!initialized) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/"
//         element={
//           <Navigate to="/registry/private-cloud/user/projects" replace />
//         }
//       />
//       <Route path="/registry/private-cloud" element={<Layout />}>
//         <Route
//           path="admin"
//           element={
//             <RequireAuth roles={["administrator"]}>
//               <TabsToolbar
//                 routes={[
//                   "/registry/private-cloud/admin/requests",
//                   "/registry/private-cloud/admin/projects",
//                 ]}
//                 createButtonRoute={"/registry/private-cloud/create"}
//               />
//             </RequireAuth>
//           }
//         >
//           <Route path="projects" element={<AdminProjects />} />
//           <Route path="requests" element={<AdminRequests />} />
//           <Route path="projects/:id" element={<Project />} />
//         </Route>
//         <Route
//           path="user"
//           element={
//             <RequireAuth>
//               <TabsToolbar
//                 routes={[
//                   "/registry/private-cloud/user/requests",
//                   "/registry/private-cloud/user/projects",
//                 ]}
//                 createButtonRoute={"/registry/private-cloud/create"}
//               />
//             </RequireAuth>
//           }
//         >
//           <Route path="projects" element={<UserProjects />} />
//           <Route path="requests" element={<UserRequests />} />
//           <Route path="projects/:id" element={<Project />} />
//         </Route>
//         <Route
//           path="create"
//           element={
//             <RequireAuth>
//               <Create />
//             </RequireAuth>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// };

import React from "react";
import { Route, Routes, Navigate, Link, Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import RequireAuth from "./utilities/RequireAuth";
import Login from "../pages/Login";
import UserProjects from "../pages/projects/UserProjects";
import UserRequests from "../pages/requests/UserRequests";
import AdminProjects from "../pages/projects/AdminProjects";
import AdminRequests from "../pages/requests/AdminRequests";
import Create from "../pages/Create";
import Project from "../pages/Project";
import Layout from "./Layout";
import LoadingSpinner from "./common/LoadingSpinner";
import TabsToolbar from "./TabsToolbar";

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/private-cloud/user/dashboard/projects">Go to the home page</Link>
      </p>
    </div>
  );
};

export const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Navigate to="/private-cloud/user/projects" replace />}
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
                    "/private-cloud/admin/dashboard/projects",
                  ]}
                  createButtonRoute={"/registry/private-cloud/create"}
                />
              }
            >
              <Route path="projects" element={<AdminProjects />} />
              <Route path="requests" element={<AdminRequests />} />
            </Route>

            <Route path="project/:id" element={<Project />} />
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
                    "/private-cloud/user/dashboard/projects",
                  ]}
                  createButtonRoute={"/registry/private-cloud/create"}
                />
              }
            >
              <Route path="projects" element={<UserProjects />} />
              <Route path="requests" element={<UserRequests />} />
            </Route>
            <Route path="project/:id" element={<Project />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
