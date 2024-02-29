import UserActionTypes from "./actions-types";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
    currentUser: cookies.get("@costprd:userData"),
}

type User = {
    id: string;
    name: string;
    token: string;

}
interface UserAction {
    type: string;
    payload: User
}

function setCookies(payload: User) {
    cookies.set("@costprd:userData", JSON.stringify({ ...payload, token: undefined }), { maxAge: 999990, path: '/' });
    cookies.set('@costprd:token', payload.token, { maxAge: 999990, path: '/' });
}

const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            setCookies(action.payload)
            return { ...state, currentUser: action.payload }
        }

        case UserActionTypes.LOGOUT: {
            cookies.set("@costprd:userData", null, { maxAge: 0 });
            cookies.set("@costprd:token", null, { maxAge: 0 });
            return { ...state, currentUser: null }
        }

        default: {
            return state;
        }
    }
};

export default userReducer;