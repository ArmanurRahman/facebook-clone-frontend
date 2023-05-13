import { useState } from "react";
import { Plus } from "../../svg";
import "./style.css";
import UpdateProfilePicture from "./updateProfilePicture";
interface Props {
    picture: string;
    firstName: string;
    lastName: string;
}
const ProfilePicture: React.FC<Props> = ({ picture, firstName, lastName }) => {
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    return (
        <div className='profile_picture_container'>
            <div className='profile_picture_photo'>
                <img src={picture} alt='' />
                <div
                    className='profile_picture_photo_icon'
                    onClick={() => setShowProfilePopup(true)}
                >
                    <i className='camera_filled_icon'></i>
                </div>
            </div>
            <div className='profile_picture_name'>
                <div className='profile_picture_name_details'>
                    <p>
                        {firstName} {lastName}
                        <span> (Another name) </span>
                    </p>
                </div>
            </div>
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
            {showProfilePopup && (
                <UpdateProfilePicture
                    setShowProfilePopup={setShowProfilePopup}
                />
            )}
        </div>
    );
};

export default ProfilePicture;
