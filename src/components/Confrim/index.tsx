import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import themes from "../../styles/themes";
import React from "react";
import { LegacyButtonType } from "antd/es/button/button";
import { useAppSelector } from "../../redux/hooks";

interface ConfirmProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  ok: () => Promise<void>;
  oktype?: LegacyButtonType | undefined;
  children: React.ReactNode;
}

const Confirm: React.FC<ConfirmProps> = ({
  title,
  ok,
  oktype,
  message,
  icon = <ExclamationCircleFilled />,
  children,
}) => {
  const theme = useAppSelector((state) => state.themeReducer.theme) as Theme;
  const styles = {
    backgroundColor: themes[theme].colors.bgModal,
    color: themes[theme].colors.textColor,
  };
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: <h4 style={styles}>{title}</h4>,
      icon,
      content: <p style={styles}>{message}</p>,
      okText: "Yes",
      okType: oktype || "danger",
      cancelText: "No",
      async onOk() {
        ok && await ok();
      },
      styles: {
        content: styles,
        header: styles,
        body: styles,
      },
    });
  };

  return <div onClick={showDeleteConfirm}>{children}</div>;
};

export default Confirm;
