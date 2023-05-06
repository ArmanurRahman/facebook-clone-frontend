import { Dots, Feeling, Photo } from "../../../../../svg";

const AddToPost = () => {
    return (
        <div className='add_to_post'>
            <div className='add_to_post_title'>Add to your post</div>
            <div className='add_to_post_icon '>
                <Photo color={"#45bd62"} />
            </div>
            <div className='add_to_post_icon'>
                <i className='tag_icon'></i>
            </div>
            <div className='add_to_post_icon'>
                <Feeling color={"#f2b928"} />
            </div>
            <div className='add_to_post_icon'>
                <i className='maps_icon'></i>
            </div>
            <div className='add_to_post_icon'>
                <i className='microphone_icon'></i>
            </div>
            <div className='add_to_post_icon'>
                <Dots color={"#65676b"} />
            </div>
        </div>
    );
};

export default AddToPost;
