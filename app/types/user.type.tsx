export interface IUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
}
