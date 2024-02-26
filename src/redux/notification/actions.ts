import ThemeActionTypes from "./actions-types";

interface NotifyAction {
    title: string;
    message: string;
    type: "error" | "warning" | "info" | "success";
}

export function openNotification(payload: NotifyAction) {
    return {
        type: ThemeActionTypes.NOTIFICATION_OPEN,
        payload
    };
}