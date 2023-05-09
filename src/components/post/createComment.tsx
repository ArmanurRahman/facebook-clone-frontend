import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import {
    MAX_FILE_SIZE,
    SUPPORTED_IMAGE_FORMAT,
} from "../../constants/constant";

const CreateComment = () => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const [showEmoji, setShowEmoji] = useState(false);
    const statusRef = useRef<HTMLInputElement>(null);
    const [currentCursor, setCurrentCursor] = useState(0);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (statusRef.current && statusRef.current.selectionEnd) {
            statusRef.current.selectionEnd = currentCursor;
        }
    }, [currentCursor]);

    const handleEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
        const { emoji } = emojiData;
        const ref = statusRef.current;
        ref?.focus();
        const start = text.substring(0, ref?.selectionStart || 0);
        const end = text.substring(ref?.selectionStart || 0);
        const newText = start + emoji + end;
        setText(newText);
        setCurrentCursor(start.length + emoji.length);
    };
    console.log(image);
    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const tempFiles = (e.target as HTMLInputElement).files;
        console.log(tempFiles);
        if (tempFiles) {
            let img = Array.from(tempFiles)[0];

            if (!SUPPORTED_IMAGE_FORMAT.includes(img.type)) {
                setError(
                    `${img.name} format is not supported, supported formats are png, jpeg, webp, gif`
                );

                return;
            }
            if (img.size > MAX_FILE_SIZE) {
                setError(`${img.name} file too big`);
                return;
            }
            const imageReader = new FileReader();
            imageReader.readAsDataURL(img);
            imageReader.onload = (readerEvent: any) => {
                setImage(readerEvent.target?.result);
            };
        }
    };
    return (
        <div className='user_interaction_create_comment'>
            <div className='create_comment_user'>
                <img src={user.picture} alt='' />
                {!error ? (
                    <div className='create_comment_input'>
                        <input
                            type='text'
                            placeholder={"Write a comment"}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            ref={statusRef}
                        />
                        <div
                            className='create_comment_icon'
                            onClick={() => setShowEmoji((prev) => !prev)}
                        >
                            <div className='comment_emoji_picker'>
                                {showEmoji && (
                                    <Picker
                                        height={300}
                                        width={270}
                                        searchDisabled
                                        onEmojiClick={handleEmoji}
                                        previewConfig={{ showPreview: false }}
                                    />
                                )}
                            </div>
                            <i className='emoji_icon'></i>
                        </div>
                        <div
                            className='create_comment_icon'
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <input
                                type='file'
                                ref={imageInputRef}
                                accept='image/jpeg,image/png,image/gif,image.webp'
                                hidden
                                onChange={handleInput}
                            />
                            <i className='camera_icon'></i>
                        </div>
                        <div className='create_comment_icon'>
                            <i className='gif_icon'></i>
                        </div>
                        <div className='create_comment_icon'>
                            <i className='sticker_icon'></i>
                        </div>
                    </div>
                ) : (
                    <div className='create_comment_error'>
                        <p className='create_comment_error_message'>{error}</p>
                        <button
                            className='btn btn-blue'
                            onClick={() => setError("")}
                        >
                            Try again
                        </button>
                    </div>
                )}
            </div>
            {image && (
                <div className='comment_img_preview'>
                    <div
                        className='comment_img_preview_icon'
                        onClick={() => setImage("")}
                    >
                        <i className='exit_icon'></i>
                    </div>
                    <img src={image} alt='' />
                </div>
            )}

            {/* <div className='comment_preview'>
                <div className='comment_preview_item'>
                    <div className='comment_preview_item_user'>
                        <img />
                        <div className='comment_preview_item_user_details'>
                            firstName lastName
                        </div>
                    </div>
                    <div className='comment_preview_item_comment'>
                        <div className='comment_preview_item_comment_close'>
                            <i className='exit_icon'></i>
                        </div>
                        <i className='exit_icon'></i>
                        <img src={image} alt='' />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default CreateComment;
