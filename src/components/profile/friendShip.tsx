import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    acceptRequest,
    addFriend,
    cancelRequest,
    deleteRequest,
    follow,
    unfollow,
    unfriend,
} from "../../function/user";
import useOutsideClick from "../../helpers/useOutsideClick";
import { RootState } from "../../store/reducer";

const Friendship = ({
    friendshipObj,
    profileid,
}: {
    friendshipObj: Friendship;
    profileid: string;
}) => {
    const [friendship, setFriendship] = useState(friendshipObj);
    useEffect(() => {
        setFriendship(friendshipObj);
    }, [friendshipObj]);
    const [friendsMenu, setFriendsMenu] = useState(false);
    const [respondMenu, setRespondMenu] = useState(false);
    const menu = useRef(null);
    const menu1 = useRef(null);
    const respondRef = useRef<HTMLButtonElement>(null);
    useOutsideClick(menu, () => setFriendsMenu(false));
    useOutsideClick(menu1, () => setRespondMenu(false), respondRef);
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const addFriendHandler = async () => {
        setFriendship({ ...friendship, requestSent: true, following: true });
        if (user.token) {
            await addFriend(profileid, user.token);
        }
    };
    const cancelRequestHandler = async () => {
        setFriendship({ ...friendship, requestSent: false, following: false });
        if (user.token) {
            await cancelRequest(profileid, user.token);
        }
    };
    const followHandler = async () => {
        setFriendship({ ...friendship, following: true });
        if (user.token) {
            await follow(profileid, user.token);
        }
    };
    const unfollowHandler = async () => {
        setFriendship({ ...friendship, following: false });
        if (user.token) {
            await unfollow(profileid, user.token);
        }
    };
    const acceptRequestHanlder = async () => {
        setFriendship({
            ...friendship,
            friends: true,
            following: true,
            requestSent: false,
            requestReceived: false,
        });
        if (user.token) {
            await acceptRequest(profileid, user.token);
        }
    };
    const unfriendHandler = async () => {
        setFriendship({
            ...friendship,
            friends: false,
            following: false,
            requestSent: false,
            requestReceived: false,
        });
        if (user.token) {
            await unfriend(profileid, user.token);
        }
    };
    const deleteRequestHanlder = async () => {
        setFriendship({
            ...friendship,
            friends: false,
            following: false,
            requestSent: false,
            requestReceived: false,
        });
        if (user.token) {
            await deleteRequest(profileid, user.token);
        }
    };

    return (
        <div className='friendship'>
            {friendship?.friends ? (
                <div className='friends_menu_wrap'>
                    <button
                        className='btn btn-grey'
                        onClick={() => setFriendsMenu(true)}
                    >
                        <img src='../../../icons/friends.png' alt='' />
                        <span>Friends</span>
                    </button>
                    {friendsMenu && (
                        <div className='open_cover_menu' ref={menu}>
                            <div className='open_cover_menu_item hover3'>
                                <img
                                    src='../../../icons/favoritesOutline.png'
                                    alt=''
                                />
                                Favorites
                            </div>
                            <div className='open_cover_menu_item hover3'>
                                <img
                                    src='../../../icons/editFriends.png'
                                    alt=''
                                />
                                Edit Friend list
                            </div>
                            {friendship?.following ? (
                                <div
                                    className='open_cover_menu_item hover3'
                                    onClick={() => unfollowHandler()}
                                >
                                    <img
                                        src='../../../icons/unfollowOutlined.png'
                                        alt=''
                                    />
                                    Unfollow
                                </div>
                            ) : (
                                <div
                                    className='open_cover_menu_item hover3'
                                    onClick={() => followHandler()}
                                >
                                    <img
                                        src='../../../icons/follow.png'
                                        alt=''
                                    />
                                    Follow
                                </div>
                            )}
                            <div
                                className='open_cover_menu_item hover3'
                                onClick={() => unfriendHandler()}
                            >
                                <i className='unfriend_outlined_icon'></i>
                                Unfriend
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                !friendship?.requestSent &&
                !friendship?.requestReceived && (
                    <button
                        className='btn btn-blue'
                        onClick={() => addFriendHandler()}
                    >
                        <img
                            src='../../../icons/addFriend.png'
                            alt=''
                            className='invert'
                        />
                        <span>Add Friend</span>
                    </button>
                )
            )}
            {friendship?.requestSent ? (
                <button
                    className='btn btn-blue'
                    onClick={() => cancelRequestHandler()}
                >
                    <img
                        src='../../../icons/cancelRequest.png'
                        className='invert'
                        alt=''
                    />
                    <span>Cancel Request</span>
                </button>
            ) : (
                friendship?.requestReceived && (
                    <div className='friends_menu_wrap'>
                        <button
                            className='btn btn-grey'
                            onClick={() => setRespondMenu((prev) => !prev)}
                            ref={respondRef}
                        >
                            <img src='../../../icons/friends.png' alt='' />
                            <span>Respond</span>
                        </button>
                        {respondMenu && (
                            <div className='open_cover_menu' ref={menu1}>
                                <div
                                    className='open_cover_menu_item hover3'
                                    onClick={() => acceptRequestHanlder()}
                                >
                                    Confirm
                                </div>
                                <div
                                    className='open_cover_menu_item hover3'
                                    onClick={() => deleteRequestHanlder()}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                )
            )}
            <div className='flex'>
                {friendship?.following ? (
                    <button
                        className='btn btn-grey'
                        onClick={() => unfollowHandler()}
                    >
                        <img src='../../../icons/follow.png' alt='' />
                        <span>Following</span>
                    </button>
                ) : (
                    <button
                        className='btn btn-blue'
                        onClick={() => followHandler()}
                    >
                        <img
                            src='../../../icons/follow.png'
                            className='invert'
                            alt=''
                        />
                        <span>Follow</span>
                    </button>
                )}
                <button
                    className={
                        friendship?.friends ? "btn btn-blue" : "btn btn-grey"
                    }
                >
                    <img
                        src='../../../icons/message.png'
                        className={friendship?.friends ? "invert" : ""}
                        alt=''
                    />
                    <span>Message</span>
                </button>
            </div>
        </div>
    );
};

export default Friendship;
