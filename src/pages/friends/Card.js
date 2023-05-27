import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    acceptRequest,
    cancelRequest,
    deleteRequest,
} from "../../function/user";

export default function Card({ userr, type, getData }) {
    const { user } = useSelector((state) => ({ ...state }));
    const cancelRequestHandler = async (userId) => {
        const res = await cancelRequest(userId, user.token);
        if (res === "ok") {
            getData();
        }
    };
    const confirmHandler = async (userId) => {
        const res = await acceptRequest(userId, user.token);
        if (res === "ok") {
            getData();
        }
    };
    const deleteHandler = async (userId) => {
        const res = await deleteRequest(userId, user.token);
        if (res === "ok") {
            getData();
        }
    };
    return (
        <div className='req_card'>
            <Link to={`/profile/${userr.userName}`}>
                <img src={userr.picture} alt='' />
            </Link>
            <div className='req_name'>
                {userr.firstName} {userr.lastName}
            </div>
            {type === "sent" ? (
                <button
                    className='btn btn-blue'
                    onClick={() => cancelRequestHandler(userr._id)}
                >
                    Cancel Request
                </button>
            ) : type === "request" ? (
                <>
                    <button
                        className='btn btn-blue'
                        onClick={() => confirmHandler(userr._id)}
                    >
                        Confirm
                    </button>
                    <button
                        className='btn btn-grey'
                        onClick={() => deleteHandler(userr._id)}
                    >
                        Delete
                    </button>
                </>
            ) : (
                ""
            )}
        </div>
    );
}
