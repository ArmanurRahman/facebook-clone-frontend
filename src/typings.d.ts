declare module "*.module.css";

interface UserResponse {
    id: string;
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
