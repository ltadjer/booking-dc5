import {createContext, useEffect, useState} from "react";
import { IUser } from "../types/user.type";
import {getToken} from "../utils/token";
import {fetchCurrentUser } from "../services/user.service";

const AuthContext = createContext<{
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}>({
  user: null,
  setUser: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const initialize = async () => {
    const token = await getToken();
    if(token) {
      fetchCurrentUser();
    }
  }
  useEffect(() => {
    initialize();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;