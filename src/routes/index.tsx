import { Routes, Route } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { config } from "./config";

const MainRoutes = () => {
  const [routes, setRoutes] = useState<RouterType[]>([]);
  const { currentUser } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    setRoutes(
      currentUser
        ? config.filter(({ isPrivate }) => isPrivate)
        : config.filter(({ isPrivate }) => !isPrivate)
    );
  }, [currentUser]);
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default memo(MainRoutes);
