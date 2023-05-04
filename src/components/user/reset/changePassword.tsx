import { Form, Formik } from "formik";
import LoginInput from "../../inputs/login";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
    setShow: (a: number) => void;
    email: string;
}
const ChangePassword: React.FC<Props> = ({ setShow, email }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const validation = Yup.object({
        password: Yup.string()
            .required("Please enter password")
            .min(6, "Password must be atleast 6 characters"),
        confirmPassword: Yup.string()
            .required("confirm your password")
            .oneOf([Yup.ref("password")], "password didn't match"),
    });

    const passwordChangeHandler = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
                { email, password }
            );
            setError("");
            navigate("/");
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };
    return (
        <div className='reset_pass_body'>
            <div className='reset_pass_title'>Change password</div>
            <div className='devider'></div>
            <p className='reset_pass_guide_text'>
                Please enter a strong password.
            </p>
            <Formik
                enableReinitialize
                initialValues={{ password, confirmPassword }}
                onSubmit={passwordChangeHandler}
                validationSchema={validation}
            >
                {(formik) => (
                    <Form className='reset_pass_body_input'>
                        <div className='reset_pass_body_input_pass'>
                            <LoginInput
                                placeholder='New password'
                                value={password}
                                onChange={(e: any) =>
                                    setPassword(e.target.value)
                                }
                                type='password'
                                name='password'
                            />
                            <LoginInput
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e: any) =>
                                    setConfirPassword(e.target.value)
                                }
                                type='password'
                                name='confirmPassword'
                            />
                        </div>
                        {error && (
                            <div className='error_message center'>{error}</div>
                        )}
                        <div className='devider'></div>
                        <div className='reset_pass_body_action'>
                            <button className='btn btn-grey'>Cancel</button>
                            <button type='submit' className='btn btn-blue'>
                                Confirm
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChangePassword;
