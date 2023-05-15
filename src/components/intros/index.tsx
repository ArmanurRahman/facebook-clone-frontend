import React, { useState } from "react";
import Bio from "./bio";
import "./style.css";
import EditIntro from "./details/editIntro";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

interface Props {
    isOwnProfile: boolean;
}
const Intros: React.FC<Props> = ({ isOwnProfile }) => {
    const intros = useSelector<RootState, Intros>(
        (state) => state.intros.intros
    );
    const bio = intros?.bio || "";
    const otherName = intros?.otherName || "";
    const job = intros?.job || "";
    const workplace = intros?.workplace || "";
    const highSchool = intros?.highSchool || "";
    const college = intros?.college || "";
    const currectCity = intros?.currectCity || "";
    const hometown = intros?.hometown || "";
    const relationship = intros?.relationship || "";
    const instagram = intros?.instagram || "";

    const [showEditBio, setShowEditBio] = useState(false);
    const [showEditComponent, setShowEditComponent] = useState(false);
    return (
        <div className='intro_container'>
            <div className='intro_header'>
                <p>Intro</p>
            </div>
            {(showEditBio || bio.length > 0) && (
                <Bio
                    bio={bio}
                    isAddingBio={bio.length === 0}
                    setShowEditBio={setShowEditBio}
                />
            )}

            <div className='intro_body'>
                {(workplace || job) && (
                    <div className='intro'>
                        <img src='../../../icons/job.png' alt='' />
                        {workplace && job ? (
                            <p>
                                Work as {job} at {workplace}
                            </p>
                        ) : workplace ? (
                            <p>Work at {workplace}</p>
                        ) : (
                            job && <p>Work as {job}</p>
                        )}
                    </div>
                )}
                {relationship && (
                    <div className='intro'>
                        <img src='../../../icons/relationship.png' alt='' />
                        <p>{relationship}</p>
                    </div>
                )}
                {college && (
                    <div className='intro'>
                        <img src='../../../icons/studies.png' alt='' />
                        <p>Studied at {college}</p>
                    </div>
                )}
                {highSchool && (
                    <div className='intro'>
                        <img src='../../../icons/studies.png' alt='' />
                        <p>Studied at {highSchool}</p>
                    </div>
                )}
                {currectCity && (
                    <div className='intro'>
                        <img src='../../../icons/home.png' alt='' />
                        <p>Lives in {currectCity}</p>
                    </div>
                )}
                {hometown && (
                    <div className='intro'>
                        <img src='../../../icons/home.png' alt='' />
                        <p>From {hometown}</p>
                    </div>
                )}
                {isOwnProfile && (
                    <React.Fragment>
                        {!bio && !showEditBio && (
                            <button
                                className='btn btn-grey'
                                onClick={() => setShowEditBio(true)}
                            >
                                Add Bio
                            </button>
                        )}
                        <button
                            className='btn btn-grey'
                            onClick={() => setShowEditComponent(true)}
                        >
                            Edit Details
                        </button>
                        <button className='btn btn-grey'>Add Hobbies</button>
                        <button className='btn btn-grey'>Add Featured</button>
                    </React.Fragment>
                )}
                {showEditComponent && (
                    <EditIntro
                        setShowEditComponent={setShowEditComponent}
                        intros={intros}
                    />
                )}
            </div>
        </div>
    );
};

export default Intros;
