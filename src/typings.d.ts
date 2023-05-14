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
    cover?: string;
    details?: Intros;
}

interface Intros {
    bio?: string;
    otherName?: string;
    job?: string;
    workplace?: string;
    highSchool?: string;
    college?: string;
    currectCity?: string;
    hometown?: string;
    relationship?: "Single" | "Merried";
    instagram?: string;
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
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    gender: "male" | "female";
    picture: string;
}

interface PostPicture {
    url: string;
}
interface Post {
    _id: string;
    type: "profilePicture" | "cover" | null;
    text?: string;
    images?: Array<PostPicture>;
    user: User1;
    background?: string;
    comments?: any;
    createdAt?: Date;
}

interface Profile {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    picture: string;
    gender: "male" | "female";
    bYear: number;
    bMonth: number;
    bDay: number;
    friends: any;
    followers: any;
    following: any;
    requests: any;
    _id: string;
    details?: Intros;
    posts: Array<Post>;
}

interface PhotoResource {
    filename: string;
    folder: string;
    public_id: string;
    created_at: Date;
    uploaded_at: Date;
    secure_url: string;
}
interface ListPhoto {
    total_count: number;
    resources: Array<PhotoResource> | [];
}
