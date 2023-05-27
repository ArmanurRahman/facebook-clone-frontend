import { useSelector } from "react-redux";
import LeftHome from "./left/Left";
import "./style.css";
import { RootState } from "../../store/reducer";
import RightHome from "./right/right";
import HomeMiddle from "./middle";
import { useMediaQuery } from "react-responsive";

interface Props {
    posts: Array<Post>;
    postDispatch?: any;
}

const Home: React.FC<Props> = ({ posts, postDispatch }) => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const query950px = useMediaQuery({
        query: "(max-width: 900px)",
    });
    const query485px = useMediaQuery({
        query: "(max-width: 485px)",
    });
    return (
        <div className='home_container'>
            {!query485px && (
                <LeftHome
                    picture={user.picture}
                    firstName={user.firstName}
                    lastName={user.lastName}
                />
            )}

            <HomeMiddle
                picture={user.picture}
                verified={user.verified}
                firstName={user.firstName}
                lastName={user.lastName}
                userId={user.id}
                token={user.token}
                userName={user.userName}
                posts={posts}
                postDispatch={postDispatch}
            />
            {!query950px && <RightHome />}
        </div>
    );
};

export default Home;
