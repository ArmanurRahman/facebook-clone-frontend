import { useEffect, useRef, useState } from "react";
import "./style.css";
import Picker, { EmojiClickData } from "emoji-picker-react";

interface Props {
    picture: string;
    firstName: string;
    lastName: string;
}
const PostPopup: React.FC<Props> = ({ picture, firstName, lastName }) => {
    const [postPreview, setPostPreview] = useState(false);
    const [status, setStatus] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const statusRef = useRef<HTMLTextAreaElement>(null);
    const [currentCursor, setCurrentCursor] = useState(0);

    useEffect(() => {
        if (statusRef.current && statusRef.current.selectionEnd) {
            statusRef.current.selectionEnd = currentCursor;
        }
    }, [currentCursor]);
    const handleEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
        const { emoji } = emojiData;
        const ref = statusRef.current;
        ref?.focus();
        const start = status.substring(0, ref?.selectionStart);
        const end = status.substring(ref?.selectionStart || 0);
        const newText = start + emoji + end;
        setStatus(newText);
        setCurrentCursor(start.length + emoji.length);
    };
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

                    <div className='post_popup_text_area'>
                        <textarea
                            placeholder={`What is on your mind ${firstName}?`}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            ref={statusRef}
                        ></textarea>
                    </div>
                    {postPreview && (
                        <div className='post_popup_text_preview'></div>
                    )}
                    <div className='post_popup_input_action'>
                        <img src='../../../icons/colorful.png' alt='' />
                        <i
                            className='emoji_icon_large'
                            onClick={() =>
                                setShowEmoji((prevState) => !prevState)
                            }
                        ></i>
                        <div className='post_popup_emoji_picker'>
                            {showEmoji && (
                                <Picker
                                    height={300}
                                    width={270}
                                    searchDisabled
                                    onEmojiClick={handleEmoji}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPopup;
