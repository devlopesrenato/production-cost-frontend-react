import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Container, Logo, Global, Title, Header } from "./styled";
import SwitchTheme from "../../components/SwitchTheme";
import { Form } from "antd";
import { useState } from "react";
import { login } from "./service";
import { setUser } from "../../redux/user/actions";
import { Input, InputPassword } from "../../components/Input";
import Button from "../../components/Button";

interface LoginFields {
  user: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { theme } = useAppSelector((state) => state.themeReducer);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleLogin = async (values: LoginFields) => {
    setLoading(true);
    try {
      const response = await login(values);
      switch (response.status) {
        case 401:
          form.setFields([
            { name: "user", errors: [" "] },
            { name: "password", errors: [response.data.error] },
          ]);
          break;

        case 200:
          dispatchSetUser(response.data);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const dispatchSetUser = (data: {
    id: string;
    name: string;
    token: string;
  }) => {
    dispatch(setUser(data));
  };

  return (
    <>
      <Header>
        <SwitchTheme />
      </Header>
      <Global.Page>
        <Container>
          <Logo src={`/logo-${theme}.png`} alt="Logotipo Production Cost" />
          <Title>Login</Title>
          <Form
            form={form}
            name="formLogin"
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Item
              name="user"
              label="User"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <InputPassword
                placeholder="Type your password"
              />
            </Form.Item>
            <Button loading={loading} type="submit" title="Login" />
          </Form>
        </Container>
      </Global.Page>
    </>
  );
};

export default Login;
