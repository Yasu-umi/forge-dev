import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./login/app";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("app"),
);
