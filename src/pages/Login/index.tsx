import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/user/actions";

const Login = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <p>Login</p>
      <button
        onClick={() => dispatch(setUser({ name: "devLopesRenato", id: "1" }))}
      >
        signin
      </button>
    </>
  );
};

export default Login;
