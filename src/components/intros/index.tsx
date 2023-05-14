import Bio from "./bio";
import "./style.css";

interface Props {
    intros?: Intros;
}
const Intros: React.FC<Props> = ({ intros }) => {
    const bio = intros?.bio || "";
    const otherName = intros?.otherName || "";
    const job = intros?.job || "Software Engineer";
    const workplace = intros?.workplace || "Google";
    const highSchool = intros?.highSchool || " Muksudpur S.S. High school";
    const college = intros?.college || "Govt science College";
    const currectCity = intros?.currectCity || "Tokyo";
    const hometown = intros?.hometown || "Munshiganj";
    const relationship = intros?.relationship || "Single";
    const instagram = intros?.instagram || "";

    return (
        <div className='intro_container'>
            <div className='intro_header'>
                <p>Intro</p>
            </div>
            <Bio bio={bio} />
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
                <button className='btn btn-grey'>Edit Details</button>
                <button className='btn btn-grey'>Add Hobbies</button>
                <button className='btn btn-grey'>Add Featured</button>
            </div>
        </div>
    );
};

export default Intros;
