import UserActionTypes from "./actions-types";

export function setUser(values: { id: string, name: string }) {
    const { id, name } = values;
    return {
        type: UserActionTypes.SET_USER,
        payload: { id, name },
    };
}