import React, { useRef, useState } from "react";
import useOutsideClick from "../../helpers/useOutsideClick";

interface Props {
    isOwnProfile: boolean;
}

const Cover: React.FC<Props> = ({ isOwnProfile }) => {
    const [showCoverMenu, setShowCoverMenu] = useState(false);
    const coverMenuRef = useRef<HTMLDivElement>(null);
    const coverMenuBtnRef = useRef<HTMLDivElement>(null);
    useOutsideClick(
        coverMenuRef,
        () => setShowCoverMenu(false),
        coverMenuBtnRef
    );
    return (
        <div className='profile_container'>
            <div className='profile_cover'>
                <div className='profile_cover_photo'>
                    {isOwnProfile && (
                        <React.Fragment>
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

                            {showCoverMenu && (
                                <div
                                    className='profile_cover_photo_menu profile_cover_photo_menu_item'
                                    ref={coverMenuRef}
                                >
                                    <div className='profile_cover_photo_action hover3'>
                                        <i className='photo_icon'></i>
                                        <p>Select Photo</p>
                                    </div>
                                    <div className='profile_cover_photo_action hover3'>
                                        <i className='upload_icon'></i>
                                        <p>Upload Photo</p>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cover;
