import { useRef, useState } from "react";
import { RootState } from "../../store/reducer";
import {
    Friends,
    FriendsActive,
    Gaming,
    Home,
    HomeActive,
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
import UserMenu from "./userMenu";
import SettingPrivacy from "./userMenu/SettingPrivacy";
import DisplayAndAccessiblity from "./userMenu/DisplayAccessiblity";
import useOutsideClick from "../../helpers/useOutsideClick";
import { Link } from "react-router-dom";

interface Props {
    page?: "home" | "profile" | "friends";
}
const Header: React.FC<Props> = ({ page }) => {
    const user = useSelector<RootState, UserResponse>((data) => data.user);
    const [showSearchArea, setShowSearchArea] = useState(false);
    const [showAllMenu, setShowAllMenu] = useState(false);
    const [userMenu, setUserMenu] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const accountRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useOutsideClick(userMenuRef, () => setUserMenu(0), accountRef);

    const color = "#65676b";
    const activeColor = "#1876f2";
    return (
        <div className='header'>
            <div className='header_left'>
                <Link className='header_left_logo' to={"/"}>
                    <Logo />
                </Link>
                <div
                    className='header_search'
                    onClick={() => setShowSearchArea(true)}
                >
                    <Search />
                    <input type='input' placeholder='Search in facebook' />
                </div>
            </div>
            {showSearchArea && (
                <SearchArea setShowSearchArea={setShowSearchArea} />
            )}

            <div className='header_middle'>
                <Link to='/' className={`icon hover1 home`}>
                    {page === "home" ? <HomeActive /> : <Home color={color} />}
                </Link>
                <Link to='/friends' className='icon hover1'>
                    {page === "friends" ? (
                        <FriendsActive />
                    ) : (
                        <Friends color={color} />
                    )}
                </Link>
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
                <div
                    className='account'
                    onClick={() =>
                        setUserMenu((prevState) => (prevState ? 0 : 1))
                    }
                    ref={accountRef}
                >
                    <img
                        src={user.picture}
                        alt='user_photo'
                        className={`account_photo ${
                            userMenu || page === "profile"
                                ? "header_account_active"
                                : ""
                        }`}
                        width={30}
                        height={30}
                    />
                </div>
            </div>

            {showAllMenu && (
                <AllMenuArea setShowAllMenu={setShowAllMenu} ref={menuRef} />
            )}
            <div ref={userMenuRef}>
                {userMenu === 1 && (
                    <UserMenu
                        picture={user.picture}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        setUserMenu={setUserMenu}
                    />
                )}
                {userMenu === 2 && <SettingPrivacy setUserMenu={setUserMenu} />}
                {userMenu === 3 && (
                    <DisplayAndAccessiblity setUserMenu={setUserMenu} />
                )}
            </div>
        </div>
    );
};
export default Header;
