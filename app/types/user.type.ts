export interface IUser {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface CreateUserDTO {
    email: string;
    password: string;
}