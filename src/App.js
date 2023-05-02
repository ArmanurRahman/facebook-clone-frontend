import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoute from "./routes/loggedInRoute";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";

function App() {
    return (
        <Routes>
            <Route element={<LoggedInRoute />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/' element={<Home />} />
            </Route>
            <Route element={<NotLoggedInRoute />}>
                <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
