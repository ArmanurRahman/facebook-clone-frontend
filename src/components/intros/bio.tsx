import { ChangeEvent, useState } from "react";

interface Props {
    bio: string;
    isAddingBio: boolean;
    setShowEditBio: (a: boolean) => void;
}

const Bio: React.FC<Props> = ({ bio, isAddingBio, setShowEditBio }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [bioText, setBioText] = useState(bio);
    const [characterRemaning, setCharacterRemaining] = useState(
        100 - bio.length
    );

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length >= 101) {
            return;
        }
        setBioText(e.target.value);
        setCharacterRemaining(100 - e.target.value.length);
    };

    const onCancelHandler = () => {
        if (isAddingBio) {
            setShowEditBio(false);
        }
        setBioText("");
        setCharacterRemaining(100);
        setIsEditMode(false);
    };
    return (
        <div className='bio'>
            {!isEditMode && !isAddingBio ? (
                <div className='bio_text'>
                    <p>{bio}</p>
                    <button
                        className='btn btn-grey'
                        onClick={() => setIsEditMode(true)}
                    >
                        Edit Bio
                    </button>
                </div>
            ) : (
                <div className='bio_edit'>
                    <textarea
                        value={bioText}
                        onChange={onChangeHandler}
                    ></textarea>
                    <span>{characterRemaning} characters remaining</span>
                    <div className='bio_footer'>
                        <div className='bio_access'>
                            <img src='../../../icons/public.png' alt='' />
                            Public
                        </div>
                        <div className='bio_action'>
                            <button
                                className='btn btn-grey'
                                onClick={onCancelHandler}
                            >
                                Cancel
                            </button>
                            <button className='btn btn-blue'>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bio;
