const reacts = [
    {
        name: "like",
        image: "../../../reacts/like.gif",
    },
    {
        name: "love",
        image: "../../../reacts/love.gif",
    },
    {
        name: "haha",
        image: "../../../reacts/haha.gif",
    },
    {
        name: "wow",
        image: "../../../reacts/wow.gif",
    },
    {
        name: "sad",
        image: "../../../reacts/sad.gif",
    },
    {
        name: "angry",
        image: "../../../reacts/angry.gif",
    },
];

interface Props {
    setShowReact: (a: boolean) => void;
}
const ReactPopup: React.FC<Props> = ({ setShowReact }) => {
    return (
        <div
            className='react_popup_container'
            onMouseOver={() => {
                setTimeout(() => {
                    setShowReact(true);
                }, 500);
            }}
            onMouseLeave={() => {
                setTimeout(() => {
                    setShowReact(false);
                }, 500);
            }}
        >
            {reacts.map((react) => (
                <img src={react.image} alt='' key={react.name} />
            ))}
        </div>
    );
};

export default ReactPopup;
