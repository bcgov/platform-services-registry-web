import React, { useEffect, useState, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { AppRouter } from "./components/AppRouter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer";
import AdminProvider from "./providers/admin";
import { useKeycloak } from "@react-keycloak/web";
import { useMutation, gql } from "@apollo/client";
import UserProvider from "./providers/user";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
  tablecell: {
    fontSize: "200px",
  },
  palette: {
    primary: {
      main: "#003366",
    },
  },
});

export const ModeContext = createContext();

const SIGN_UP = gql`
  mutation Mutation {
    signUp {
      id
      firstName
      lastName
      githubId
    }
  }
`;

function App() {
  const {
    keycloak: { authenticated },
    initialized,
  } = useKeycloak();

  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  useEffect(() => {
    if (authenticated) {
      signUp();
    }
  }, [authenticated]);

  const [mode, setMode] = useState(localStorage.getItem("appMode") || "light");
  theme.palette.mode = mode;

  useEffect(() => {
    theme.palette.mode = mode;
    localStorage.setItem("appMode", mode);
  }, [mode]);

  const toggleMode = (e) => {
    e.preventDefault()
    setMode(mode === "light" ? "dark" : "light");
  };

  if (error)
    return `Sign up Error! ${error.message} authenticated: ${authenticated}`;

  return (
    <ThemeProvider theme={theme}>
      <ModeContext.Provider value={{ mode: mode, toggleMode: toggleMode }}>
        <UserProvider user={data?.signUp}>
          <AdminProvider>
            <AppRouter />
          </AdminProvider>
        </UserProvider>
      </ModeContext.Provider>
    </ThemeProvider>
  );
}
export default App;
