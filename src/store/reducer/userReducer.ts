import * as ActionType from "../action";
import Cookies from "js-cookie";

const userReducer = (
    state = Cookies.get("user") ? JSON.parse(Cookies.get("user") || "") : null,
    action: any
) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;
