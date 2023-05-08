import { ChangeEventHandler, useRef } from "react";
import EmojiPickerBackground from "./emojiPickerBackground";
import {
    MAX_FILE_SIZE,
    SUPPORTED_IMAGE_FORMAT,
} from "../../../../../constants/constant";

interface Props {
    firstName: string;
    status: string;
    setStatus: (a: string) => void;
    setImages: (a: any) => void;
    images: any;
    setPostPreview: (a: boolean) => void;
    setError: (a: string) => void;
}

const ImagePreview: React.FC<Props> = ({
    firstName,
    status,
    setStatus,
    setImages,
    images,
    setPostPreview,
    setError,
}) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const tempFiles = (e.target as HTMLInputElement).files;

        if (tempFiles) {
            let files = Array.from(tempFiles);
            files.forEach((img) => {
                if (!SUPPORTED_IMAGE_FORMAT.includes(img.type)) {
                    setError(
                        `${img.name} format is not supported, supported formats are png, jpeg, webp, gif`
                    );
                    files = files.filter((file) => file.name !== img.name);
                    return;
                }
                if (img.size > MAX_FILE_SIZE) {
                    setError(`${img.name} file too big`);
                    files = files.filter((file) => file.name !== img.name);
                    return;
                }
                const imageReader = new FileReader();
                imageReader.readAsDataURL(img);
                imageReader.onload = (readerEvent) => {
                    setImages((images: any) => [
                        ...images,
                        readerEvent.target?.result,
                    ]);
                };
            });
        }
    };
    return (
        <div className='image_preview'>
            <input
                type='file'
                ref={imageInputRef}
                accept='image/jpeg,image/png,image/gif,image.webp'
                hidden
                multiple
                onChange={handleInput}
            />
            <EmojiPickerBackground
                firstName={firstName}
                status={status}
                setStatus={setStatus}
                isAddingImage
            />

            <div className='image_preview_box'>
                {images && images.length > 0 ? (
                    <div className='image_preview_images'>
                        <div className='image_preview_actions'>
                            <div className='image_preview_action_left'>
                                <button
                                    className=''
                                    onClick={() =>
                                        imageInputRef.current?.click()
                                    }
                                >
                                    <i className='edit_icon'></i>
                                    Edit
                                </button>
                                <button
                                    className=''
                                    onClick={() =>
                                        imageInputRef.current?.click()
                                    }
                                >
                                    <i className='addPhoto_icon'></i>
                                    Add Photos/Videos
                                </button>
                            </div>
                            <div
                                className='image_preview_action_right '
                                onClick={() => setImages([])}
                            >
                                <i className='exit_icon'></i>
                            </div>
                        </div>
                        <div
                            className={`image_preview_image ${
                                images.length === 1
                                    ? "preview_1"
                                    : images.length === 2
                                    ? "preview_2"
                                    : images.length === 3
                                    ? "preview_3"
                                    : images.length === 4
                                    ? "preview_4"
                                    : images.length === 5
                                    ? "preview_5"
                                    : images.length % 2 !== 0
                                    ? "preview_odd"
                                    : "preview_even"
                            }`}
                        >
                            {images.map((img: any, i: number) => (
                                <img key={i} src={img} alt='' />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        className='image_preview_photo_box'
                        onClick={() => {
                            imageInputRef.current?.click();
                        }}
                    >
                        <div
                            className='image_preview_photo_icon'
                            onClick={(e) => {
                                e.stopPropagation();
                                setPostPreview(false);
                            }}
                        >
                            <i className='exit_icon'></i>
                        </div>
                        <div className='add_photo_video_item'>
                            <i className='addPhoto_icon'></i>
                            <p>Add Photos/Videos</p>
                            <p>or drag and drop</p>
                        </div>
                    </div>
                )}

                {/* <div className='image_preview_mobile_box'>
                    <div className='image_preview_mobile_icon'>
                        <i className='phone_icon '></i>
                        <p>Add photos from mobile device</p>
                    </div>
                    <button className='btn btn-grey'>Add</button>
                </div> */}
            </div>
        </div>
    );
};

export default ImagePreview;
