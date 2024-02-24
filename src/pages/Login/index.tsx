import { useAppSelector } from "../../redux/hooks";
import { Container, Logo, Global, Title } from "./styled";
import SwitchTheme from "../../components/SwitchTheme";

const Login = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <Global.Page>
      <Container>
        <Logo src={`/logo-${theme}.png`} alt="Logotipo Production Cost" />
        <Title>Login</Title>
        <SwitchTheme />
      </Container>
    </Global.Page>
  );
};

export default Login;
