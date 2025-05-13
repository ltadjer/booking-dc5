import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AuthService from "../services/auth.service";
import {removeToken, setToken} from "../utils/token";

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const signin = async (email: string, password: string) => {
        const response = await AuthService.signin(email, password);
        await setToken(response.token);
        setUser(response.user);
    };

    const signup = async (email: string, password: string) => {
        const response = await AuthService.signup(email, password);
        await setToken(response.token);
        setUser(response.user);
    };

    const signout = async () => {
        await AuthService.signout();
        await removeToken();
        setUser(null);
    };

    return { user, signin, signout, signup };
};