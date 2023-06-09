import { useState } from "react";
import HomePost from "./post";
import Stories from "./stories";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import axios from "axios";
import Post from "../../post";

const VerifyWarning = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const resendVerificationHandler = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/user/resendValidationEmail`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setError("");
            setSuccess(data.message);
        } catch (error: any) {
            setSuccess("");
            setError(error.response.data.message);
        }
    };
    return (
        <div className='verify_warning_container'>
            <p className='verification_warning_message'>
                Your account is not verify. Verify your account before it get
                deleted after a month from creation
            </p>
            <div
                className='resend_verification'
                onClick={resendVerificationHandler}
            >
                click here to resend verification email
            </div>
            {success && <div className='success_message'>{success}</div>}
            {error && <div className='error_message'>{error}</div>}
        </div>
    );
};

interface Props {
    picture: string;
    verified: boolean | undefined;
    firstName: string;
    lastName: string;
    userId: string;
    token?: string;
    userName: string;
    posts: Array<Post>;
    postDispatch: any;
}
const HomeMiddle: React.FC<Props> = ({
    picture,
    verified,
    firstName,
    lastName,
    userId,
    token,
    userName,
    posts,
    postDispatch,
}) => {
    return (
        <div className='home_middle_container'>
            <Stories picture={picture} />
            {!verified && <VerifyWarning />}
            <HomePost
                picture={picture}
                firstName={firstName}
                lastName={lastName}
                userId={userId}
                token={token}
                userName={userName}
                postDispatch={postDispatch}
            />
            <div className='post_container'>
                {posts.map((post) => (
                    <Post
                        post={post}
                        key={post._id}
                        loginUser={userId}
                        postDispatch={postDispatch}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeMiddle;
