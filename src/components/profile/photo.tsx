import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/reducer";
import { useEffect, useReducer } from "react";
import { photoReducer } from "../../function/reducer";
import axios from "axios";

interface Props {
    profileUser: string;
}
const Photo: React.FC<Props> = ({ profileUser }) => {
    const navigate = useNavigate();

    const loggedInUser = useSelector<RootState, UserResponse>(
        (state) => state.user
    );

    const [{ loading, photos, error }, dispatch] = useReducer(photoReducer, {
        loading: false,
        photos: null,
        error: "",
    });

    useEffect(() => {
        getPhoto();
    }, [profileUser]);
    const getPhoto = async () => {
        try {
            dispatch({ type: "PHOTO_REQUEST" });
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/listImages/`,
                {
                    path: `${profileUser}/*`,
                    sort: "desc",
                    max: 20,
                },
                {
                    headers: {
                        Authorization: `Bearer ${loggedInUser.token}`,
                    },
                }
            );
            dispatch({ type: "PHOTO_SUCCESS", payload: data });
        } catch (error: any) {
            if (error.response.status === 404) {
                navigate("/profile");
            }
            dispatch({
                type: "PHOTO_ERROR",
                payload: error.response.data.message,
            });
        }
    };
    return (
        <div className='profile_photo_container'>
            <div className='profile_photo_container_header'>
                <div className='profile_photo_container_title'>
                    <p>Photos</p>
                    {photos && photos?.total_count > 0 && (
                        <div>
                            {photos?.total_count}
                            {photos?.total_count === 1 ? (
                                <span> photo</span>
                            ) : (
                                <span> photos</span>
                            )}
                        </div>
                    )}
                </div>
                <p className='profile_photo_container_see_all'>
                    See all photos
                </p>
            </div>
            {photos && photos?.resources.length > 0 ? (
                <div className='profile_photo_container_body'>
                    {photos?.resources.slice(0, 9).map((img, i) => (
                        <img src={img.secure_url} alt='' key={i} />
                    ))}
                </div>
            ) : (
                <div className='no_post_found'> No photo found</div>
            )}
        </div>
    );
};

export default Photo;
