import LeftLink from "./LeftLink";
import "./left.css";
import { left } from "../../../data/home";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";

interface Props {
    picture: string;
    firstName: string;
    lastName: string;
}

const LeftHome: React.FC<Props> = ({ picture, firstName, lastName }) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div className='home_left_container'>
            <div className='home_left_body'>
                <div className='home_left_profile'>
                    <div className='home_left_profile_picture'>
                        <img src={picture} alt='profile_pic' />
                    </div>
                    <div className='home_left_profile_name'>
                        {firstName} {lastName}
                    </div>
                </div>
                <div className='home_left_option'>
                    {left.slice(0, 8).map((item, i) => (
                        <LeftLink
                            image={item.img}
                            name={item.text}
                            key={i}
                            notification={item.notification}
                        />
                    ))}
                    {!showMore && (
                        <div
                            className='home_left_link_icon see_more hover1'
                            onClick={() => setShowMore(true)}
                        >
                            <ArrowDown1 />
                            <div className='home_left_icon_details'>
                                <p className='home_left_icon_details_name'>
                                    See more
                                </p>
                            </div>
                        </div>
                    )}

                    {showMore &&
                        left
                            .slice(0, 8)
                            .map((item, i) => (
                                <LeftLink
                                    image={item.img}
                                    name={item.text}
                                    key={i}
                                    notification={item.notification}
                                />
                            ))}
                    {showMore && (
                        <div
                            className='home_left_link_icon see_more hover1'
                            onClick={() => setShowMore(false)}
                        >
                            <div className='rotate360'>
                                <ArrowDown1 />
                            </div>
                            <div className='home_left_icon_details'>
                                <p className='home_left_icon_details_name'>
                                    See less
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='devider'></div>
            </div>

            <div className='home_letf_shortcut'>
                <p>Your shortcut</p>
                <div className='home_letf_shortcut_icon hover1'>
                    <img src='../../icons/linkin.png' alt='linkedin' />
                    <div className='home_left_icon_details'>
                        <p className='home_left_icon_details_name'>LinkedIn</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftHome;
