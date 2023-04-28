import { useState } from "react";
import LoginInput from "../inputs/login";
import "./style.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialRegistrationData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDay(),
    gender: "",
};
const RegisterForm = () => {
    const [registrationData, setRegistrationData] = useState(
        initialRegistrationData
    );

    const registrationValidation = Yup.object({
        firstName: Yup.string()
            .required("What is your first name?")
            .min(2, "First name must be between 2 to 16 characters")
            .max(16, "First name must be between 2 to 16 characters")
            .matches(
                /^[aA-zZ]+$/,
                "Number and special characters are not allowed"
            ),
        lastName: Yup.string()
            .required("What is your first name?")
            .min(2, "First name must be between 2 to 16 characters")
            .max(16, "First name must be between 2 to 16 characters")
            .matches(
                /^[aA-zZ]+$/,
                "Number and special characters are not allowed"
            ),
        email: Yup.string()
            .required("Please enter email address")
            .email("Enter a valid email address"),
        password: Yup.string()
            .required("Please enter password")
            .min(6, "Password must be atleast 6 characters"),
    });
    const { bYear, bMonth, bDay } = registrationData;
    const years = Array.from(new Array(108), (_, index) => bYear - index);
    const months = Array.from(new Array(12), (_, index) => index + 1);
    const numberOfdays = new Date(bYear, bMonth, 0).getDate();
    const days = Array.from(new Array(numberOfdays), (_, index) => 1 + index);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setRegistrationData((prevState) => ({ ...prevState, [name]: value }));
    };

    const closeHandler = () => {};
    return (
        <div className='blur container'>
            <div className={"register_form"}>
                <div className={"register_title"}>
                    <span>Sign Up</span>
                    <span>It's quick and easy</span>
                    <div
                        className={"register_exit_icon"}
                        onClick={closeHandler}
                    >
                        <i className='exit_icon'></i>
                    </div>
                </div>
                <div className={"register_controls"}>
                    <Formik
                        enableReinitialize
                        initialValues={registrationData}
                        onSubmit={() => {}}
                        validationSchema={registrationValidation}
                    >
                        {(formik) => (
                            <Form className='register_controls--form'>
                                <LoginInput
                                    type='text'
                                    name='firstName'
                                    placeholder='First Name'
                                    onChange={handleChange}
                                />
                                <LoginInput
                                    type='text'
                                    name='lastName'
                                    placeholder='Last Name'
                                    onChange={handleChange}
                                />
                                <LoginInput
                                    type='text'
                                    name='email'
                                    placeholder='Mobile number or email address'
                                    onChange={handleChange}
                                />
                                <LoginInput
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    onChange={handleChange}
                                />
                                <div className='dateofbirth'>
                                    <span>
                                        Date Of Birth
                                        <i className='info_icon'></i>
                                    </span>
                                    <div className='dateofbirth_controls'>
                                        <select
                                            name='bDay'
                                            value={bDay}
                                            onChange={handleChange}
                                        >
                                            {days.map((day, index) => (
                                                <option key={index}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            name='bMonth'
                                            value={bMonth}
                                            onChange={handleChange}
                                        >
                                            {months.map((month, index) => (
                                                <option key={index}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            name='bYear'
                                            value={bYear}
                                            onChange={handleChange}
                                        >
                                            {years.map((year, index) => (
                                                <option key={index}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='gender'>
                                    <span>
                                        Gender
                                        <i className='info_icon'></i>
                                    </span>
                                    <div className='gerder_items'>
                                        <label htmlFor='male'>
                                            Male
                                            <input
                                                type='radio'
                                                name='gender'
                                                value='male'
                                                id='male'
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label htmlFor='female'>
                                            Female
                                            <input
                                                type='radio'
                                                name='gender'
                                                value='female'
                                                id='female'
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <p className='info_text'>
                                    By clicking Sign Up, you are agreed to out{" "}
                                    <span>Terms, Data Policy</span> and{" "}
                                    <span>Coolie Policy</span>. You may receive
                                    SMS notifications from us and can opt out at
                                    ant time.
                                </p>

                                <button className='btn btn-signup'>
                                    {" "}
                                    Sign Up
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
