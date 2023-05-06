import { useEffect, useRef, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";

interface Props {
    firstName: string;
    status: string;
    setStatus: (a: string) => void;
    isAddingImage?: boolean;
}
const EmojiPickerBackground: React.FC<Props> = ({
    firstName,
    status,
    setStatus,
    isAddingImage,
}) => {
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
        <div
            className={`${
                isAddingImage ? "post_popup_input_area_image_only" : ""
            }`}
        >
            <div
                className={`post_popup_text_area ${
                    isAddingImage ? "post_popup_text_area_image_only" : ""
                }`}
            >
                <textarea
                    placeholder={`What is on your mind ${firstName}?`}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    ref={statusRef}
                ></textarea>
            </div>

            <div className='post_popup_input_action'>
                {!isAddingImage && (
                    <img src='../../../icons/colorful.png' alt='' />
                )}

                <i
                    className='emoji_icon_large'
                    onClick={() => setShowEmoji((prevState) => !prevState)}
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
    );
};

export default EmojiPickerBackground;
