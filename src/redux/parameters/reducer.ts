import ParameterActionTypes from "./actions-types";

const initialState: ParameterType[] = []

interface ParameterAction {
    type: string;
    payload: ParameterType[]
}

const parametersReducer = (state = initialState, action: ParameterAction) => {
    switch (action.type) {
        case ParameterActionTypes.SET_PARAM: {
            if (!action.payload || !Array.isArray(action.payload)) {
                throw new Error("Parameters is not valid")
            }
            return action.payload
        }

        default: {
            return state;
        }
    }
};

export default parametersReducer;