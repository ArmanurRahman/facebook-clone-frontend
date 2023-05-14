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
