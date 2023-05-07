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
        await axios.post(
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
        return "ok";
    } catch (error: any) {
        return error.response.data.message;
    }
};
