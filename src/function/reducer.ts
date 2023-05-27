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
interface ActionAdded {
    type: "POST_ADDED";
    payload: Post;
}
interface ActionDeleted {
    type: "POST_DELETED";
    payload: string;
}
interface ActionError {
    type: "POSTS_ERROR";
    payload: string;
}
export const postReducer = (
    state: State,
    action:
        | ActionRequest
        | ActionSuccess
        | ActionError
        | ActionAdded
        | ActionDeleted
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
        case "POST_ADDED":
            return {
                ...state,
                loading: false,
                errror: "",
                posts: [action.payload, ...state.posts],
            };
        case "POST_DELETED":
            return {
                ...state,
                loading: false,
                errror: "",
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };
        case "POSTS_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

interface ProfileState {
    loading: boolean;
    profile: Profile | null;
    error: string;
}
interface ProfileRequest {
    type: "PROFILE_REQUEST";
}
interface ProfileSuccess {
    type: "PROFILE_SUCCESS";
    payload: Profile;
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

interface PhotoState {
    loading: boolean;
    photos: ListPhoto | null;
    error: string;
}
interface PhotoRequest {
    type: "PHOTO_REQUEST";
}
interface PhotoSuccess {
    type: "PHOTO_SUCCESS";
    payload: ListPhoto;
}
interface PhotoError {
    type: "PHOTO_ERROR";
    payload: string;
}
export const photoReducer = (
    state: PhotoState,
    action: PhotoRequest | PhotoSuccess | PhotoError
) => {
    switch (action.type) {
        case "PHOTO_REQUEST":
            return { ...state, loading: true, error: "" };
        case "PHOTO_SUCCESS":
            return {
                ...state,
                loading: false,
                errror: "",
                photos: action.payload,
            };
        case "PHOTO_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
