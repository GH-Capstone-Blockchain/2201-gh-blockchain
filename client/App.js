import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routers from "./Routes";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/StyleTheme";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routers />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
