import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { App } from "./App.jsx";
import { cookieDefaultOptions } from "./utils/constants.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={cookieDefaultOptions}>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
