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
