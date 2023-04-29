import { RootState } from "../../store/reducer";
import {
    Friends,
    Gaming,
    Home,
    Logo,
    Market,
    Menu,
    Messenger,
    Notifications,
    Search,
    Watch,
} from "../../svg";
import "./style.css";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector<RootState, UserResponse>((data) => data.user);
    const color = "#65676b";
    return (
        <div className='header'>
            <div className='header_left'>
                <Logo />
                <div className='header_search'>
                    <Search />
                    <input type='input' placeholder='Search in facebook' />
                </div>
            </div>
            <div className='header_middle'>
                <div className='icon hover1 active'>
                    <Home color={color} />
                </div>
                <div className='icon hover1'>
                    <Friends color={color} />
                </div>
                <div className='icon hover1'>
                    <Watch color={color} />
                </div>

                <div className='icon hover1'>
                    <Market color={color} />
                </div>
                <div className='icon hover1'>
                    <div className='icon_inner'>
                        <span className='header_tag'>9+</span>
                        <Gaming color={color} />
                    </div>
                </div>
            </div>
            <div className='header_right'>
                <div className='icon'>
                    <Menu />
                </div>
                <div className='icon'>
                    <Messenger />
                </div>
                <div className='icon'>
                    <Notifications />
                </div>
                <div className='account'>
                    <img
                        src={user.picture}
                        alt='user_photo'
                        className='account_photo'
                        width={30}
                        height={30}
                    />
                </div>
            </div>
        </div>
    );
};
export default Header;
