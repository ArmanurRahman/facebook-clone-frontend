import { useState } from "react";
import { Plus } from "../../svg";
import "./style.css";
import UpdateProfilePicture from "./updateProfilePicture";
import Friendship from "./friendShip";
interface Props {
    picture: string;
    firstName: string;
    lastName: string;
    isOwnProfile: boolean;
    friendship: Friendship;
    profileId: string;
    otherName?: string;
}
const ProfilePicture: React.FC<Props> = ({
    picture,
    firstName,
    lastName,
    isOwnProfile,
    friendship,
    profileId,
    otherName,
}) => {
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    return (
        <div className='profile_picture_container'>
            <div className='profile_picture_photo'>
                <img src={picture} alt='' />
                {isOwnProfile && (
                    <div
                        className='profile_picture_photo_icon'
                        onClick={() => setShowProfilePopup(true)}
                    >
                        <i className='camera_filled_icon'></i>
                    </div>
                )}
            </div>
            <div className='profile_picture_name'>
                <div className='profile_picture_name_details'>
                    <p>
                        {firstName} {lastName}
                        {otherName && <span> ({otherName}) </span>}
                    </p>
                </div>
            </div>
            {isOwnProfile ? (
                <div className='profile_picture_action'>
                    <button className='btn btn-blue'>
                        <Plus color={"#fff"} />
                        Add to story
                    </button>
                    <button className='btn btn-grey'>
                        <i className='edit_icon'></i>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <Friendship friendshipObj={friendship} profileid={profileId} />
            )}

            {showProfilePopup && (
                <UpdateProfilePicture
                    setShowProfilePopup={setShowProfilePopup}
                />
            )}
        </div>
    );
};

export default ProfilePicture;
