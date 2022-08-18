import { createTheme } from "@mui/material/styles";


const themeDarkDefault = createTheme({
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
        mode: 'dark',
        common: {
            black: '#003366',
            white: '#fff',
        },
        primary: {
            main: '#003366', 
            light: '#ccff33',
            dark: '#003366',
            contrastText: '#fff',
        },
        background: {
            default: '#003366',
            paper: '#003366',
          },
        secondary: { main: '#003366' }
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
})

export default themeDarkDefault

