import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Page not found - 404</h1>,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
