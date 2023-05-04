import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoute from "./routes/loggedInRoute";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";
import Active from "./pages/home/active";
import Reset from "./components/user/reset";

function App() {
    return (
        <Routes>
            <Route element={<LoggedInRoute />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/' element={<Home />} />
                <Route path='/activate/:token' element={<Active />} />
            </Route>
            <Route element={<NotLoggedInRoute />}>
                <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/forgot' element={<Reset />} />
        </Routes>
    );
}

export default App;
