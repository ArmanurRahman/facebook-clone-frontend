import EmojiPickerBackground from "./emojiPickerBackground";

interface Props {
    firstName: string;
    status: string;
    setStatus: (a: string) => void;
}

const ImagePreview: React.FC<Props> = ({ firstName, status, setStatus }) => {
    return (
        <div className='image_preview'>
            <EmojiPickerBackground
                firstName={firstName}
                status={status}
                setStatus={setStatus}
                isAddingImage
            />

            <div className='image_preview_box'>
                <div className='image_preview_photo_box'>
                    <div className='image_preview_photo_icon'>
                        <i className='exit_icon'></i>
                    </div>
                    <div className='add_photo_video_item'>
                        <i className='addPhoto_icon'></i>
                        <p>Add Photos/Videos</p>
                        <p>or drag and drop</p>
                    </div>
                </div>

                <div className='image_preview_mobile_box'>
                    <div className='image_preview_mobile_icon'>
                        <p>Add photos from mobile device</p>
                    </div>
                    <button className='btn btn-grey'>Add</button>
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
