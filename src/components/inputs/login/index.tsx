import { useField, ErrorMessage } from "formik";
import { FieldHookConfig } from "formik";
import { InputHTMLAttributes, ClassAttributes } from "react";
import "./style.css";

interface OtherInputProps {
    placeholder: string;
    type: string;
    name: string;
    bottom?: boolean;
}

type InputType = InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement> &
    OtherInputProps &
    FieldHookConfig<string>;

const LoginInput: React.FC<InputType> = ({ bottom, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className='input_wrap'>
            {meta.touched && meta.error && !bottom && (
                <div className='input_error'>
                    <ErrorMessage name={field.name} />
                    <div className='error_arrow_top'></div>
                </div>
            )}
            <div className='input'>
                <input
                    className={
                        meta.touched && meta.error ? "input_error_border" : ""
                    }
                    {...field}
                    {...props}
                />
                {meta.touched && meta.error && <i className='error_icon'></i>}
            </div>

            {meta.touched && meta.error && bottom && (
                <div className='input_error'>
                    <ErrorMessage name={field.name} />
                    <div className='error_arrow_bottom'></div>
                </div>
            )}
        </div>
    );
};

export default LoginInput;
