import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      light: "#80deea",
      main: "#0097a7",
      dark: "#00838f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ef9a9a",
      main: "#fe6d73",
      dark: "#fe6d73",
      contrastText: "#000",
    },
  },
});

export default theme;
