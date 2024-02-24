import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import UserActionTypes from "./redux/user/actions-types";

const App = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.userReducer);
  return (
    <div>
      <p>Hello {currentUser?.name}</p>
      <button
        onClick={() =>
          dispatch({
            type: UserActionTypes.SET_USER,
            payload: null,
          })
        }
      >
        logout
      </button>
      <Outlet />
    </div>
  );
};

export default App;
