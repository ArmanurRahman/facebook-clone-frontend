import * as ActionType from "../action";

const initialState = {
    loading: false,
    error: "",
    profile: null,
};
const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionType.PROFILE_REQUEST:
            return { ...state, loading: true, error: "" };
        case ActionType.PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                errror: "",
                profile: action.payload,
            };
        case ActionType.PROFILE_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default userReducer;
