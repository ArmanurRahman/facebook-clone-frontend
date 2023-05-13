import React, {
    ChangeEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import useOutsideClick from "../../helpers/useOutsideClick";
import "./style.css";
import {
    MAX_FILE_SIZE,
    SUPPORTED_IMAGE_FORMAT,
} from "../../constants/constant";
import Croper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import uploadImages from "../../function/uploadImages";
import { uploadCoverPicture } from "../../function/user";
import { createPost } from "../../function/post";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import * as ActionType from "../../store/action";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
interface Props {
    isOwnProfile: boolean;
    user: UserResponse;
}

const Cover: React.FC<Props> = ({ isOwnProfile, user }) => {
    const dispatch = useDispatch();
    const [showCoverMenu, setShowCoverMenu] = useState(false);
    const coverMenuRef = useRef<HTMLDivElement>(null);
    const coverMenuBtnRef = useRef<HTMLDivElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const coverPhotoRef = useRef<HTMLDivElement>(null);

    const [error, setError] = useState("");
    const [image, setImage] = useState("");
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropedAreaPixel, setCropedAreaPixel] = useState();
    const [width, setWidth] = useState(0);
    const [loading, setLoading] = useState(false);

    useOutsideClick(
        coverMenuRef,
        () => setShowCoverMenu(false),
        coverMenuBtnRef
    );

    useEffect(() => {
        if (coverPhotoRef && coverPhotoRef.current) {
            setWidth(coverPhotoRef.current?.clientWidth);
        }
    }, [window.innerWidth, coverPhotoRef.current?.clientWidth]);
    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const tempFiles = (e.target as HTMLInputElement).files;
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

    const onCropCompleteHandler = useCallback(
        (croppedArea: any, croppedPixel: any) => {
            setCropedAreaPixel(croppedPixel);
        },
        []
    );

    const getCropedImage = useCallback(
        async (showCroped?: boolean) => {
            try {
                const img = await getCroppedImg(image, cropedAreaPixel);
                if (showCroped) {
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
                    setImage(img);
                } else {
                    return img;
                }
            } catch (error) {}
        },
        [cropedAreaPixel]
    );
    const uploadImageHandler = async () => {
        try {
            setLoading(true);
            const img = await getCropedImage();
            const blob = await fetch(img).then((b) => b.blob());
            const path = `${user.userName}/cover_picture`;
            const formData = new FormData();
            formData.append("path", path);
            formData.append("file", blob);
            const res = await uploadImages(formData, user.token);
            const uploadImage = await uploadCoverPicture(
                res[0].url,
                user?.token
            );

            if (uploadImage === "ok") {
                await createPost("cover", "", "", res, user.id, user.token);
            } else {
                setError(res);
            }
            dispatch({
                type: ActionType.UPLOAD_COVER_PICTURE,
                payload: res[0].url,
            });

            Cookies.set("user", JSON.stringify({ ...user, cover: res[0].url }));
            setImage("");
            setLoading(false);
        } catch (error: any) {
            console.log(error.response.data.error);
            setLoading(false);
        }
    };

    const query550px = useMediaQuery({
        query: "(max-width: 550px)",
    });
    const query460px = useMediaQuery({
        query: "(max-width: 460px)",
    });
    const height = query460px ? 250 : query550px ? 300 : 350;
    return (
        <div className='profile_cover_photo'>
            {!image && user.cover && (
                <div className='profile_cover_img'>
                    <img src={user.cover} alt='' />
                </div>
            )}
            {error ? (
                <div className='post_error_container'>
                    <p>{error}</p>
                    <button
                        className='btn btn-blue'
                        onClick={() => setError("")}
                    >
                        Try again
                    </button>
                </div>
            ) : (
                <>
                    {isOwnProfile && image && (
                        <React.Fragment>
                            <div className='change_cover_picture_action'>
                                <p>Your cover picture is public</p>
                                <div className='change_cover_picture_btn'>
                                    <button
                                        className='btn btn-blue'
                                        onClick={() => setImage("")}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='btn btn-blue'
                                        onClick={uploadImageHandler}
                                    >
                                        {loading ? (
                                            <PulseLoader
                                                size={10}
                                                color='#fff'
                                            />
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div
                                className='change_cover_picture_croper'
                                ref={coverPhotoRef}
                            >
                                <Croper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={width / height}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropCompleteHandler}
                                    showGrid={true}
                                    objectFit='horizontal-cover'
                                />
                            </div>
                        </React.Fragment>
                    )}
                    {isOwnProfile && (
                        <div className='profile_cover_photo_menu'>
                            <div
                                className='profile_cover_photo_action hover3'
                                onClick={() =>
                                    setShowCoverMenu((prev) => !prev)
                                }
                                ref={coverMenuBtnRef}
                            >
                                <i className='camera_filled_icon'></i>
                                <p>Add Cover Photo</p>
                            </div>
                        </div>
                    )}

                    {showCoverMenu && (
                        <div
                            className='profile_cover_photo_menu profile_cover_photo_menu_item'
                            ref={coverMenuRef}
                        >
                            <div className='profile_cover_photo_action hover3'>
                                <i className='photo_icon'></i>
                                <p>Select Photo</p>
                            </div>
                            <div
                                className='profile_cover_photo_action hover3'
                                onClick={() => imageInputRef.current?.click()}
                            >
                                <i className='upload_icon'></i>
                                <p>Upload Photo</p>
                            </div>
                            <input
                                type='file'
                                ref={imageInputRef}
                                accept='image/jpeg,image/png,image/gif,image.webp'
                                hidden
                                onChange={handleInput}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Cover;
