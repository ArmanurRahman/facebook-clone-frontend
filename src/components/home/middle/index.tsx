import HomePost from "./post";
import Stories from "./stories";

interface Props {
    picture: string;
}
const HomeMiddle: React.FC<Props> = ({ picture }) => {
    return (
        <div className='home_middle_container'>
            <Stories picture={picture} />
            <HomePost picture={picture} />
        </div>
    );
};

export default HomeMiddle;
