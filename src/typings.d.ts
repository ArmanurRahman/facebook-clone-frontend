declare module "*.module.css";

interface UserResponse {
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
}

interface SvgIconProps {
    color?: string;
}
