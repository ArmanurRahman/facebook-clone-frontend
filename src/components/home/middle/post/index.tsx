import { useState } from "react";
import { Feeling, LiveVideo, Photo } from "../../../../svg";
import "./style.css";
import PostPopup from "./popup";

interface Props {
    picture: string;
    firstName: string;
    lastName: string;
}
const HomePost: React.FC<Props> = ({ picture, firstName, lastName }) => {
    const [showPostPopup, setShowPostPopup] = useState(false);
    return (
        <div className='home_post_container'>
            <div className='home_post'>
                <div className='home_post_picture'>
                    <img src={picture} alt='profile_picture' />
                    <div className='home_post_input'>
                        <input
                            type='text'
                            placeholder="What's on your mind?"
                            onClick={() => setShowPostPopup(true)}
                        />
                    </div>
                </div>
                <div className='devider2'></div>
                <div className='home_post_action'>
                    <div className='home_post_action_item hover1'>
                        <LiveVideo color={"#f3425f"} />
                        Live Video
                    </div>
                    <div className='home_post_action_item hover1'>
                        <Photo color={"#4bbf67"} />
                        Photo.video
                    </div>
                    <div className='home_post_action_item hover1'>
                        <Feeling color={"#f7b928"} />
                        Feeling/activity
                    </div>
                </div>
            </div>
            {showPostPopup && (
                <PostPopup
                    picture={picture}
                    firstName={firstName}
                    lastName={lastName}
                />
            )}
        </div>
    );
};

export default HomePost;
