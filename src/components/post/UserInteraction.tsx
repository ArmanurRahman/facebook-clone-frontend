import { useState } from "react";
import ReactPopup from "./reactPopup";
import CreateComment from "./createComment";

const UserInteraction = () => {
    const [showReact, setShowReact] = useState(false);

    return (
        <div className='user_interaction_container'>
            <div className='user_interaction_result_section'>
                <div className='user_interaction_likes'>5likes</div>
                <p className='user_interaction_comments'>5 comments</p>
                <p className='user_interaction_shares'>1 shares</p>
            </div>
            <div className='devider'></div>
            <div className='user_interaction_user_actions'>
                <div
                    className='user_interaction_user_action  hover3'
                    onMouseOver={() => {
                        setTimeout(() => {
                            setShowReact(true);
                        }, 500);
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setShowReact(false);
                        }, 500);
                    }}
                >
                    {showReact && <ReactPopup setShowReact={setShowReact} />}
                    <i className='like_icon'></i> like
                </div>
                <div className='user_interaction_user_action hover3'>
                    <i className='comment_icon'></i>
                    comment
                </div>
                <div className='user_interaction_user_action hover3'>
                    <i className='share_icon'></i>
                    share
                </div>
            </div>
            <div className='devider'></div>
            <CreateComment />
            <div className='user_interaction_comments_section'></div>
        </div>
    );
};

export default UserInteraction;
