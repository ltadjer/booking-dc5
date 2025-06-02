import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AuthService from "../services/auth.service";
import {removeToken, setToken} from "../utils/token";
import UserService from "../services/user.service";

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const signin = async (email: string, password: string) => {
        const response = await AuthService.signin(email, password);
        await setToken(response.token);
        setUser(response.user);
    };

    const signup = async (email: string, password: string, name: string) => {
        const response = await AuthService.signup(email, password, name);
        await setToken(response.token);
        setUser(response.user);
    };

    const signout = async () => {
        await removeToken();
        setUser(null);
    };

    const updateUser = async (user: { name: string; email: string }) => {
        const updatedUser = await UserService.updateUser(user);
        setUser(updatedUser);
    };

    return { user, signin, signout, signup, updateUser };
};