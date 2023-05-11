import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/reducer";
import { useEffect, useReducer } from "react";
import { profileReducer } from "../../function/reducer";
import axios from "axios";
import Header from "../../components/header";
import Cover from "../../components/profile/cover";
import ProfilePicture from "../../components/profile/profilePicture";

const Profile = () => {
    const { userName } = useParams();
    const navigate = useNavigate();

    const loggedInUser = useSelector<RootState, UserResponse>(
        (state) => state.user
    );

    const profileUser = userName || loggedInUser.userName;
    const isOwnProfile = loggedInUser.userName === profileUser;

    const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: null,
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
    return (
        <React.Fragment>
            <Header page='profile' />
            <div className='profile_container'>
                <Cover isOwnProfile={isOwnProfile} />
                {profile && (
                    <ProfilePicture
                        picture={profile.picture}
                        firstName={profile.firstName}
                        lastName={profile.lastName}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default Profile;
