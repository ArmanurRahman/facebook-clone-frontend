import { useState, useEffect } from "react";
import Header from "../../components/header";
import HomeComponent from "../../components/home";
import ActiveForm from "./activeForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Cookies from "js-cookie";
import * as ActionType from "../../store/action";

const Active = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("accout verification success");
    const [error, setError] = useState("");
    const { token } = useParams();
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        acticeAccount();
    }, []);

    const acticeAccount = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/user/activate`,
                { token },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            Cookies.set("user", JSON.stringify({ ...user, verified: true }));
            dispatch({ type: ActionType.VERIFIED, payload: true });
            setTimeout(() => {
                navigate("/");
            }, 3000);
            setError("");
            setLoading(false);
            setSuccess(data.message);
        } catch (error: any) {
            console.log(error);
            setSuccess("");
            setLoading(false);
            setError(error.response.data.message);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    };
    return (
        <div>
            <Header />
            {success && (
                <ActiveForm
                    loading={loading}
                    title='Account verification success'
                    type='success'
                    message={success}
                />
            )}
            {error && (
                <ActiveForm
                    loading={loading}
                    title='Account verification fail'
                    type='error'
                    message={error}
                />
            )}
            <HomeComponent />
        </div>
    );
};

export default Active;
