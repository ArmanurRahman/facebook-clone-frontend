import { Return } from "../../../svg";

interface Props {
    setUserMenu: (a: number) => void;
}
const SettingPrivacy: React.FC<Props> = ({ setUserMenu }) => {
    return (
        <div className='user_menu_wrapper'>
            <div className='user_menu_option_header'>
                <div
                    className='user_menu_option_back'
                    onClick={() => setUserMenu(1)}
                >
                    <Return />
                </div>
                <div className='user_menu_option_title'>Setting & Privacy</div>
            </div>
            <div className='devider'></div>
            <div className='user_menu_option'>
                <div className='user_menu_icon'>
                    <i className='settings_filled_icon'></i>
                </div>
                <p className='user_menu_option_text'>Setting</p>
            </div>
            <div className='user_menu_option'>
                <div className='user_menu_icon'>
                    <i className='privacy_checkup_icon'></i>
                </div>
                <p className='user_menu_option_text'>Privacy Checkup</p>
            </div>
            <div className='user_menu_option'>
                <div className='user_menu_icon'>
                    <i className='privacy_shortcuts_icon'></i>
                </div>
                <p className='user_menu_option_text'>Privacy Shortcuts</p>
            </div>
            <div className='user_menu_option'>
                <div className='user_menu_icon'>
                    <i className='activity_log_icon'></i>
                </div>
                <p className='user_menu_option_text'>Activity log</p>
            </div>
            <div className='user_menu_option'>
                <div className='user_menu_icon'>
                    <i className='news_icon'></i>
                </div>
                <p className='user_menu_option_text'>News Feed Preferces</p>
            </div>
            <div className='user_menu_option'>
                <div className='user_menu_icon'>
                    <i className='language_icon'></i>
                </div>
                <p className='user_menu_option_text'>Language</p>
            </div>
        </div>
    );
};

export default SettingPrivacy;
