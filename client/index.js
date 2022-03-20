import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/StyleTheme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
