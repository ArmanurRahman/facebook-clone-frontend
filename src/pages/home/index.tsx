import { useEffect, useReducer, useState } from "react";
import Header from "../../components/header";
import HomeComponent from "../../components/home";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

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
const reducer = (
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

const Home = () => {
    const [visible, setVisible] = useState(true);

    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const [{ loading, posts, error }, dispatch] = useReducer(reducer, {
        loading: false,
        posts: [],
        error: "",
    });

    useEffect(() => {
        getAllPost();
    }, []);
    const getAllPost = async () => {
        try {
            dispatch({ type: "POSTS_REQUEST" });
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/getAllPost`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            dispatch({ type: "POSTS_SUCCESS", payload: data });
        } catch (error: any) {
            dispatch({
                type: "POSTS_ERROR",
                payload: error.response.data.message,
            });
        }
    };
    console.log(posts);
    return (
        <div>
            <Header />
            <HomeComponent posts={posts} />
        </div>
    );
};

export default Home;
