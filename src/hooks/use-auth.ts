import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

// ✅ Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
