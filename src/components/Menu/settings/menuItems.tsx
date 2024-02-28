import { HiPresentationChartBar } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import pageName, { getSystemPageNames } from "./pageName";
import systemInfo from "../../../../package.json";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import Categories from "../../../pages/registers/Categories";
import Home from "../../../pages/Home";

interface MenuItemRoute {
  element?: JSX.Element;
  label: string;
  key: string;
  icon?: JSX.Element;
  disabled?: boolean;
  title?: string;
  default?: boolean;
  children?: {
    label: string;
    key: string;
    element?: JSX.Element;
    default?: boolean;
  }[];
}

const menuItems: MenuItemRoute[] = [
  {
    label: pageName("home"),
    key: "home",
    icon: <HiPresentationChartBar />,
    element: <Home />,
    default: true,
  },
  {
    key: "registers",
    label: pageName("registers"),
    icon: <VscGitPullRequestNewChanges />,
    children: [
      {
        key: "registers/categories",
        label: pageName("registers/categories"),
        element: <Categories />,
      },
    ],
  },
  {
    key: "logout",
    label: getSystemPageNames("logout"),
    icon: <CiLogout />,
  },
  {
    key: "version",
    label: "v" + systemInfo.version,
    disabled: true,
    title: " Versão",
  },
];

export default menuItems;