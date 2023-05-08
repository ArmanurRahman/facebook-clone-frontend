import axios from "axios";

const uploadImages = async (formData: any, token: string | undefined) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return data;
    } catch (error: any) {
        return error.response.data.message;
    }
};

export default uploadImages;
