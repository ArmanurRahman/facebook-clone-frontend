declare module "*.module.css";

interface UserResponse {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    genter: string;
    bYear: string;
    bMonth: string;
    bDay: string;
    token?: string;
    message?: string;
    picture: string;
    verified?: boolean;
}

interface SvgIconProps {
    color?: string;
}

interface Comment {
    id: string;
    commentedBy: string;
    commentedAt: string;
}

interface User1 {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    gender: "male" | "female";
    picture: string;
}
interface Post {
    _id: string;
    type: "profilePicture" | "cover" | null;
    text?: string;
    images?: Array<String>;
    user: User1;
    background?: string;
    comments?: any;
}
