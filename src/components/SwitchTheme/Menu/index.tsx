import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Menu as MenuAnt, MenuProps as MenuAntProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import pageName, { pageNames } from "./settings/pageName";
import { menuItems } from "./settings/menuItems";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/user/actions";
import { MenuBackground, NavBar, NavBarMenu } from "./styled";
import { Title } from "./styled";
import SwitchTheme from "..";

export const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(["home"]);
  const [title, setTitle] = useState("home");
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onClick: MenuAntProps["onClick"] = (e) => {
    if (e.key === "logout") {
      dispatch(setUser({}));
      return;
    }
    setCurrent(e.keyPath);
    setCollapsed(false);
    setTitle(pageName(e.key as keyof typeof pageNames));
    navigate(e.key);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname) {
      const fullPath = pathname.slice(1, pathname.length);
      setTitle(pageName(fullPath as keyof typeof pageNames));
      const mainPath = fullPath.split("/")[0];
      setCurrent([fullPath || "home", mainPath]);
    }
  }, []);

  return (
    <>
      <NavBar>
        <NavBarMenu>
          <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Title>{title}</Title>
        </NavBarMenu>
        <SwitchTheme />
      </NavBar>
      {collapsed && (
        <>
          <MenuAnt
            theme="dark"
            onClick={onClick}
            style={{
              width: 256,
              top: "40px",
              position: "fixed",
              zIndex: 1001,
            }}
            defaultOpenKeys={current}
            selectedKeys={current}
            mode="inline"
            items={menuItems}
          />
          <MenuBackground onClick={() => setCollapsed(!collapsed)} />
        </>
      )}
    </>
  );
};
