import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import DenseAppBar from "./components/AppBar";
import { AppRouter } from "./components/AppRouter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import Footer from "./components/Footer";
import AdminProvider from "./providers/admin";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
  tablecell: {
    fontSize: "200px"
  },
  palette: {
    primary: {
      main: "#003366",
    },
  },
});

function App() {
  const [mode, setMode] = useState(localStorage.getItem('appMode') || 'light')
  theme.palette.mode = mode

  useEffect(() => {
    theme.palette.mode = mode
    console.log(mode)
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <AdminProvider>
        <div>
          <DenseAppBar
            title={"Platform Services Project Registry"}
            setMode={setMode}
          />
          <AppRouter />
          {/* <Footer /> */}
        </div>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
