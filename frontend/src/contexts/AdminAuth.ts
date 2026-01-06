import { createContext, useContext } from "react";
import type { AuthContextType } from "../types/admin";

export const AdminAuthContext = createContext<AuthContextType | null>(null);

// ✅ Custom hook
export const useAdminAuth = (): AuthContextType => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }

  return context;
};
