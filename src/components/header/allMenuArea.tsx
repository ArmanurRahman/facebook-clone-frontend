import MenuItem from "./menuItem";
import { menu, create } from "../../data/allMenu";
import { useRef, forwardRef } from "react";
import useOutsideClick from "../../helpers/useOutsideClick";

interface Props {
    setShowAllMenu: (a: boolean) => void;
    ref: any;
}
const AllMenuArea: React.FC<Props> = forwardRef((props, ref) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideClick(menuRef, () => props.setShowAllMenu(false), ref);
    return (
        <div className='all_menu_area' ref={menuRef}>
            <div className='all_menu_title'>Menu</div>
            <div className='all_menu_body'>
                <div className='all_menu_left'>
                    <div>
                        <p className='all_menu_left_category'>Social</p>
                        {menu.Test.map((item, index) => (
                            <MenuItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                        <div className='devider'></div>
                    </div>
                    <div>
                        <p className='all_menu_left_category'>Entertainment</p>
                        {menu.Game.map((item, index) => (
                            <MenuItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                        <div className='devider'></div>
                    </div>
                    <div>
                        <p className='all_menu_left_category'>Shopping</p>
                        {menu.Shopping.map((item, index) => (
                            <MenuItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                        <div className='devider'></div>
                    </div>
                    <div>
                        <p className='all_menu_left_category'>Personal</p>
                        {menu.Personal.map((item, index) => (
                            <MenuItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                        <div className='devider'></div>
                    </div>
                    <div>
                        <p className='all_menu_left_category'>Professional</p>
                        {menu.Professional.map((item, index) => (
                            <MenuItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                        <div className='devider'></div>
                    </div>
                    <div>
                        <p className='all_menu_left_category'>Other in meta</p>
                        {menu["Other in meta"].map((item, index) => (
                            <MenuItem
                                key={index}
                                name={item.name}
                                description={item.description}
                                icon={item.icon}
                            />
                        ))}
                        <div className='devider'></div>
                    </div>
                </div>
                <div className='all_menu_right'>
                    <p className='all_menu_right_category'>Action</p>
                    {create.map((item, index) => (
                        <div className='right_menu_item' key={index}>
                            <div className='right_menu_item_icon'>
                                <i className={`${item.icon}`}></i>
                            </div>
                            <p className='left_menu_text'>{`${item.name}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default AllMenuArea;
