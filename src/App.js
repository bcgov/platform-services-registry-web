import React from "react";
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
  return (
    <ThemeProvider theme={theme}>
      <AdminProvider>
        <div>
          <DenseAppBar title={"Platform Services Project Registry"} />
          <AppRouter />
          {/* <Footer /> */}
        </div>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
