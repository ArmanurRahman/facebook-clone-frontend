import "./style.css";
import EmojiPickerBackground from "./emojiPickerBackground";
import AddToPost from "./addToPost";
import { useState } from "react";
import ImagePreview from "./imagePreview";

interface Props {
    picture: string;
    firstName: string;
    lastName: string;
}
const PostPopup: React.FC<Props> = ({ picture, firstName, lastName }) => {
    const [postPreview, setPostPreview] = useState(true);
    const [status, setStatus] = useState("");
    return (
        <div className=' blur'>
            <div className='post_popup_container'>
                <div className='post_popup_title'>
                    <p>Create post</p>
                    <div className='circle'>
                        <i className='exit_icon'></i>
                    </div>
                </div>
                <div className='devider'></div>
                <div className='post_popup_body'>
                    <div className='post_popup_user_section'>
                        <img src={picture} alt='profile_picture' />
                        <div className='post_popup_user_name'>
                            <p>
                                {firstName} {lastName}
                            </p>
                            <div className='post_popup_access'>
                                <img src='../../../icons/public.png' alt='' />
                                <p>public</p>
                                <i className='arrowDown_icon'></i>
                            </div>
                        </div>
                    </div>

                    {!postPreview ? (
                        <EmojiPickerBackground
                            firstName={firstName}
                            status={status}
                            setStatus={setStatus}
                        />
                    ) : (
                        <ImagePreview
                            firstName={firstName}
                            status={status}
                            setStatus={setStatus}
                        />
                    )}
                    <AddToPost />
                    <button className='btn btn-blue'>Post</button>
                </div>
            </div>
        </div>
    );
};

export default PostPopup;
