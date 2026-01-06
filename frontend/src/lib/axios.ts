import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // send request to /refresh-token
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/admin/refresh-token")
    ) {
      originalRequest._retry = true;
      return axiosInstance.post("/admin/refresh-token").then(() => {
        return axiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
