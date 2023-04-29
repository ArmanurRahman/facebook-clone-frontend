import { RootState } from "../../store/reducer";
import {
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
    console.log(user);
    return (
        <div className='header'>
            <div className='header_left'>
                <Logo />
                <div className='header_search'>
                    <Search />
                    <input type='input' />
                </div>
            </div>
            <div className='header_middle'>
                <div className='icon hover1 active'>
                    <Home />
                </div>
                <div className='icon hover1'>
                    <Watch />
                </div>
                <div className='icon hover1'>
                    <Market />
                </div>
                <div className='icon hover1'>
                    <Gaming />
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
