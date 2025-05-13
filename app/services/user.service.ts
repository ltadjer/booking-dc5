import {getToken} from "../utils/token";

const ENDPOINT = '/users';

import api from "./api.service";

export const fetchCurrentUser = async () => {
    const response = await api.get(`${ENDPOINT}/me`);
    response.data;
};

const UserService = {
    fetchCurrentUser,
}

export default UserService;