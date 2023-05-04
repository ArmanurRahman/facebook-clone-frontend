import { useRef } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import * as actionType from "../../../store/action";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
    picture: string | undefined;
    firstName: string;
    lastName: string;
    setUserMenu: (a: number) => void;
}

const UserMenu: React.FC<UserMenuProps> = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { picture, firstName, lastName, setUserMenu } = props;
    const userMenuRef = useRef<HTMLDivElement>(null);

    const logoutHandler = () => {
        dispatch({ type: actionType.LOGOUT });
        Cookies.set("user", "");
        navigate("/login");
    };
    return (
        <div className='user_menu_wrapper' ref={userMenuRef}>
            <div className='user_menu_profile'>
                <div className='user_menu_profile_image'>
                    <img
                        src={picture}
                        alt='ProfilePictire'
                        width={50}
                        height={50}
                    />
                </div>
                <div className='user_menu_profile_details'>
                    <p className='user_menu_profile_details_name'>
                        {firstName} {lastName}
                    </p>
                    <p className='user_menu_profile_details_see_profle'>
                        See your profile
                    </p>
                </div>
            </div>
            <div className='devider'></div>
            <div className='user_menu_feedback'>
                <div className='user_menu_icon'>
                    <i className='report_filled_icon'></i>
                </div>
                <div className='user_menu_feedback_details'>
                    <p className='user_menu_feedback_title'>Give feedback</p>
                    <p className='user_menu_feedback_help'>
                        Help us improve facebook
                    </p>
                </div>
            </div>
            <div className='devider'></div>
            <div className='user_menu_option' onClick={() => setUserMenu(2)}>
                <div className='user_menu_icon'>
                    <i className='settings_filled_icon'></i>
                </div>
                <p className='user_menu_option_text'>Setting & Privacy</p>
                <div className='user_menu_option_right_icon'>
                    <div className='right_icon'></div>
                </div>
            </div>
            <div className='user_menu_option'>
                <div className='user_menu_icon'>
                    <i className='help_filled_icon'></i>
                </div>
                <p className='user_menu_option_text'>Help & Support</p>
                <div className='user_menu_option_right_icon'>
                    <div className='right_icon'></div>
                </div>
            </div>
            <div className='user_menu_option' onClick={() => setUserMenu(3)}>
                <div className='user_menu_icon'>
                    <i className='settings_filled_icon'></i>
                </div>
                <p className='user_menu_option_text'>Display & Accessiblity</p>
                <div className='user_menu_option_right_icon'>
                    <div className='right_icon'></div>
                </div>
            </div>
            <div className='user_menu_option' onClick={logoutHandler}>
                <div className='user_menu_icon'>
                    <i className='logout_filled_icon'></i>
                </div>
                <p className='user_menu_option_text'>Logout</p>
                <div className='user_menu_option_right_icon'>
                    <div className='right_icon'></div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
