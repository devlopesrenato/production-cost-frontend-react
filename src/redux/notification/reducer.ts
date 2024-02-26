import NotificationActionTypes from "./actions-types";

const initialState:NotifyType = {
    title: "",
    message: "",
    type: "success"
}

type NotifyType = {
    title: string;
    message: string;
    type: "error" | "warning" | "info" | "success";
}

type NotifyAction = {
    type: string;
    payload: NotifyType;
}

const notificationReducer = (state = initialState, action: NotifyAction) => {
    switch (action.type) {
        case NotificationActionTypes.NOTIFICATION_OPEN: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

export default notificationReducer;