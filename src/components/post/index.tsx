import Moment from "react-moment";
import { Dots } from "../../svg";
import "./post.css";
import UserInteraction from "./UserInteraction";
import PostMenu from "./postMenu";
import { useRef, useState } from "react";
interface Props {
    post: Post;
    loginUser: string;
}

const Post: React.FC<Props> = ({ post, loginUser }) => {
    const { user } = post;
    const [showMenu, setShowMenu] = useState(false);
    const menuBtnRef = useRef<HTMLDivElement>(null);
    return (
        <div className='post_box'>
            <div className='post_header'>
                <div className='post_header_user'>
                    <img src={user.picture} alt='' />
                    <div className='post_header_user_name'>
                        <p>
                            {user.firstName} {user.lastName}
                        </p>
                        <div className='post_header_time'>
                            <Moment fromNow interval={30}>
                                {post.createdAt}
                            </Moment>
                            <img src='../../../icons/public.png' alt='' />
                        </div>
                    </div>
                </div>
                {post.type === "profilePicture" ? (
                    <div className='post_type'>{`${user.firstName} ${
                        user.lastName
                    } changed ${
                        user.gender === "male" ? "his" : "her"
                    } profile picture`}</div>
                ) : post.type === "cover" ? (
                    <div className='post_type'>{`${user.firstName} ${
                        user.lastName
                    } changed ${
                        user.gender === "male" ? "his" : "her"
                    } cover photo`}</div>
                ) : (
                    <></>
                )}

                <div className='post_header_action_menu'>
                    {showMenu && (
                        <PostMenu
                            loginUser={loginUser}
                            postUser={user._id}
                            isImage={
                                post.images ? post.images.length > 0 : false
                            }
                            setShowMenu={setShowMenu}
                            ref={menuBtnRef}
                        />
                    )}
                    <div
                        ref={menuBtnRef}
                        className='post_header_action hover2'
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <Dots color={"#e4e6eb"} />
                    </div>
                </div>
            </div>
            <div className='post_body'>
                {!post.images && !post.background && (
                    <div className='post_text'>{post.text}</div>
                )}
                {post.background && (
                    <div
                        className='post_with_bg'
                        style={{
                            backgroundImage: `url(${post.background})`,
                        }}
                    >
                        {post.text}
                    </div>
                )}
                {post.images && post.images.length && (
                    <div className=''>{post.text}</div>
                )}
                {post.images && post.images.length && (
                    <div
                        className={`post_with_images ${
                            post.images.length === 2
                                ? "preview_2"
                                : post.images.length === 3
                                ? "preview_3"
                                : post.images.length === 4
                                ? "preview_4"
                                : post.images.length === 5
                                ? "preview_5"
                                : post.images.length === 6
                                ? "preview_6"
                                : "preview_more_than_6"
                        }`}
                    >
                        {post.images.slice(0, 6).map((img, i) => {
                            if (i < 5 || post.images?.length === 6) {
                                return <img src={img.url} alt='' key={i} />;
                            } else {
                                return (
                                    <div
                                        className='preview_more_than_6_div'
                                        key={i}
                                    >
                                        <div>
                                            +
                                            {post.images &&
                                                post.images?.length - 6}
                                        </div>
                                        <img src={img.url} alt='' />
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
            <UserInteraction />
        </div>
    );
};
export default Post;
