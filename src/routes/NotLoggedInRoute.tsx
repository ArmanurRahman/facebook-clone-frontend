import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { Navigate, Outlet } from "react-router-dom";

const NotLoggedInRoute = () => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    return user ? <Navigate to='/' /> : <Outlet />;
};

export default NotLoggedInRoute;
