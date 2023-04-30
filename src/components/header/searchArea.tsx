import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useOutsideClick from "../../helpers/useOutsideClick";

interface Props {
    setShowSearchArea: (a: boolean) => void;
}
const SearchArea: React.FC<Props> = ({ setShowSearchArea }) => {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const [showSearchIcon, setShowSearchIcon] = useState(true);
    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);
    const color = "#65676b";
    useOutsideClick(searchRef, () => setShowSearchArea(false));

    return (
        <div className='search_area' ref={searchRef}>
            <div className='search_input'>
                <div
                    className='hover1'
                    style={{ padding: 4, borderRadius: "50%" }}
                    onClick={() => setShowSearchArea(false)}
                >
                    <Return color={color} />
                </div>
                <div className='header_search'>
                    {showSearchIcon && <Search color={color} />}
                    <input
                        type='input'
                        placeholder='Search in facebook'
                        ref={searchInputRef}
                        onFocus={() => setShowSearchIcon(false)}
                        onBlur={() => setShowSearchIcon(true)}
                    />
                </div>
            </div>
            <div className='search_result'>
                <div className='result-item'>
                    <p>Recent searches</p>
                    <a>Edit</a>
                </div>
            </div>
        </div>
    );
};

export default SearchArea;
