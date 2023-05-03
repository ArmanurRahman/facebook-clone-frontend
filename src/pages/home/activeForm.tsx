import "./style.css";
import PropagateLoader from "react-spinners/PropagateLoader";

interface Props {
    type: "success" | "error";
    loading: boolean;
    title: string;
    message: string;
}
const ActiveForm: React.FC<Props> = ({ type, title, loading, message }) => {
    return (
        <div className='active_form blur'>
            <div className='popup'>
                <div
                    className={`popup_title ${
                        type === "success" ? "success_message" : "error_message"
                    }`}
                >
                    {title}
                </div>
                <div className='popup_message'>{message}</div>
                <PropagateLoader color='#1876f2' size={30} loading={loading} />
            </div>
        </div>
    );
};

export default ActiveForm;
