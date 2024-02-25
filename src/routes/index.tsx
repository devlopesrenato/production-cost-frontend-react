import { Routes, Route } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { config } from "./config";
import menuItems from "../components/Menu/settings/menuItems";
import { Page } from "../styles/globalStyles";

const MainRoutes = () => {
  const [routes, setRoutes] = useState<RouterType[]>([]);
  const { currentUser } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (!currentUser) {
      setRoutes(config.filter((route) => !route.isPrivate));
    } else {
      const privateRoutes: RouterType[] = [];
      let defaultPage: RouterType = {
        path: "/",
        element: <></>,
        isPrivate: true,
      };

      const processRoute = (route: (typeof menuItems)[number]) => {
        if (route.element) {
          privateRoutes.push({
            path: route.key,
            element: route.element,
            isPrivate: true,
          });
          if (route.default) {
            defaultPage.element = route.element;
          }
        }
        if (route.children?.length) {
          route.children.forEach((childRoute) => {
            if (childRoute.element) {
              privateRoutes.push({
                path: childRoute.key,
                element: childRoute.element,
                isPrivate: true,
              });
              if (childRoute.default) {
                defaultPage.element = childRoute.element;
              }
            }
          });
        }
      };

      menuItems.forEach(processRoute);
      const allRoutes = [...config, ...privateRoutes, defaultPage];
      setRoutes(allRoutes.filter((route) => route.isPrivate));
    }
  }, [currentUser]);

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route
        key="*"
        path="*"
        element={
          !currentUser ?? (
            <Page>
              <h1>404 - Page not found 💔</h1>
              <p>
                The page you are looking for does not exist or has been removed.
              </p>
            </Page>
          )
        }
      />
    </Routes>
  );
};

export default memo(MainRoutes);
