import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./styles/globalStyles.ts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Routes from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <Routes />
        <GlobalStyles />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
