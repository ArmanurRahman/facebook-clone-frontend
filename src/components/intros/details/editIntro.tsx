import EditComponent from "./editComponent";

interface Props {
    setShowEditComponent: (a: boolean) => void;
    intros: Intros;
}
const EditIntro: React.FC<Props> = ({ setShowEditComponent, intros }) => {
    return (
        <div className='blur'>
            <div className='edit_intro_container'>
                <div className='edit_intro_container_box'>
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
                        <EditComponent
                            title='Work'
                            items={[
                                {
                                    text: intros.job || "",
                                    name: "work",
                                    icon: "job",
                                    id: "job",
                                },
                                {
                                    text: intros.workplace || "",
                                    name: "workplace",
                                    icon: "job",
                                    id: "workplace",
                                },
                            ]}
                        />
                        <EditComponent
                            title='Education'
                            items={[
                                {
                                    text: intros.highSchool || "",
                                    name: "high school",
                                    icon: "studies",
                                    id: "highSchool",
                                },
                                {
                                    text: intros.college || "",
                                    name: "college",
                                    icon: "studies",
                                    id: "college",
                                },
                            ]}
                        />
                        <EditComponent
                            title='Current City'
                            items={[
                                {
                                    text: intros.currectCity || "",
                                    name: "current ciry",
                                    icon: "home",
                                    id: "currectCity",
                                },
                            ]}
                        />
                        <EditComponent
                            title='Hometown'
                            items={[
                                {
                                    text: intros.hometown || "",
                                    name: "hometown",
                                    icon: "home",
                                    id: "hometown",
                                },
                            ]}
                        />
                        <EditComponent
                            title='Relationship'
                            items={[
                                {
                                    text: intros.relationship || "",
                                    name: "relationship status",
                                    icon: "studies",
                                    id: "relationship",
                                    type: "select",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditIntro;
