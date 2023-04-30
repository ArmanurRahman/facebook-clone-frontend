import { useRef, useState } from "react";
import Header from "../../components/header";
import useOutsideClick from "../../helpers/useOutsideClick";

const Home = () => {
    const el = useRef(null);
    const [visible, setVisible] = useState(true);
    useOutsideClick(el, () => setVisible(false));
    return (
        <div>
            <Header />
        </div>
    );
};

export default Home;
