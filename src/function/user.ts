import axios from "axios";

export const uploadProfilePicture = async (url: string, token?: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/uploadProfilePicture`,
            {
                url,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};

export const uploadCoverPicture = async (url: string, token?: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/uploadCoverPicture`,
            {
                url,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const updateUserDetails = async (
    id: string,
    text: string,
    token?: string
) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/updateUserDetails`,
            {
                id,
                text,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};

export const getProfile = async (profileUser: string, token?: string) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getProfile/${profileUser}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const addFriend = async (id: string, token: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const cancelRequest = async (id: string, token: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const follow = async (id: string, token: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const unfollow = async (id: string, token: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const acceptRequest = async (id: string, token: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const unfriend = async (id: string, token: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const deleteRequest = async (id: string, token: string) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const search = async (searchTerm: string, token: string) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
            {},

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return { message: "ok", data };
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const addToSearchHistory = async (searchUser: string, token: string) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
            { searchUser },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return { message: "ok", data };
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const getSearchHistory = async (token: string) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getSearchHistory`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return { message: "ok", data };
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const removeFromSearch = async (searchUser: string, token: string) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/removeFromSearch`,
            { searchUser },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return { message: "ok", data };
    } catch (error: any) {
        return error.response.data.message;
    }
};
export const getFriendsPageInfos = async (token: string) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return { status: "ok", data };
    } catch (error: any) {
        return error.response.data.message;
    }
};
