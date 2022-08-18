import {  createTheme } from "@mui/material/styles";


const themeDefault = createTheme({
    keys: [
 "xs",
"sm",
"md",
"lg",
"xl",],
values:{ 
xs: 0,
sm: 600,
md: 900,
lg: 1200,
xl: 1536,},
// up: f g()
// down: f h()
// between: f b()
// only: f only()
// not: f not()
// unit: "px"
// direction: "ltr"
// components: Object

    palette: {
        common: {
black: '#00cc00',
white: '#fff',
},
      primary: {
        main: '#003366', //green
light: '#ccff33', //blue
dark: '#000',//yellow
contrastText: '#00cc00',
      },
      secondary:{ main: '#003366'}
    },
    typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    }
  })

  export default  themeDefault



// primary: Object
// main: 
// #1976d2
// light: 
// #42a5f5
// dark: 
// #1565c0
// contrastText: 
// #fff
// secondary: Object
// main: 
// #9c27b0
// light: 
// #ba68c8
// dark: 
// #7b1fa2
// contrastText: 
// #fff
// error: Object
// main: 
// #d32f2f
// light: 
// #ef5350
// dark: 
// #c62828
// contrastText: 
// #fff
// warning: Object
// main: 
// #ed6c02
// light: 
// #ff9800
// dark: 
// #e65100
// contrastText: 
// #fff
// info: Object
// main: 
// #0288d1
// light: 
// #03a9f4
// dark: 
// #01579b
// contrastText: 
// #fff
// success: Object
// main: 
// #2e7d32
// light: 
// #4caf50
// dark: 
// #1b5e20
// contrastText: 
// #fff
// grey: Object
// 50: 
// #fafafa
// 100: 
// #f5f5f5
// 200: 
// #eeeeee
// 300: 
// #e0e0e0
// 400: 
// #bdbdbd
// 500: 
// #9e9e9e
// 600: 
// #757575
// 700: 
// #616161
// 800: 
// #424242
// 900: 
// #212121
// A100: 
// #f5f5f5
// A200: 
// #eeeeee
// A400: 
// #bdbdbd
// A700: 
// #616161
// contrastThreshold: 3
// getContrastText: f E()
// augmentColor: f R()
// tonalOffset: 0.2
// text: Object
// primary: 
// rgba(0, 0, 0, 0.87)
// secondary: 
// rgba(0, 0, 0, 0.6)
// disabled: 
// rgba(0, 0, 0, 0.38)
// divider: 
// rgba(0, 0, 0, 0.12)
// background: Object
// paper: 
// #fff
// default: 
// #fff
// action: Object
// active: 
// rgba(0, 0, 0, 0.54)
// hover: 
// rgba(0, 0, 0, 0.04)
// hoverOpacity: 0.04
// selected: 
// rgba(0, 0, 0, 0.08)
// selectedOpacity: 0.08
// disabled: 
// rgba(0, 0, 0, 0.26)
// disabledBackground: 
// rgba(0, 0, 0, 0.12)
// disabledOpacity: 0.38
// focus: 
// rgba(0, 0, 0, 0.12)
// focusOpacity: 0.12
// activatedOpacity: 0.12
// spacing: f a()
// mui: true
// shape: Object
// borderRadius: 4
// mixins: Object
// toolbar: Object
// minHeight: 56
// @media (min-width:0px): Object
// @media (orientation: landscape): Object
// minHeight: 48
// @media (min-width:600px): Object
// minHeight: 64
// shadows: Array(25)
// 0: "none"
// 1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
// 2: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
// 3: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)"
// 4: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
// 5: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)"
// 6: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"
// 7: "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)"
// 8: "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)"
// 9: "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)"
// 10: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)"
// 11: "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)"
// 12: "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)"
// 13: "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)"
// 14: "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)"
// 15: "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)"
// 16: "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)"
// 17: "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)"
// 18: "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)"
// 19: "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)"
// 20: "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)"
// 21: "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)"
// 22: "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)"
// 23: "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)"
// 24: "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
// typography: Object
// htmlFontSize: 16
// pxToRem: f ()
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontSize: 14
// fontWeightLight: 300
// fontWeightRegular: 400
// fontWeightMedium: 500
// fontWeightBold: 700
// h1: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 300
// fontSize: "6rem"
// lineHeight: 1.167
// letterSpacing: "-0.01562em"
// h2: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 300
// fontSize: "3.75rem"
// lineHeight: 1.2
// letterSpacing: "-0.00833em"
// h3: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "3rem"
// lineHeight: 1.167
// letterSpacing: "0em"
// h4: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "2.125rem"
// lineHeight: 1.235
// letterSpacing: "0.00735em"
// h5: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "1.5rem"
// lineHeight: 1.334
// letterSpacing: "0em"
// h6: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 500
// fontSize: "1.25rem"
// lineHeight: 1.6
// letterSpacing: "0.0075em"
// subtitle1: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "1rem"
// lineHeight: 1.75
// letterSpacing: "0.00938em"
// subtitle2: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 500
// fontSize: "0.875rem"
// lineHeight: 1.57
// letterSpacing: "0.00714em"
// body1: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "1rem"
// lineHeight: 1.5
// letterSpacing: "0.00938em"
// body2: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "0.875rem"
// lineHeight: 1.43
// letterSpacing: "0.01071em"
// button: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 500
// fontSize: "0.875rem"
// lineHeight: 1.75
// letterSpacing: "0.02857em"
// textTransform: "uppercase"
// caption: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "0.75rem"
// lineHeight: 1.66
// letterSpacing: "0.03333em"
// overline: Object
// fontFamily: ""Roboto", "Helvetica", "Arial", sans-serif"
// fontWeight: 400
// fontSize: "0.75rem"
// lineHeight: 2.66
// letterSpacing: "0.08333em"
// textTransform: "uppercase"
// transitions: Object
// getAutoHeightDuration: f p()
// create: f create()
// easing: Object
// easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)"
// easeOut: "cubic-bezier(0.0, 0, 0.2, 1)"
// easeIn: "cubic-bezier(0.4, 0, 1, 1)"
// sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
// duration: Object
// shortest: 150
// shorter: 200
// short: 250
// standard: 300
// complex: 375
// enteringScreen: 225
// leavingScreen: 195
// zIndex: Object
// mobileStepper: 1000
// fab: 1050
// speedDial: 1050
// appBar: 1100
// drawer: 1200
// modal: 1300
// snackbar: 1400
// tooltip: 1500

