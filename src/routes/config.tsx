import Home from "../pages/Home";
import Login from "../pages/Login";

export const config: RouterType[] = [
  {
    path: "*",
    element: <Login />,
  },
  {
    path: "/",
    isPrivate: true,
    element: <Home />,
  },
];
