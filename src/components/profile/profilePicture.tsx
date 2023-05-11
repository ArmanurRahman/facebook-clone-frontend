import { Plus } from "../../svg";
import "./style.css";
interface Props {
    picture: string;
    firstName: string;
    lastName: string;
}
const ProfilePicture: React.FC<Props> = ({ picture, firstName, lastName }) => {
    return (
        <div className='profile_picture_container'>
            <div className='profile_picture_photo'>
                <img src={picture} alt='' />
                <div className='profile_picture_photo_icon'>
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
        </div>
    );
};

export default ProfilePicture;
