import { Plus } from "../../../../svg";
import "../style.css";
import { stories } from "../../../../data/home";

interface AddStoryProps {
    picture: string;
}
const AddStory: React.FC<AddStoryProps> = ({ picture }) => {
    return (
        <div className='story_card'>
            <div className='add_story_picture'>
                <img src={picture} alt='profile_pic' />
                <div className='add_story_icon'>
                    <Plus color={"#fff"} />
                </div>
            </div>

            <div className='story_text'>Create Story</div>
        </div>
    );
};

interface StoryProps {
    picture: string;
    name: string;
    profilePicture: string;
}
const Story: React.FC<StoryProps> = ({ picture, name, profilePicture }) => {
    return (
        <div className='story_card'>
            <div className='story_picture'>
                <div className='story_profile_picture'>
                    <img src={profilePicture} alt='profile_picture' />
                </div>
                <img src={picture} alt='profile_pic' />
                <span>{name}</span>
            </div>
        </div>
    );
};

interface Props {
    picture: string;
}
const Stories: React.FC<Props> = ({ picture }) => {
    const storyNumber = 5;
    return (
        <div className='story_container'>
            <AddStory picture={picture} />
            {stories.slice(0, storyNumber).map((item, index) => (
                <Story
                    key={index}
                    profilePicture={item.profile_picture}
                    name={item.profile_name}
                    picture={item.image}
                />
            ))}
        </div>
    );
};

export default Stories;
