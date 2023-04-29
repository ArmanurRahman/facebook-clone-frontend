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
            {visible && (
                <div
                    className='card'
                    style={{ width: 300, height: 300, background: "red" }}
                    ref={el}
                ></div>
            )}
        </div>
    );
};

export default Home;
