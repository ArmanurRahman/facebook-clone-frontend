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
import { Dots } from "../../svg";
import PeopleMayKnow from "../../components/profile/peopleMayKnow";
import HomePost from "../../components/home/middle/post";
import GridPost from "../../components/post/gridPost";
import Post from "../../components/post";
import Photo from "../../components/profile/photo";

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
    }, [profileUser]);
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
    return (
        <React.Fragment>
            <Header page='profile' />
            <div className='profile_container'>
                <Cover isOwnProfile={isOwnProfile} user={loggedInUser} />
                {profile && (
                    <ProfilePicture
                        picture={profile.picture}
                        firstName={profile.firstName}
                        lastName={profile.lastName}
                        isOwnProfile={isOwnProfile}
                    />
                )}
                <div className='devider'></div>
                <div className='profile_menu_container'>
                    <div className='profile_menu_container_1'>
                        <div className='profile_menu_item active'>Posts</div>
                        <div className='profile_menu_item'>About</div>
                        <div className='profile_menu_item'>Friends</div>
                        <div className='profile_menu_item'>Photos</div>
                        <div className='profile_menu_item'>Videos</div>
                        <div className='profile_menu_item'>Check ins</div>
                        <div className='profile_menu_item'>More</div>
                    </div>
                    <div className='profile_menu_container_2'>
                        <Dots color='#65676b' />
                    </div>
                </div>
                <div className='devider'></div>
            </div>
            <div className='profile_next_container'>
                <div className='profile_next_container_inside'>
                    <PeopleMayKnow />
                    <div className='profle_grid'>
                        <div className='profle_grid_left'>
                            <Photo profileUser={profileUser} />
                        </div>
                        <div className='profle_grid_right'>
                            {isOwnProfile && profile && (
                                <HomePost
                                    picture={profile.picture}
                                    firstName={profile.firstName}
                                    lastName={profile.lastName}
                                    userId={profile._id}
                                    userName={profile.userName}
                                    isFromProfile
                                />
                            )}
                            <GridPost />
                            {profile?.posts && profile.posts.length > 0 ? (
                                <div className='post_container'>
                                    {profile.posts.map((post) => (
                                        <Post
                                            post={post}
                                            key={post._id}
                                            loginUser={loggedInUser.id}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className='no_post_found'>
                                    No post found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Profile;
