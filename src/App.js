import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import DenseAppBar from "./components/AppBar";
import { AppRouter } from "./components/AppRouter";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Footer from "./components/Common/Footer";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
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
      <div>
        <DenseAppBar title={"Platform Services Project Registry"} />
        <AppRouter />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
