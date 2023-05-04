import { Form, Formik } from "formik";
import LoginInput from "../../inputs/login";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

interface Props {
    setShow: (a: number) => void;
    email: string;
}

const CodePanel: React.FC<Props> = ({ setShow, email }) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const validation = Yup.object({
        code: Yup.string()
            .required("code can't be empty")
            .min(5, "code can't be less then 5 character")
            .max(5, "code can't be more then 5 character"),
    });

    const checkCode = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/checkValidationCode`,
                { email, code }
            );
            setError("");
            setShow(4);
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };
    return (
        <div className='reset_pass_body'>
            <div className='reset_pass_title'>Code verification</div>
            <div className='devider'></div>
            <p className='reset_pass_guide_text'>
                Please enter code that been sent to your email.
            </p>
            <Formik
                enableReinitialize
                initialValues={{ code }}
                onSubmit={checkCode}
                validationSchema={validation}
            >
                {(formik) => (
                    <Form className='reset_pass_body_input'>
                        <div className='reset_pass_body_input_email'>
                            <LoginInput
                                placeholder='Code'
                                value={code}
                                onChange={(e: any) => setCode(e.target.value)}
                                type='text'
                                name='code'
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

export default CodePanel;
