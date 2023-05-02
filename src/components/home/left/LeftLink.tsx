interface Props {
    image: string;
    name: string;
    notification?: string;
}

const LeftLink: React.FC<Props> = ({ image, name, notification }) => {
    return (
        <div className='home_left_link'>
            <div className='home_left_link_icon hover1'>
                <img src={`../../../left/${image}.png`} alt={image} />
                <div className='home_left_icon_details'>
                    <p className='home_left_icon_details_name'>{name}</p>
                    {notification && (
                        <div className='home_left_icon_details_notification'>
                            <div className='home_left_icon_details_notification_dot'></div>
                            <span className='home_left_icon_details_notification_text'>
                                {notification}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftLink;
