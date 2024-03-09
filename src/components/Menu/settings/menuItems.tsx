import { CiLogout } from "react-icons/ci";
import { HiPresentationChartBar } from "react-icons/hi";
import { LuPackageCheck } from "react-icons/lu";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

import systemInfo from "../../../../package.json";
import pageName, { getSystemPageNames } from "./pageName";

import Categories from "../../../pages/registers/Categories";
import Home from "../../../pages/Home";
import CustomMeasurements from "../../../pages/registers/CustomMeasurements";
import Feedstock from "../../../pages/registers/Feedstock";
import OtherCosts from "../../../pages/registers/OtherCosts";
import Productions from "../../../pages/Productions";


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
      {
        key: "registers/custom-measurements",
        label: pageName("registers/custom-measurements"),
        element: <CustomMeasurements />,
      },
      {
        key: "registers/feedstocks",
        label: pageName("registers/feedstocks"),
        element: <Feedstock />,
      },
      {
        key: "registers/other-costs",
        label: pageName("registers/other-costs"),
        element: <OtherCosts />,
      },
    ],
  },
  {
    key: "productions",
    label: pageName("productions"),
    icon: <LuPackageCheck />,
    element: <Productions />,
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
