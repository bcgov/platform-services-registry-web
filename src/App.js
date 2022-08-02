import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import DenseAppBar from "./components/AppBar";
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

const SIGN_UP = gql`
  mutation Mutation {
    signUp {
      id
      firstName
      lastName
    }
  }
`;

function App() {
  const {
    keycloak: { authenticated },
    initialized,
  } = useKeycloak();

  // Do this in app.js
  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  useEffect(() => {
    if (authenticated) {
      signUp();
    }
  }, [authenticated]);

  if (error)
    return `Sign up Error! ${error.message} authenticated: ${authenticated}`;

  return (
    <ThemeProvider theme={theme}>
      <UserProvider user={data}>
        <AdminProvider>
          <AppRouter />
        </AdminProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
