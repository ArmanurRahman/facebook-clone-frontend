import { forwardRef, useRef, useState } from "react";
import useOutsideClick from "../../helpers/useOutsideClick";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { savePost, deletePost } from "../../function/post";
import { saveAs } from "file-saver";

interface MenuItemProps {
    title: string;
    image?: string;
    icon?: string;
    subtitle?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    title,
    image,
    icon,
    subtitle,
}) => {
    return (
        <li className='post_menu_item'>
            <div className='post_menu_item_image'>
                {image ? <img src={image} alt='' /> : <i className={icon}></i>}
            </div>
            <div className='post_menu_item_text'>
                <p>{title}</p>
                {subtitle && <span>{subtitle}</span>}
            </div>
        </li>
    );
};

interface Props {
    loginUser: string;
    postUser: string;
    isImage: boolean;
    setShowMenu: (a: boolean) => void;
    post: Post;
    isSavePost: boolean;
    setIsSavePost: (a: boolean) => void;
    ref: any;
    images?: Array<PostPicture>;
    postDispatch: any;
}
const PostMenu: React.FC<Props> = forwardRef((props, ref) => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const {
        loginUser,
        postUser,
        isImage,
        setShowMenu,
        post,
        isSavePost,
        setIsSavePost,
        images,
        postDispatch,
    } = props;
    const isOwnPost = useState(loginUser === postUser)[0];
    const postMenuRef = useRef<HTMLDivElement>(null);
    useOutsideClick(postMenuRef, () => setShowMenu(false), ref);

    const saveHandler = async () => {
        const res = await savePost(post._id, user.token || "");
        if (res.message === "ok") {
            if (isSavePost) {
                setIsSavePost(false);
            } else {
                setIsSavePost(true);
            }
        }
    };
    const onPictureDownload = async () => {
        if (images) {
            images.forEach((item) => {
                saveAs(item.url, `${Date.now()}.jpg`);
            });
        }
    };

    const deletePostHandler = async () => {
        const res = await deletePost(post._id, user.token || "");
        if (res.message === "ok") {
            postDispatch({ type: "POST_DELETED", payload: post._id });
        }
    };
    return (
        <div className='post_menu_container' ref={postMenuRef}>
            <ul>
                {isOwnPost && <MenuItem icon='pin_icon' title='Pin post' />}
                <div onClick={saveHandler}>
                    <MenuItem
                        icon='save_icon'
                        title={`${isSavePost ? "Unsave" : "Save"} post`}
                        subtitle='Add this to your save item'
                    />
                </div>

                <div className='line'></div>
                {isOwnPost && <MenuItem icon='edit_icon' title='Edit post' />}
                {!isOwnPost && (
                    <MenuItem
                        icon='turnOnNotification_icon'
                        title='Turn on notification for this post'
                    />
                )}
                {isImage && (
                    <div onClick={onPictureDownload}>
                        <MenuItem icon='download_icon' title='Download' />
                    </div>
                )}
                {isImage && (
                    <MenuItem icon='fullscreen_icon' title='Full Screen' />
                )}
                {isOwnPost && (
                    <MenuItem
                        image='../../../icons/lock.png'
                        title='Edit audience'
                    />
                )}
                {isOwnPost && (
                    <MenuItem
                        icon='turnOffNotifications_icon'
                        title='Turn off notification for this post'
                    />
                )}
                {isOwnPost && (
                    <MenuItem icon='delete_icon' title='Turn off translation' />
                )}
                {isOwnPost && <MenuItem icon='date_icon' title='Edit date' />}
                {isOwnPost && (
                    <MenuItem
                        icon='refresh_icon'
                        title='Refresh share attachment'
                    />
                )}
                {isOwnPost && (
                    <MenuItem icon='archive_icon' title='Move to archive' />
                )}
                {isOwnPost && (
                    <div onClick={deletePostHandler}>
                        <MenuItem
                            icon='trash_icon'
                            title='Move to trash'
                            subtitle='Item in your trash are deleted after 10days'
                        />
                    </div>
                )}
                {!isOwnPost && <div className='line'></div>}
                {!isOwnPost && (
                    <MenuItem
                        image='../../../icons/report.png'
                        title='Report post'
                        subtitle='I am concert about this post'
                    />
                )}
            </ul>
        </div>
    );
});

export default PostMenu;
