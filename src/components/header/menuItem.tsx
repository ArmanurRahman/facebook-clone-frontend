interface Props {
    name: string;
    description: string;
    icon: string;
}

const MenuItem: React.FC<Props> = ({ name, description, icon }) => {
    return (
        <div className='menu_item'>
            <div className='menu_item_icon_container'>
                <img
                    className='menu_item_icon'
                    src={`../../left/${icon}.png`}
                    alt='campus'
                />
            </div>

            <div className='menu_item_details'>
                <div className='menu_item_name'>{name}</div>
                <div className='menu_item_description'>{description}</div>
            </div>
        </div>
    );
};

export default MenuItem;
