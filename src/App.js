import React, { useEffect, useState, createContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import themeDefault from './providers/themeDefault'
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



export const ModeContext = createContext()

function App() {
  const SIGN_UP = gql`
  mutation Mutation {
    signUp {
      id
      firstName
      lastName
    }
  }
`;

  const [mode, setMode] = useState(localStorage.getItem('appMode') || 'light')
  themeDefault.palette.mode = mode

  useEffect(() => {
    themeDefault.palette.mode = mode
    localStorage.setItem('appMode', mode)
  }, [mode])

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

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
    <ThemeProvider theme={themeDefault}>
      <ModeContext.Provider value={{ mode: mode, toggleMode: toggleMode }}>
        <UserProvider user={data}>
          <AdminProvider>
            <AppRouter />
          </AdminProvider>
        </UserProvider>
      </ModeContext.Provider>
    </ThemeProvider>
  )
}
export default App;