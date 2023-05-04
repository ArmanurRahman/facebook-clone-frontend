import { Form, Formik, FormikValues } from "formik";
import LoginInput from "../../inputs/login";
import { useState } from "react";
import "./style.css";
import FindUser from "./findUser";
import Footer from "../../inputs/login/footer";
import CodePanel from "./codePanel";
import ChangePassword from "./changePassword";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const Reset: React.FC = () => {
    const [email, setEmail] = useState<FormikValues & string>();
    const [show, setShow] = useState(1);
    const [user, setUser] = useState<any>();
    const [error, setError] = useState("");

    const validation = Yup.object({
        email: Yup.string()
            .required("Email can't be empty")
            .email("Please input valid email"),
    });

    const getUser = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/findUser`,
                { email }
            );
            setUser(data);
            setError("");
            setShow(2);
        } catch (error: any) {
            setError(error.response.data.message);
            setUser(null);
        }
    };
    return (
        <div className='reset_pass_container'>
            <div className='reset_pass_header'>
                <div className='reset_pass_header_icon'>
                    <img src='../../../icons/facebook.svg' alt='facebook' />
                </div>
                <Link to='/login' className='reset_pass_header_action'>
                    <button className='btn btn-blue'>Login</button>
                </Link>
            </div>

            {show === 1 && (
                <div className='reset_pass_body'>
                    <div className='reset_pass_title'>Find your account</div>
                    <div className='devider'></div>
                    <p className='reset_pass_guide_text'>
                        Please ender email or phone number to search for your
                        account
                    </p>
                    <Formik
                        enableReinitialize
                        initialValues={{ email }}
                        onSubmit={getUser}
                        validationSchema={validation}
                    >
                        {(formik) => (
                            <Form className='reset_pass_body_input'>
                                <div className='reset_pass_body_input_email'>
                                    <LoginInput
                                        placeholder='Enter email address or phone number'
                                        value={email}
                                        onChange={(e: any) =>
                                            setEmail(e.target.value)
                                        }
                                        type='text'
                                        name='email'
                                    />
                                </div>
                                {error && (
                                    <div className='error_message center'>
                                        {error}
                                    </div>
                                )}

                                <div className='devider'></div>
                                <div className='reset_pass_body_action'>
                                    <button className='btn btn-grey'>
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className='btn btn-blue'
                                    >
                                        Search
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
            {show === 2 && user && (
                <FindUser
                    setShow={setShow}
                    picture={user.picture}
                    email={user.email}
                />
            )}
            {show === 3 && user && (
                <CodePanel setShow={setShow} email={user.email} />
            )}
            {show === 4 && user && (
                <ChangePassword setShow={setShow} email={user.email} />
            )}
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default Reset;
