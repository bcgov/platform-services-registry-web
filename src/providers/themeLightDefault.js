import { createTheme } from "@mui/material/styles";


const themeLightDefault = createTheme({
  keys: [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  palette: {
    mode: 'light',
    common: {
      black: '#00cc00',
      white: '#fff',
    },
    primary: {
      main: '#003366',
      light: '#fff',
      dark: '#000',
    },
    background: {
      default: '#F2F2F2',
      paper: '#F2F2F2',
    },
    secondary: { main: '#003366' }
  },
  typography: {
    fontFamily: 'Quicksand',
    // fontFamily: ['BCSans', 'Noto Sans', 'Verdana', 'Arial', 'sans-serif'],
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

export default themeLightDefault

