import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/reducer";
import { useEffect, useReducer } from "react";
import { profileReducer } from "../../function/reducer";
import axios from "axios";

const Profile = () => {
    const { userName } = useParams();
    const navigate = useNavigate();
    const loggedInUser = useSelector<RootState, UserResponse>(
        (state) => state.user
    );
    const profileUser = userName || loggedInUser.userName;

    const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: [],
        error: "",
    });

    useEffect(() => {
        getProfile();
    }, []);
    const getProfile = async () => {
        try {
            dispatch({ type: "PROFILE_REQUEST" });
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/getProfile/${profileUser}`,
                {
                    headers: {
                        Authorization: `Bearer ${loggedInUser.token}`,
                    },
                }
            );
            dispatch({ type: "PROFILE_SUCCESS", payload: data });
        } catch (error: any) {
            if (error.response.status === 404) {
                navigate("/profile");
            }
            dispatch({
                type: "PROFILE_ERROR",
                payload: error.response.data.message,
            });
        }
    };
    console.log(profile);
    return <div>Profile</div>;
};

export default Profile;
