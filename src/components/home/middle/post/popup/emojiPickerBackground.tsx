import { useEffect, useRef, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";

const postBackgroundImages = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
];
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
    const [showBGs, setShowBGs] = useState<string | boolean>(false);
    const statusRef = useRef<HTMLTextAreaElement>(null);
    const [currentCursor, setCurrentCursor] = useState(0);
    const bgRef = useRef<HTMLDivElement>(null);

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

    const bgHandler = (i: number) => {
        if (bgRef.current?.style) {
            bgRef.current.style.backgroundImage = `url(${postBackgroundImages[i]})`;
            bgRef.current.classList.add("bg_handler");
            setShowBGs(postBackgroundImages[i]);
        }
    };

    const nobgHandler = () => {
        if (bgRef.current?.style) {
            bgRef.current.style.backgroundImage = "";
            setShowBGs(false);
        }
    };
    return (
        <div
            className={` ${
                isAddingImage ? "post_popup_input_area_image_only" : ""
            }`}
        >
            <div
                className={`post_popup_text_area ${
                    isAddingImage ? "post_popup_text_area_image_only" : ""
                }`}
                ref={bgRef}
            >
                <textarea
                    placeholder={`What is on your mind ${firstName}?`}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    ref={statusRef}
                    maxLength={250}
                    style={{
                        paddingTop:
                            showBGs && statusRef.current?.value
                                ? Math.abs(
                                      statusRef.current?.value.length * 0.3 -
                                          100
                                  )
                                : "",
                    }}
                ></textarea>
            </div>

            <div className='post_popup_input_action'>
                {!isAddingImage && (
                    <img
                        src='../../../icons/colorful.png'
                        alt=''
                        onClick={() => setShowBGs(true)}
                    />
                )}
                {!isAddingImage && showBGs && (
                    <div
                        className='post_popup_input_action_none'
                        onClick={nobgHandler}
                    ></div>
                )}
                {!isAddingImage && showBGs && (
                    <>
                        {postBackgroundImages.map((bg, i) => (
                            <img
                                src={bg}
                                key={i}
                                alt=''
                                onClick={() => bgHandler(i)}
                            />
                        ))}
                    </>
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
