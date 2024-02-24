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
    cookies.set("@costprd:userData", JSON.stringify({ id: payload.id, name: payload.name }), { maxAge: 999990 });
    cookies.set('@costprd:token', payload.token, { maxAge: 999990 });
}

function removeCookies() {
    cookies.remove("@costprd:userData");
    cookies.remove('@costprd:token');
}

const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            const { id, name, token } = action.payload;
            var user;
            if (!id || !name || !token) {
                removeCookies()
            } else {
                setCookies({ id, name, token });
                user = action.payload;
            }
            return { ...state, currentUser: user }
        }
        default: {
            return state;
        }
    }
};

export default userReducer;