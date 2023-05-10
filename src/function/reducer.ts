interface State {
    loading: boolean;
    posts: Array<Post> | [];
    error: string;
}
interface ActionRequest {
    type: "POSTS_REQUEST";
}
interface ActionSuccess {
    type: "POSTS_SUCCESS";
    payload: Array<Post>;
}
interface ActionError {
    type: "POSTS_ERROR";
    payload: string;
}
export const postReducer = (
    state: State,
    action: ActionRequest | ActionSuccess | ActionError
) => {
    switch (action.type) {
        case "POSTS_REQUEST":
            return { ...state, loading: true, error: "" };
        case "POSTS_SUCCESS":
            return {
                ...state,
                loading: false,
                errror: "",
                posts: action.payload,
            };
        case "POSTS_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

interface ProfileState {
    loading: boolean;
    profile: Profile | {};
    error: string;
}
interface ProfileRequest {
    type: "PROFILE_REQUEST";
}
interface ProfileSuccess {
    type: "PROFILE_SUCCESS";
    payload: Array<Post>;
}
interface ProfileError {
    type: "PROFILE_ERROR";
    payload: string;
}
export const profileReducer = (
    state: ProfileState,
    action: ProfileRequest | ProfileSuccess | ProfileError
) => {
    switch (action.type) {
        case "PROFILE_REQUEST":
            return { ...state, loading: true, error: "" };
        case "PROFILE_SUCCESS":
            return {
                ...state,
                loading: false,
                errror: "",
                profile: action.payload,
            };
        case "PROFILE_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
