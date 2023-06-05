export interface iUser {
    id: number;
    name: string;
    mail: string;
    username: string,
    picture: string,
    role:tUserRole,
    about: string,
    likes: number,
}

export type tUserRole = "ADMIN" | "USER"

