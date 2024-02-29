import UserActionTypes from "./actions-types";

export function setUser(values: { id?: string, name?: string, token?: string }) {
    const { id, name, token } = values;
    return {
        type: UserActionTypes.SET_USER,
        payload: { id, name, token },
    };
}

export function logout() {
    return {
        type: UserActionTypes.LOGOUT,
        payload: null
    };
}