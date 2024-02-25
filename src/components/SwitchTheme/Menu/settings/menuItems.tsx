import MenuItem from "antd/es/menu/MenuItem";
import { MenuProps as MenuAntProps } from "antd";
import { HiPresentationChartBar } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import pageName from "./pageName";
import systemInfo from "../../../../../package.json";

type MenuItem = Required<MenuAntProps>["items"][number];

export const menuItems: MenuItem[] = [
  {
    key: "home",
    label: pageName("home"),
    icon: <HiPresentationChartBar />,
  },
  {
    key: "logout",
    label: pageName("logout"),
    icon: <CiLogout />,
  },
  {
    key: "version",
    label: "v" + systemInfo.version,
    disabled: true,
    title: " Versão",
  },
];
