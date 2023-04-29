import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import "./login.css";
import LoginInput from "../../components/inputs/login";
import { useState } from "react";
import * as Yup from "yup";
import Footer from "../../components/inputs/login/footer";
import RegisterForm from "../../components/registration/registerForm";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as ActionType from "../../store/action";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState({ email: "", password: "" });
    const { email, password } = login;
    const [showRegistration, setShowRegistration] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoginChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setLogin((prevState) => ({ ...prevState, [name]: value }));
    };

    const loginValidation = Yup.object({
        email: Yup.string()
            .email("Must be valid email.")
            .required("Email address is required")
            .max(100),
        password: Yup.string().required("password is required").min(5).max(30),
    });

    const loginHandler = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/user/login`,
                {
                    email,
                    password,
                }
            );
            const { data } = response;
            setLoading(false);
            setError("");
            dispatch({ type: ActionType.LOGIN, payload: data });
            Cookies.set("user", JSON.stringify(data));
            navigate("/");
        } catch (error: any) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };
    return (
        <div className='login'>
            <div className='login_wrapper'>
                <div className='login_wrap'>
                    <div className='login_title'>
                        <img src='../../icons/facebook.svg' alt='facebook' />
                        <p>
                            Facebook helps you to connect and share with the
                            people in your life
                        </p>
                    </div>
                    <div className='login_controls'>
                        <Formik
                            enableReinitialize
                            initialValues={{ email, password }}
                            validationSchema={loginValidation}
                            onSubmit={loginHandler}
                        >
                            {(formik) => (
                                <Form className='form'>
                                    <LoginInput
                                        type='text'
                                        name='email'
                                        placeholder='Enter address or phone number'
                                        onChange={handleLoginChange}
                                    />
                                    <LoginInput
                                        type='password'
                                        name='password'
                                        placeholder='Enter password'
                                        bottom={true}
                                        onChange={handleLoginChange}
                                    />
                                    <button
                                        type='submit'
                                        className='btn btn-blue'
                                    >
                                        Log In
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <Link to='/forgot' className='forget_password'>
                            Forgotten password?
                        </Link>
                        <div className='devider'></div>
                        <button
                            className='create_account btn btn-green'
                            onClick={() => setShowRegistration(true)}
                        >
                            Create Account
                        </button>
                        {loading && <DotLoader size={24} color='#1876f2' />}
                        {error && <div className='error_message'>{error}</div>}
                        <p>
                            <strong>Create a Page</strong> for a celebrity or
                            business
                        </p>
                    </div>
                </div>
            </div>
            {showRegistration && (
                <RegisterForm setShowRegistration={setShowRegistration} />
            )}

            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default Login;
