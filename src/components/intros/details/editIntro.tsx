import EditComponent from "./editComponent";

interface Props {
    setShowEditComponent: (a: boolean) => void;
    intros: Intros;
}
const EditIntro: React.FC<Props> = ({ setShowEditComponent, intros }) => {
    return (
        <div className='blur'>
            <div className='edit_intro_container'>
                <div className='edit_intro_header'>
                    <p>Edit Details</p>
                    <div
                        className='edit_intro_header_icon'
                        onClick={() => setShowEditComponent(false)}
                    >
                        <i className='exit_icon'></i>
                    </div>
                </div>
                <div className='devider'></div>
                <div className='edit_intro_body'>
                    <div className='edit_intro_guide'>
                        <p>Customize Your Intro</p>
                        <span>Details you select will be public</span>
                    </div>

                    <EditComponent
                        title='Other Name'
                        items={[
                            {
                                text: intros.otherName || "",
                                name: "other name",
                                icon: "studies",
                                id: "otherName",
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditIntro;
