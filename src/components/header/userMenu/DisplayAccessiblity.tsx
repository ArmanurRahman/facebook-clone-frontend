import { Return } from "../../../svg";

interface Props {
    setUserMenu: (a: number) => void;
}

const DisplayAndAccessiblity: React.FC<Props> = ({ setUserMenu }) => {
    return (
        <div className='user_menu_wrapper'>
            <div className='user_menu_option_header'>
                <div
                    className='user_menu_option_back'
                    onClick={() => setUserMenu(1)}
                >
                    <Return />
                </div>
                <div className='user_menu_option_title'>
                    Display & Accessibility
                </div>
            </div>
            <div className='devider'></div>
            <div className='user_menu_display_option'>
                <div className='user_menu_option_item'>
                    <div className='user_menu_icon'>
                        <i className='dark_filled_icon'></i>
                    </div>
                    <div className='user_menu_option_item_header'>
                        <div className='user_menu_option_item_details'>
                            <p className='user_menu_option_item_details_title'>
                                Dark Mode
                            </p>
                            <p className='user_menu_option_item_details_help'>
                                Adjust the appearence of facebook to reduce
                                glare and give eye a break.
                            </p>
                            <label
                                htmlFor='darkOff'
                                className='user_menu_option_display_radio'
                            >
                                Off
                                <input
                                    type='radio'
                                    id='darkOff'
                                    name='darkMode'
                                    value='Off'
                                />
                            </label>
                            <label
                                htmlFor='darkOn'
                                className='user_menu_option_display_radio'
                            >
                                On
                                <input
                                    type='radio'
                                    id='darkOn'
                                    name='darkMode'
                                    value='On'
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='user_menu_option_item'>
                    <div className='user_menu_icon'>
                        <i className='compact_icon'></i>
                    </div>
                    <div className='user_menu_option_item_header'>
                        <div className='user_menu_option_item_details'>
                            <p className='user_menu_option_item_details_title'>
                                Comoact Mode
                            </p>
                            <p className='user_menu_option_item_details_help'>
                                Make your font smaller so that more content can
                                be fit in screen.
                            </p>
                            <label
                                htmlFor='compactOff'
                                className='user_menu_option_display_radio'
                            >
                                Off
                                <input
                                    type='radio'
                                    id='compactOff'
                                    name='compactMode'
                                    value='Off'
                                />
                            </label>
                            <label
                                htmlFor='compactOn'
                                className='user_menu_option_display_radio'
                            >
                                On
                                <input
                                    type='radio'
                                    id='compactOn'
                                    name='compactMode'
                                    value='On'
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='user_menu_option'>
                    <div className='user_menu_icon'>
                        <i className='keyboard_icon'></i>
                    </div>
                    <p className='user_menu_option_text'>Keyboard</p>
                    <div className='user_menu_option_right_icon'>
                        <div className='right_icon'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayAndAccessiblity;
