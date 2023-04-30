import { useEffect } from "react";

const useOutsideClick = (ref: any, func: () => void, altEl: any = null) => {
    useEffect(() => {
        const listener = (e: Event) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            if (altEl && altEl.current.contains(e.target)) {
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
