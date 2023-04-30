import { useRef, useState } from "react";
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
import SearchArea from "./searchArea";
import "./style.css";
import { useSelector } from "react-redux";
import AllMenuArea from "./allMenuArea";

const Header = () => {
    const user = useSelector<RootState, UserResponse>((data) => data.user);
    const [showSearchArea, setShowSearchArea] = useState(false);
    const [showAllMenu, setShowAllMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const color = "#65676b";
    const activeColor = "#1876f2";
    return (
        <div className='header'>
            <div className='header_left'>
                <Logo />
                <div className='header_search'>
                    <Search />
                    <input
                        type='input'
                        placeholder='Search in facebook'
                        onClick={() => setShowSearchArea(true)}
                    />
                </div>
            </div>
            {showSearchArea && (
                <SearchArea setShowSearchArea={setShowSearchArea} />
            )}

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
                <div
                    className='icon'
                    onClick={() => setShowAllMenu((prevState) => !prevState)}
                    ref={menuRef}
                >
                    <Menu color={showAllMenu ? activeColor : ""} />
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
            {showAllMenu && (
                <AllMenuArea setShowAllMenu={setShowAllMenu} ref={menuRef} />
            )}
        </div>
    );
};
export default Header;
