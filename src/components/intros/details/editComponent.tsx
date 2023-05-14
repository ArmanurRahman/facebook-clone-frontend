import { useState } from "react";
import { getProfile, updateUserDetails } from "../../../function/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";

interface Item {
    icon: string;
    text: string;
    name: string;
    id: string;
}
interface Props {
    title: string;
    items: Array<Item>;
}

const RenderItem: React.FC<Item> = ({ icon, text, name, id }) => {
    const [newText, setNewText] = useState("");
    const [showEditPanel, setShowEditPanel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const user = useSelector<RootState, UserResponse>((state) => state.user);

    const onCancelHandler = () => {
        setNewText("");
        setShowEditPanel(false);
    };

    const onSaveHandler = async () => {
        try {
            setLoading(true);
            const res = await updateUserDetails(id, newText, user.token);

            if (res === "ok") {
                setLoading(false);
            } else {
                setError(res);
            }
            const { data } = await getProfile(user.userName, user.token);
            setLoading(false);
        } catch (error: any) {
            console.log(error.response.data.error);
            setLoading(false);
        }
    };
    return (
        <div className='intro_item_component'>
            <div className='intro_item'>
                {!text ? (
                    <div className='intro_add_box'>
                        <i
                            className='rounded_plus_icon'
                            onClick={() => setShowEditPanel(true)}
                        ></i>
                        <p onClick={() => setShowEditPanel(true)}>{name}</p>
                    </div>
                ) : (
                    <div className='intro_show_box'>
                        <div className='intro_show_box_details'>
                            <img src={`../../../icons/${icon}.png`} alt='' />
                            <p>{text}</p>
                        </div>

                        <i
                            className='edit_icon'
                            onClick={() => setShowEditPanel(true)}
                        ></i>
                    </div>
                )}
            </div>
            {showEditPanel && (
                <div className='bio_edit'>
                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder={`Add ${name}`}
                    ></textarea>
                    <div className='bio_footer'>
                        <div className='bio_access'>
                            <img src='../../../icons/public.png' alt='' />
                            Public
                        </div>
                        <div className='bio_action'>
                            <button
                                className='btn btn-grey'
                                onClick={onCancelHandler}
                            >
                                Cancel
                            </button>
                            <button
                                className='btn btn-blue'
                                onClick={onSaveHandler}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
const EditComponent: React.FC<Props> = ({ title, items }) => {
    return (
        <div className='edit_component_box'>
            <div className='edit_component_title'>{title}</div>
            <div className='edit_component_body'>
                {items.map((item, i) => (
                    <RenderItem
                        key={i}
                        icon={item.icon}
                        name={item.name}
                        text={item.text}
                        id={item.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default EditComponent;
