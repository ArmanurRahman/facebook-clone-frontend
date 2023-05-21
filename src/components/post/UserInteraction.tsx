import { useEffect, useState } from "react";
import ReactPopup from "./reactPopup";
import CreateComment from "./createComment";
import { reactPost, getReacts } from "../../function/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Comment from "./comments";

interface Props {
    postId: string;
    postComments: any;
    setIsSavePost: (a: boolean) => void;
}
const UserInteraction: React.FC<Props> = ({
    postId,
    postComments,
    setIsSavePost,
}) => {
    const [showReact, setShowReact] = useState(false);
    const [reacts, setReacts] = useState<any>();
    const [check, setCheck] = useState<any>();
    const [total, setTotal] = useState(0);
    const [selectedReact, setSelectedReact] = useState("");
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(1);

    const user = useSelector<RootState, UserResponse>((state) => state.user);
    useEffect(() => {
        getPostReacts();
    }, []);

    useEffect(() => {
        setComments(postComments);
    }, [postComments]);

    const getPostReacts = async () => {
        const res = await getReacts(postId, user?.token || "");
        setReacts(res.reacts);
        setCheck(res.check);
        setTotal(res.total);
        setSelectedReact(res.check);
        setIsSavePost(res.checkSaved);
    };

    const reactHandler = async (type: string) => {
        console.log(type);
        setSelectedReact(type);
        reactPost(postId, type, user?.token || "");
        if (!reacts) {
            return;
        }
        if (check === type) {
            setSelectedReact("");
            setCheck(null);
            let index = reacts.findIndex((x: any) => x.react === check);
            if (index !== -1) {
                const newReact = [...reacts];
                newReact[index].count = newReact[index].count - 1;
                setReacts(newReact);
                setTotal((prev) => --prev);
            }
        } else {
            let index = reacts.findIndex((x: any) => x.react === type);
            let index1 = reacts.findIndex((x: any) => x.react === check);
            if (index !== -1) {
                const newReact = [...reacts];
                newReact[index].count = newReact[index].count + 1;
                setReacts(newReact);
                setTotal((prev) => ++prev);
            }
            if (index1 !== -1) {
                const newReact = [...reacts];
                newReact[index1].count = newReact[index1].count - 1;
                setReacts(newReact);
                setTotal((prev) => --prev);
            }
            setCheck(type);
        }
    };

    const showMore = () => {
        setCount((prev) => prev + 3);
    };
    return (
        <div className='user_interaction_container'>
            <div className='user_interaction_result_section'>
                <div className='user_interaction_likes'>
                    {reacts &&
                        reacts
                            .sort((a: any, b: any) => {
                                return b.count - a.count;
                            })
                            .slice(0, 3)
                            .map(
                                (react: any, i: number) =>
                                    react.count > 0 && (
                                        <img
                                            src={`../../../reacts/${react.react}.svg`}
                                            alt=''
                                            key={i}
                                        />
                                    )
                            )}
                    <div className='reacts_count_num'>{total > 0 && total}</div>
                </div>
                <p className='user_interaction_comments'>
                    {comments.length || 0} comments
                </p>
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
                    {showReact && (
                        <ReactPopup
                            setShowReact={setShowReact}
                            reactHandler={reactHandler}
                        />
                    )}
                    {selectedReact ? (
                        <img
                            src={`../../../reacts/${selectedReact}.svg`}
                            alt=''
                            className=''
                            style={{ width: "18px" }}
                        />
                    ) : (
                        <i className='like_icon'></i>
                    )}
                    <span
                        style={{
                            textTransform: "capitalize",
                            color: `
                            ${
                                check === "like"
                                    ? "#4267b2"
                                    : check === "love"
                                    ? "#f63459"
                                    : check === "haha"
                                    ? "#f7b125"
                                    : check === "sad"
                                    ? "#f7b125"
                                    : check === "wow"
                                    ? "#f7b125"
                                    : check === "angry"
                                    ? "#e4605a"
                                    : ""
                            }
                            `,
                        }}
                    >
                        {check ? check : "Like"}
                    </span>
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
            <CreateComment
                userName={user.userName}
                token={user.token || ""}
                postId={postId}
                setComments={setComments}
            />
            <div className='user_interaction_comments_section'>
                {comments &&
                    comments
                        .sort((a: any, b: any) => {
                            return (
                                new Date(b.commentAt).valueOf() -
                                new Date(a.commentAt).valueOf()
                            );
                        })
                        .slice(0, count)
                        .map((comment, i) => (
                            <Comment comment={comment} key={i} />
                        ))}
                {count < comments.length && (
                    <div className='view_comments' onClick={() => showMore()}>
                        View more comments
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInteraction;
