import ThemeActionTypes from "./actions-types";

export function changeTheme() {
    return {
        type: ThemeActionTypes.CHANGE_THEME,
    };
}