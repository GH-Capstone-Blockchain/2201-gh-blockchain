import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
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
  // button: {
  //   backgroundColor: "#3c52b2",
  //   color: "#fff",
  //   "&:hover": {
  //     backgroundColor: "#fff",
  //     color: "#3c52b2",
  //   },
  // },
});

export default theme;
