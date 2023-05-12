import { useMediaQuery } from "react-responsive";
import { Dots } from "../../svg";

const dummyFriends = [
    {
        name: "Assasin creed",
        picture: "../../../images/friends/assasin_creed.jpeg",
    },
    {
        name: "Far cry",
        picture: "../../../images/friends/far_cry.jpeg",
    },
    {
        name: "Halo infinite",
        picture: "../../../images/friends/halo.jpeg",
    },
    {
        name: "Spider man",
        picture: "../../../images/friends/spider_man.png",
    },
    {
        name: "Super man",
        picture: "../../../images/friends/superman.webp",
    },
];

const PeopleMayKnow = () => {
    const width600px = useMediaQuery({
        query: "(max-width: 600px)",
    });
    const width500px = useMediaQuery({
        query: "(max-width: 500px)",
    });
    const width400px = useMediaQuery({
        query: "(max-width: 400px)",
    });
    const suggestionLimit = width400px ? 3 : width500px ? 4 : 5;
    return (
        <div className='people_may_know_container'>
            <div className='people_may_know_title'>
                <p>People You may know</p>
                <div className='profile_menu_container_2'>
                    <Dots color='#65676b' />
                </div>
            </div>
            <div className='people_may_know_body'>
                {dummyFriends.slice(0, suggestionLimit).map((img, i) => (
                    <div className='people_you_may_know_item' key={i}>
                        <div className='people_you_may_know_item_image'>
                            <img src={img.picture} alt='' />
                        </div>
                        <p>{img.name}</p>
                        <button>
                            {!width600px && (
                                <img
                                    className='add_friend_icon'
                                    src='../../../icons/addFriend.png'
                                    alt=''
                                />
                            )}

                            <span>Add Friend</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeopleMayKnow;
