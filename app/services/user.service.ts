import {getToken} from "../utils/token";

const ENDPOINT = '/users';

import api from "./api.service";

export const fetchCurrentUser = async () => {
    const response = await api.get(`${ENDPOINT}/me`);
    response.data;
};

export const updateUser = async (user: { name: string; email: string }) => {
    const token = await getToken();
    const response = await api.put(`${ENDPOINT}/update`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Failed to update user');
    }
}

const UserService = {
    fetchCurrentUser,
    updateUser,
}

export default UserService;