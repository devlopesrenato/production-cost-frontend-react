import ThemeActionTypes from "./actions-types";

const initialState = {
    theme: localStorage.getItem('@theme') || 'light' as Theme
}

interface ThemeAction {
    type: string;
}

const themeReducer = (state = initialState, action: ThemeAction) => {
    switch (action.type) {
        case ThemeActionTypes.CHANGE_THEME: {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('@theme', newTheme);
            return { theme: newTheme }
        }
        default: {
            return state;
        }
    }
};

export default themeReducer;