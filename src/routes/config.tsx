import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const config: RouterType[] = [
  {
    path: "*",
    element: <Login />,
  },
  {
    path: "*",
    element: <App />,
    isPrivate: true,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];
