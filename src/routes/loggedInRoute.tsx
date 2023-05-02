import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

const LoggedInRoute = () => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    return user ? <Outlet /> : <Login />;
};

export default LoggedInRoute;
