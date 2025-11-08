import { UserType } from "@/types/user-types";
import { createContext } from "react";

export type AuthContextType = {
  currentUser: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
