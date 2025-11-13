import { IUser } from "@/types/user-types";
import { createContext } from "react";

export type AuthContextType = {
  currentUser: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
