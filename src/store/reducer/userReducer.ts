import * as ActionType from "../action";
import Cookies from "js-cookie";

interface Action {
    type: "LOGIN";
    payload: UserResponse;
}
const userReducer = (
    state = Cookies.get("user") ? JSON.parse(Cookies.get("user") || "") : null,
    action: Action
) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;
