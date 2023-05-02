import { useRef, useState } from "react";
import Header from "../../components/header";
import useOutsideClick from "../../helpers/useOutsideClick";
import HomeComponent from "../../components/home";

const Home = () => {
    const el = useRef(null);
    const [visible, setVisible] = useState(true);
    useOutsideClick(el, () => setVisible(false));
    return (
        <div>
            <Header />
            <HomeComponent />
        </div>
    );
};

export default Home;
