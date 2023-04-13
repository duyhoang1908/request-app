import {
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { User } from "../types";
import JWTManager from "../utils/jwt";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  checkAuth: () => Promise<boolean | undefined>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  clearToken: () => void;
}

const defaultIsAuthenticated = false;

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: defaultIsAuthenticated,
  setIsAuthenticated: () => {},
  checkAuth: () => Promise.resolve(true),
  user: null,
  setUser: () => {},
  clearToken: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultIsAuthenticated
  );

  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    const token = JWTManager.getToken();

    if (token) setIsAuthenticated(true);
    else {
      try {
        const success = await JWTManager.getRefreshToken();
        if (success === 200) return true;
        return false;
      } catch (error) {
        return false;
      }
    }
  };

  const clearToken = () => {
    JWTManager.deleteToken();
    setIsAuthenticated(false);
  };

  const authContextData = {
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
    user,
    setUser,
    clearToken,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
