import axios from "axios";

export const reactPost = async (
    postId: string,
    react: string,
    token: string
) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
            {
                postId,
                react,
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
export const getReacts = async (postId: string, token: string) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,

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
