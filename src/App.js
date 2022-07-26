import React, { useEffect, useState, createContext } from "react";
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

export const ModeContext = createContext()

function App() {

  const [mode, setMode] = useState(localStorage.getItem('appMode') || 'light')
  theme.palette.mode = mode

  useEffect(() => {
    theme.palette.mode = mode
  }, [mode])

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={theme}>
      <ModeContext.Provider value={{ mode: mode, toggleMode: toggleMode }}>
        <AdminProvider>
          <div>
            <DenseAppBar
            />
            <AppRouter />
            {/* <Footer /> */}
          </div>
        </AdminProvider>
      </ModeContext.Provider>
    </ThemeProvider>
  );
}

export default App;