import { useState } from "react";
import { AppRouter } from "./ui/AppRouter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AdminProvider from "./providers/admin";
import ReadOnlyAdminProvider from "./providers/readOnlyAdmin";
import { useKeycloak } from "@react-keycloak/web";
import { useQuery, gql } from "@apollo/client";
import UserProvider from "./providers/user";
import SearchProvider from "./providers/search";
import FilterProvider from "./providers/filter";
import SortProvider from "./providers/sort";

const ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

function App() {
  const {
    keycloak: { authenticated },
  } = useKeycloak();

  const { error, data } = useQuery(ME, { errorPolicy: "ignore" });
  const [mode, setMode] = useState(localStorage.getItem("appMode") || "light");

  return (
    <UserProvider user={{ ...data?.me }}>
      <SearchProvider>
        <FilterProvider>
          <SortProvider>
            <ReadOnlyAdminProvider>
              <AdminProvider>
                <AppRouter />
              </AdminProvider>
            </ReadOnlyAdminProvider>
          </SortProvider>
        </FilterProvider>
      </SearchProvider>
    </UserProvider>
  );
}
export default App;
