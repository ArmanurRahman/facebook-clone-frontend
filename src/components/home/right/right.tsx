import { Dots, NewRoom, Search } from "../../../svg";
import "./right.css";

const RightHome: React.FC = () => {
    const color = "#65676b";
    return (
        <div className='home_right_container'>
            <p className='home_right_container_sponsored'>Sponsored</p>
            <div className='devider2'></div>
            <div className='home_right_container_contact'>
                <div className='home_right_container_head'>
                    <div className='home_right_container_head_title'>
                        <p>Contacts</p>
                        <div className='home_right_container_head_action'>
                            <NewRoom color={color} />
                            <Search color={color} />
                            <Dots color={color} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='home_right_profile'>
                <div className='home_right_profile_picture'>
                    <img
                        src='https://res.cloudinary.com/dt0gg98qf/image/upload/v1683094355/samples/facebook/arman_de7boy.jpg'
                        alt='author_pic'
                    />
                </div>
                <div className='home_right_profile_name'>Armanu Rahman</div>
            </div>
        </div>
    );
};

export default RightHome;
