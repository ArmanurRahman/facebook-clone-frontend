import "./style.css";
import EmojiPickerBackground from "./emojiPickerBackground";
import AddToPost from "./addToPost";
import { useRef, useState } from "react";
import ImagePreview from "./imagePreview";
import useOutsideClick from "../../../../../helpers/useOutsideClick";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../../../../function/post";
import dataURItoBlob from "../../../../../helpers/dataURItoBlob";
import uploadImages from "../../../../../function/uploadImages";

interface Props {
    picture: string;
    firstName: string;
    lastName: string;
    setShowPostPopup: (a: boolean) => void;
    userId: string;
    token?: string;
    userName: string;
}
const PostPopup: React.FC<Props> = ({
    picture,
    firstName,
    lastName,
    setShowPostPopup,
    userId,
    token,
    userName,
}) => {
    const [postPreview, setPostPreview] = useState(false);
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [background, setBackground] = useState("");
    const [error, setError] = useState("");
    const postRef = useRef<HTMLDivElement>(null);

    useOutsideClick(postRef, () => setShowPostPopup(false));

    const postHandler = async () => {
        setError("");
        setLoading(true);
        if (background) {
            const res = await createPost(
                null,
                background,
                status,
                null,
                userId,
                token
            );
            if (res !== "ok") {
                setError(res);
            } else {
                setStatus("");
                setBackground("");
                setShowPostPopup(false);
            }
        } else if (images && images.length > 0) {
            const postImages = images.map((image) => dataURItoBlob(image));
            const path = `${userName}/post_images`;
            const formData = new FormData();
            formData.append("path", path);
            postImages.forEach((img) => {
                formData.append("files", img);
            });
            const imgResponse = await uploadImages(formData, token);
            const postRes = await createPost(
                null,
                "",
                status,
                imgResponse,
                userId,
                token
            );
            if (postRes !== "ok") {
                setError(postRes);
            } else {
                setStatus("");
                setBackground("");
                setShowPostPopup(false);
            }
        } else if (status) {
            const postRes = await createPost(
                null,
                "",
                status,
                null,
                userId,
                token
            );
            if (postRes !== "ok") {
                setError(postRes);
            } else {
                setStatus("");
                setBackground("");
                setShowPostPopup(false);
            }
        }
        setLoading(false);
    };
    return (
        <div className=' blur'>
            <div className='post_popup_container' ref={postRef}>
                <div className='post_popup_title'>
                    <p>Create post</p>
                    <div
                        className='circle'
                        onClick={() => setShowPostPopup(false)}
                    >
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
                            setBackground={setBackground}
                            background={background}
                        />
                    ) : (
                        <ImagePreview
                            firstName={firstName}
                            status={status}
                            setStatus={setStatus}
                            setImages={setImages}
                            images={images}
                            setPostPreview={setPostPreview}
                            setError={setError}
                        />
                    )}
                    <AddToPost setPostPreview={setPostPreview} />
                    <button className='btn btn-blue' onClick={postHandler}>
                        {loading ? (
                            <PulseLoader color='#fff' size={20} />
                        ) : (
                            "Post"
                        )}
                    </button>
                </div>
                {error && (
                    <div className='post_error_container'>
                        <p>{error}</p>
                        <button
                            className='btn btn-blue'
                            onClick={() => setError("")}
                        >
                            Try again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostPopup;
