const API_URL = "http://10.33.165.53:8000/api";
import { getToken } from "../utils/token";

import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },

})

api.interceptors.request.use(async(config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;