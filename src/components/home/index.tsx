import { useSelector } from "react-redux";
import LeftHome from "./left/Left";
import "./style.css";
import { RootState } from "../../store/reducer";
import RightHome from "./right/right";
import HomeMiddle from "./middle";

const Home = () => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    return (
        <div className='home_container'>
            <LeftHome
                picture={user.picture}
                firstName={user.firstName}
                lastName={user.lastName}
            />
            <HomeMiddle picture={user.picture} />
            <RightHome />
        </div>
    );
};

export default Home;
