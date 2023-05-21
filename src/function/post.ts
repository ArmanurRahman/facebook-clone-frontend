import axios from "axios";

type PostType = "profilePicture" | "cover" | null;

export const createPost = async (
    type: PostType,
    background: string,
    text: string,
    images: any,
    user: string,
    token?: string
) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/createPost`,
            {
                type,
                background,
                text,
                images,
                user,
                token,
            },
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
export const comment = async (
    postId: string,
    comment: string,
    image: string,
    token: string
) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/comment`,
            {
                postId,
                comment,
                image,
            },

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
export const savePost = async (postId: string, token: string) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/savePost/${postId}`,
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
