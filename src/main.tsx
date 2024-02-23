import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./styles/globalStyles.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <h1>Production Cost</h1>
  </React.StrictMode>
);
