import { createContext, useContext } from "react";
import { NetlifyUser } from "../types/auth";

type AuthContextType = {
  user: NetlifyUser | null;
  login: VoidFunction;
  logout: VoidFunction;
  authReady: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
