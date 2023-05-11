import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/reducer";
import { useEffect, useReducer } from "react";
import { profileReducer } from "../../function/reducer";
import axios from "axios";
import Header from "../../components/header";
import "./style.css";
import useOutsideClick from "../../helpers/useOutsideClick";

const Profile = () => {
    const { userName } = useParams();
    const navigate = useNavigate();

    const [showCoverMenu, setShowCoverMenu] = useState(false);
    const loggedInUser = useSelector<RootState, UserResponse>(
        (state) => state.user
    );
    const coverMenuRef = useRef<HTMLDivElement>(null);
    const coverMenuBtnRef = useRef<HTMLDivElement>(null);
    const profileUser = userName || loggedInUser.userName;
    const isOwnProfile = loggedInUser.userName === profileUser;

    const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: [],
        error: "",
    });

    useOutsideClick(
        coverMenuRef,
        () => setShowCoverMenu(false),
        coverMenuBtnRef
    );
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
                <div className='profile_cover'>
                    <div className='profile_cover_photo'>
                        {isOwnProfile && (
                            <React.Fragment>
                                <div className='profile_cover_photo_menu'>
                                    <div
                                        className='profile_cover_photo_action hover3'
                                        onClick={() =>
                                            setShowCoverMenu((prev) => !prev)
                                        }
                                        ref={coverMenuBtnRef}
                                    >
                                        <i className='camera_filled_icon'></i>
                                        <p>Add Cover Photo</p>
                                    </div>
                                </div>

                                {showCoverMenu && (
                                    <div
                                        className='profile_cover_photo_menu profile_cover_photo_menu_item'
                                        ref={coverMenuRef}
                                    >
                                        <div className='profile_cover_photo_action hover3'>
                                            <i className='photo_icon'></i>
                                            <p>Select Photo</p>
                                        </div>
                                        <div className='profile_cover_photo_action hover3'>
                                            <i className='upload_icon'></i>
                                            <p>Upload Photo</p>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Profile;
