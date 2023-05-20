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
    reactHandler: (a: string) => void;
}
const ReactPopup: React.FC<Props> = ({ setShowReact, reactHandler }) => {
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
                <div key={react.name} onClick={() => reactHandler(react.name)}>
                    <img src={react.image} alt='' />
                </div>
            ))}
        </div>
    );
};

export default ReactPopup;
