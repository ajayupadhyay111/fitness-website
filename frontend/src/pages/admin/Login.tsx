import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Dumbbell, LogIn, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useAdminAuth } from "../../contexts/AdminAuth";
import LoadingPage from "../../components/LoadingPage";

type LoginPayload = {
  email: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => {
      const res = await axiosInstance.post("/admin/login", {
        email,
        password,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["admin-data"] });
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    loginMutation({ email, password });
  };

  if (isPending) {
    return <LoadingPage />;
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-start justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">FitLife Admin</h1>
          <p className="text-gray-700">Sign in to access the dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="admin@fitlife.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="button-gradient w-full"
            >
              {isPending ? (
                "Signing in..."
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="mr-2" size={20} />
                  Sign In
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-700 hover:text-black text-sm">
            ← Back to FitLife Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
