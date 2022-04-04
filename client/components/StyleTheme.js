import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";


let theme = createTheme({
  palette: {
    primary: {
      light: "#c0ffff",
      main: "#8ddddd",
      dark: "#5babab",
      contrastText: "#051f2e",
    },
    secondary: {
      light: "#ffff7b",
      main: "#dbd949",
      dark: "#a6a808",
      contrastText: "#051f2e",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
