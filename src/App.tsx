import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { notification, ConfigProvider } from "antd";

import Routes from "./routes";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { openNotification } from "./redux/notification/actions";

import { ThemeProvider } from "styled-components";
import GlobalStyles, { Description, Message } from "./styles/globalStyles";
import themes from "./styles/themes";
import { Menu } from "./components/Menu";

interface NotificationProps {
  title: string;
  message: string;
  type: "error" | "warning" | "info" | "success";
}

const App = () => {
  const theme = useAppSelector((state) => state.themeReducer.theme) as Theme;
  const { currentUser } = useAppSelector((state) => state.userReducer);
  const notificationData = useAppSelector((state) => state.notificationReducer);
  const notificationDuration = 5000;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notificationData?.message?.length) {
      showNotification(notificationData);
      resetNotification();
    }
  }, [notificationData]);

  const showNotification = ({ title, message, type }: NotificationProps) => {
    const options = {
      message: <Message>{title}</Message>,
      description: <Description>{message}</Description>,
      style: {
        color: themes[theme].colors.textColor,
        backgroundColor: themes[theme].colors.background,
        padding: "1rem 1.2rem",
        borderRadius: "var(--border-radius)",
        transition: "background 200ms, border 200ms",
        background: "rgba(78, 80, 88, 0.91)",
        border: "1px solid rgba(var(--card-border-rgb), 0.15)",
        textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        duration: notificationDuration,
      },
    };

    notification[type]({ ...options });
  };

  const resetNotification = () => {
    setTimeout(() => {
      dispatch(openNotification({ message: "", title: "", type: "success" }));
    }, 1000);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={themes[theme]}>
        <ConfigProvider
          theme={{
            token: {
              colorText: themes[theme].colors.textColor,
              colorBgContainer: themes[theme].colors.bgModal,
              colorBgBase: themes[theme].colors.bgModal,
            },
            components: {
              Modal: {
                contentBg: themes[theme].colors.bgModal,
                footerBg: themes[theme].colors.bgModal,
                headerBg: themes[theme].colors.bgModal,
                titleColor: themes[theme].colors.textColor,
                colorBgBase: themes[theme].colors.bgModal,
              },
            },
          }}
        >
          {!!currentUser && <Menu />}
          <GlobalStyles />
          <Routes />
        </ConfigProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
