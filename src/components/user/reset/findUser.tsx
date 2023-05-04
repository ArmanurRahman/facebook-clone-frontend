import axios from "axios";
import { useState } from "react";

interface Props {
    picture: string;
    email: string;
    setShow: (a: number) => void;
}

const FindUser: React.FC<Props> = ({ picture, email, setShow }) => {
    const [error, setError] = useState("");

    const sendCodeHandler = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/sendValidationCode`,
                { email }
            );
            setError("");
            setShow(3);
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };
    return (
        <div className='reset_pass_body'>
            <div className='reset_pass_title'>Reset Your Password</div>
            <div className='devider'></div>
            <div className='reset_pass_confirm'>
                <div className='reset_pass_confirm_option'>
                    <p>
                        How do you want to review the code to reset your
                        password?
                    </p>
                    <label
                        htmlFor='email'
                        className='reset_pass_confirm_option_radio'
                    >
                        <input
                            id='email'
                            type='radio'
                            value='email'
                            onChange={() => {}}
                            checked
                        />
                        Send code via email.{email}
                    </label>
                </div>
                <div className='reset_pass_confirm_photo'>
                    <img src={picture} alt='profile_photo' />
                    <p>{email}</p>
                </div>
            </div>
            {error && <div className='error_message center'>{error}</div>}
            <div className='devider'></div>
            <div className='reset_pass_body_action'>
                <button className='btn btn-grey'> Not You?</button>
                <button className='btn btn-blue' onClick={sendCodeHandler}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default FindUser;
