import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      light: "#c4fcf7",
      main: "#8aded6",
      dark: "#95fff6",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ef9a9a",
      main: "#fdff7e",
      dark: "#fe6d73",
      contrastText: "#000",
    },
  },
});

export default theme;
