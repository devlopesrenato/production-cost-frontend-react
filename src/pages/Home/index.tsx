import { Page } from "../../styles/globalStyles";
import { setUser } from "../../redux/user/actions";
import { useAppDispatch } from "../../redux/hooks";
import { Button } from "antd";

const Home = () => {
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(setUser({}));
  }

  return (
    <Page>
      Home <Button onClick={() => logout()}>Logout</Button>
    </Page>
  );
};

export default Home;
