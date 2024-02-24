import Home from "../pages/Home";
import Login from "../pages/Login";

export const config: RouterType[] = [
  {
    path: "*",
    element: <Login />,
  },
  {
    path: "/home",
    isPrivate: true,
    element: <Home />,
  },
];
