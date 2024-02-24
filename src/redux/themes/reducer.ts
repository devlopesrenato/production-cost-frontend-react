import ThemeActionTypes from "./actions-types";

const initialState = {
    theme: 'light' as Theme
}

interface ThemeAction {
    type: string;
}

const themeReducer = (state = initialState, action: ThemeAction) => {
    switch (action.type) {
        case ThemeActionTypes.CHANGE_THEME: {
            return { theme: state.theme === 'dark' ? 'light' : 'dark' }
        }
        default: {
            return state;
        }
    }
};

export default themeReducer;