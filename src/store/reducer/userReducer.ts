import * as ActionType from "../action";
import Cookies from "js-cookie";

const userReducer = (
    state = Cookies.get("user") ? JSON.parse(Cookies.get("user") || "") : null,
    action: any
) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return action.payload;
        case ActionType.VERIFIED:
            return { ...state, verified: action.payload };
        case ActionType.UPLOAD_PROFILE_PICTURE:
            return { ...state, picture: action.payload };
        case ActionType.LOGOUT:
            return null;
        default:
            return state;
    }
};

export default userReducer;
