import { setToken, setUserData } from "../../services/cookies";
import UserActionTypes from "./actions-types";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
    currentUser: cookies.get("@costprd:userData"),
}

interface UserAction {
    type: string;
    payload: User
}

function setCookies(payload: User) {
    setToken(payload.token)
    setUserData({ ...payload, token: undefined })
}

const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            setCookies(action.payload)
            return { ...state, currentUser: action.payload }
        }

        case UserActionTypes.LOGOUT: {
            setToken()
            setUserData()
            return { ...state, currentUser: null }
        }

        default: {
            return state;
        }
    }
};

export default userReducer;