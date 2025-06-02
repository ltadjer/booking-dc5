const ENDPOINT = '/auth';

import api from "./api.service";

const signin = async (email: string, password: string) => {
    const response = await api.post(`${ENDPOINT}/signin`, {
        email,
        password,
    });
    return response.data;
}

const signup = async (email: string, password: string, name: string) => {
    const response = await api.post(`${ENDPOINT}/signup`, {
        email,
        password,
        name
    });
    return response.data;
}

const AuthService = {
    signin,
    signup,
}

export default AuthService;