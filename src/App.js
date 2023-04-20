import React, { useEffect, useState, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { AppRouter } from "./components/AppRouter";
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

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 15,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          ".Mui-disabled": {
            color: "rgba(0, 0, 0, 0.87) !important",
          },
          ".css-xy0qn3.Mui-disabled": {
            "-webkit-text-fill-color": "rgba(0, 0, 0, 0.87) !important",
          },
          ".css-1sl9rdz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
          {
            "-webkit-text-fill-color": "rgba(0, 0, 0, 0.87) !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          ".Mui-disabled": {
            color: "rgba(0, 0, 0, 0.87) !important",
          },
          ".css-xy0qn3.Mui-disabled": {
            "-webkit-text-fill-color": "rgba(0, 0, 0, 0.87) !important",
          },

          ".css-1sl9rdz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
          {
            "-webkit-text-fill-color": "rgba(0, 0, 0, 0.87) !important",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#003366",
    },
  },
});

export const ModeContext = createContext();

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
  theme.palette.mode = mode;

  useEffect(() => {
    theme.palette.mode = mode;
    localStorage.setItem("appMode", mode);
  }, [mode]);

  const toggleMode = (e) => {
    e.preventDefault();
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <ModeContext.Provider value={{ mode: mode, toggleMode: toggleMode }}>
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
      </ModeContext.Provider>
    </ThemeProvider>
  );
}
export default App;
