import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import Routes from "./routes";
import { useAppSelector } from "./redux/hooks";
import themes from "./styles/themes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <BrowserRouter>
      <ThemeProvider theme={themes[theme as Theme]}>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
