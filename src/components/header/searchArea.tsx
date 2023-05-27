import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useOutsideClick from "../../helpers/useOutsideClick";
import {
    addToSearchHistory,
    getSearchHistory,
    removeFromSearch,
    search,
} from "../../function/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { useNavigate } from "react-router-dom";

interface SearchResult {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    picture: string;
}
interface SearchResultItemProps {
    token?: string;
    searchResult: Array<SearchResult>;
    setSearchResult: (a: any) => void;
}
const SearchResultItem: React.FC<SearchResult & SearchResultItemProps> = ({
    _id,
    firstName,
    lastName,
    userName,
    picture,
    token,
    setSearchResult,
    searchResult,
}) => {
    const navigate = useNavigate();

    const searchAddHandler = async () => {
        await addToSearchHistory(_id, token || "");
        navigate(`/profile/${userName}`);
    };

    const searchDeleteHandler = async () => {
        await removeFromSearch(_id, token || "");
        setSearchResult(searchResult.filter((item) => item._id !== _id));
    };
    return (
        <div className='search_result_item'>
            <div className='search_result_item_name' onClick={searchAddHandler}>
                <img src={picture} alt='' />
                <p>
                    {firstName} {lastName}
                </p>
            </div>
            <i className='exit_icon' onClick={searchDeleteHandler}></i>
        </div>
    );
};
interface Props {
    setShowSearchArea: (a: boolean) => void;
}
const SearchArea: React.FC<Props> = ({ setShowSearchArea }) => {
    const user = useSelector<RootState, UserResponse>((state) => state.user);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const [showSearchIcon, setShowSearchIcon] = useState(true);
    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);
    const color = "#65676b";
    useOutsideClick(searchRef, () => setShowSearchArea(false));
    const [searchParam, setSearchParam] = useState("");
    const [searchResult, setSearchResult] = useState<Array<SearchResult>>();

    useEffect(() => {
        const searchdataTimer = setTimeout(async () => {
            if (!searchParam) {
                return;
            }
            const res = await search(searchParam, user.token || "");
            if (res?.message === "ok") {
                setSearchResult(res.data);
            }
        }, 500);

        return () => clearTimeout(searchdataTimer);
    }, [searchParam]);

    useEffect(() => {
        getSearchHistoryHandler();
    }, []);
    const getSearchHistoryHandler = async () => {
        const searchHistoryRes = await getSearchHistory(user.token || "");
        if (searchHistoryRes.message === "ok") {
            setSearchResult(
                searchHistoryRes.data?.map((item: any) => item.user)
            );
        }
    };
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setSearchParam(e.target.value);
        }
    };

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
                <div className='search_area_header_search'>
                    {showSearchIcon && <Search color={color} />}
                    <input
                        type='input'
                        placeholder='Search in facebook'
                        ref={searchInputRef}
                        onFocus={() => setShowSearchIcon(false)}
                        onBlur={() => setShowSearchIcon(true)}
                        value={searchParam}
                        onChange={searchHandler}
                    />
                </div>
            </div>
            <div className='search_result'>
                <div className='result-item'>
                    <p>Recent searches</p>
                    <a>Edit</a>
                </div>
                {searchResult &&
                    searchResult.length > 0 &&
                    searchResult.map((searchItem, i) => (
                        <SearchResultItem
                            key={i}
                            _id={searchItem._id}
                            firstName={searchItem.firstName}
                            lastName={searchItem.lastName}
                            userName={searchItem.userName}
                            picture={searchItem.picture}
                            token={user.token || ""}
                            searchResult={searchResult}
                            setSearchResult={setSearchResult}
                        />
                    ))}
            </div>
        </div>
    );
};

export default SearchArea;
