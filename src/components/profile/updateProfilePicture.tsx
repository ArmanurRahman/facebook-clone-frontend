import React, { useCallback } from "react";
import { ChangeEventHandler, useRef, useState } from "react";
import Croper from "react-easy-crop";
import {
    MAX_FILE_SIZE,
    SUPPORTED_IMAGE_FORMAT,
} from "../../constants/constant";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import uploadImages from "../../function/uploadImages";
import { uploadProfilePicture } from "../../function/user";
import { createPost } from "../../function/post";
import PulseLoader from "react-spinners/PulseLoader";

interface UploadProps {
    image: string;
    setImage: (a: string) => void;
    user: UserResponse;
    setShowProfilePopup: (a: boolean) => void;
}
const UpdateProfilePopup: React.FC<UploadProps> = ({
    image,
    setImage,
    user,
    setShowProfilePopup,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropedAreaPixel, setCropedAreaPixel] = useState();
    const [error, setError] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const sliderRef = useRef<HTMLInputElement>(null);
    const onCropCompleteHandler = useCallback(
        (croppedArea: any, croppedPixel: any) => {
            console.log(croppedArea, croppedPixel);
            setCropedAreaPixel(croppedPixel);
        },
        []
    );

    const zoomIn = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.stepUp();
            setZoom(Number(sliderRef.current.value));
        }
    };
    const zoomOut = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.stepDown();
            setZoom(Number(sliderRef.current.value));
        }
    };

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
            const path = `${user.userName}/profile_picture`;
            const formData = new FormData();
            formData.append("path", path);
            formData.append("file", blob);
            const res = await uploadImages(formData, user.token);
            const uploadImage = await uploadProfilePicture(
                res[0].url,
                user?.token
            );

            if (uploadImage === "ok") {
                await createPost(
                    "profilePicture",
                    "",
                    description,
                    res,
                    user.id,
                    user.token
                );
            } else {
                setError(res);
            }
            setLoading(false);
            setShowProfilePopup(false);
        } catch (error: any) {
            console.log(error.response.data.error);
            setLoading(false);
        }
    };
    return (
        <div className='change_profile_picture_image_popup'>
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
                <React.Fragment>
                    <div className='update_profile_picture_header'>
                        <p>Update Profile picture</p>
                        <i
                            className='exit_icon'
                            onClick={() => setImage("")}
                        ></i>
                    </div>
                    <div className='devider'></div>
                    <div className='change_profile_picture_image_popup_body'>
                        <textarea
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <div className='change_profile_picture_image_popup_croper'>
                            <div className='croper'>
                                <Croper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1 / 1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropCompleteHandler}
                                    showGrid={false}
                                    cropShape='round'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='change_profile_picture_zoom_controller'>
                        <div className='slider_circle' onClick={zoomOut}>
                            <i className='minus_icon'></i>
                        </div>
                        <input
                            type='range'
                            max={3}
                            min={1}
                            step={0.2}
                            value={zoom}
                            onChange={(e: any) => setZoom(e.target.value)}
                            ref={sliderRef}
                        />
                        <div className='slider_circle' onClick={zoomIn}>
                            <i className='plus_icon'></i>
                        </div>
                    </div>
                    <div className='change_profile_picture_action'>
                        <button
                            className='btn btn-grey'
                            onClick={() => getCropedImage(true)}
                        >
                            <i className='crop_icon'></i> Crop photo
                        </button>
                        <button className='btn btn-grey'>
                            <i className='temp_icon'></i> Make temporary
                        </button>
                    </div>
                    <p className='change_profile_picture_wording'>
                        Your profile picture is public
                    </p>
                    <div className='devider'></div>

                    <div className='change_profile_picture_action_2'>
                        <div>
                            <button
                                className='btn btn-grey'
                                onClick={() => setImage("")}
                            >
                                Cancel
                            </button>
                            <button
                                className='btn btn-blue'
                                onClick={uploadImageHandler}
                            >
                                {loading ? (
                                    <PulseLoader size={10} color='#fff' />
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

interface Props {
    setShowProfilePopup: (a: boolean) => void;
}
const UpdateProfilePicture: React.FC<Props> = ({ setShowProfilePopup }) => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [image, setImage] = useState("");

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
    console.log(image);
    return (
        <div className='blur'>
            <div className='update_profile_picture_container'>
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
                    <React.Fragment>
                        <input
                            type='file'
                            ref={imageInputRef}
                            accept='image/jpeg,image/png,image/gif,image.webp'
                            hidden
                            onChange={handleInput}
                        />
                        <div className='update_profile_picture_header'>
                            <p>Update Profile picture</p>
                            <i
                                className='exit_icon'
                                onClick={() => setShowProfilePopup(false)}
                            ></i>
                        </div>
                        <div className='devider'></div>
                        <div className='update_profile_picture_body'>
                            <div className='update_profile_picture_action'>
                                <button
                                    className='btn btn-grey'
                                    onClick={() => {
                                        imageInputRef.current?.click();
                                    }}
                                >
                                    <i className='plus_icon'></i> Upload photo
                                </button>
                                <button className='btn btn-grey'>
                                    <i className='frame_icon'></i> Add frame
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
            {image && (
                <UpdateProfilePopup
                    image={image}
                    setImage={setImage}
                    user={user}
                    setShowProfilePopup={setShowProfilePopup}
                />
            )}
        </div>
    );
};

export default UpdateProfilePicture;
