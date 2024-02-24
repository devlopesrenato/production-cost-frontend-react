import UserActionTypes from "./actions-types";

const initialState = {
    currentUser: null,
}

interface UserAction {
    type: string;
    payload: {
        id: string;
        name: string;
    }
}
const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.SET_USER: {
            return { ...state, currentUser: action.payload }
        }
        default: {
            return state;
        }
    }
};

export default userReducer;