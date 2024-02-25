import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import Routes from "./routes";
import { useAppSelector } from "./redux/hooks";
import themes from "./styles/themes";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "./components/SwitchTheme/Menu";

const App = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const { currentUser } = useAppSelector((state) => state.userReducer);
  return (
    <BrowserRouter>
      <ThemeProvider theme={themes[theme as Theme]}>
        {!!currentUser && <Menu />}        
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
