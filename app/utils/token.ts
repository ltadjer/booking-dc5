const TOKEN_KEY = "token";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = () => {
    return AsyncStorage.getItem(TOKEN_KEY);
}

export const setToken = (token: string) => {
    return AsyncStorage.setItem(TOKEN_KEY, token);
}

export const removeToken = () => {
    return AsyncStorage.removeItem(TOKEN_KEY);
}