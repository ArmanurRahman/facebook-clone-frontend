import { useEffect } from "react";

const useOutsideClick = (ref: any, func: () => void) => {
    useEffect(() => {
        const listener = (e: Event) => {
            if (!ref.current && ref.current.contains(e.target)) {
                return;
            }
            func();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref]);
};

export default useOutsideClick;
