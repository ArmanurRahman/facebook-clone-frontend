import { useEffect, useReducer, useState } from "react";
import Header from "../../components/header";
import HomeComponent from "../../components/home";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { postReducer } from "../../function/reducer";

const Home = () => {
    const [visible, setVisible] = useState(true);

    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const [{ loading, posts, error }, dispatch] = useReducer(postReducer, {
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
    return (
        <div>
            <Header page='home' />
            <HomeComponent posts={posts} />
        </div>
    );
};

export default Home;
