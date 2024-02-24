import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { changeTheme } from "../../redux/themes/actions";

export default function SwitchTheme() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.themeReducer);

  return (
    <Switch
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined style={{ color: "yellow" }} />}
      style={{
        background: theme === "dark" ? "#6b6b6b" : "#58b3ce",
      }}
      checked={theme === "dark"}
      onChange={() => dispatch(changeTheme())}
    />
  );
}
