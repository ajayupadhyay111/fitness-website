import { type ReactNode, type JSX } from "react";
import type { AuthContextType } from "../types/admin";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../components/LoadingPage";
import { AdminAuthContext } from "./AdminAuth";
import { axiosInstance } from "../lib/axios";

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({
  children,
}: AdminAuthProviderProps): JSX.Element => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["admin-data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/me");
      return res.data;
    },
    retry: false, // optional: avoid retry loop for auth
    refetchOnWindowFocus: false,
  });

  const user = data?.data ?? null;
  const isAuthenticated = !!user && !isError;

  if (isError) console.log(error);

  // Optional: global loading state
  if (isPending) {
    return <LoadingPage />;
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
