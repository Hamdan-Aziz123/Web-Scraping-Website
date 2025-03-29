import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosWithRefresh = (baseURL) => {
  const [axiosInstance, setAxiosInstance] = useState(() => {
    const instance = axios.create({
      baseURL: baseURL || "https://your-api-base-url.com",
      headers: { "Content-Type": "application/json" },
    });
    return instance;
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 && // Unauthorized
          !originalRequest._retry // Prevent infinite loops
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
              throw new Error("No refresh token available.");
            }

            const { data } = await axios.post(
                "http://localhost:4000/api/auth/refresh-token",
                { token: refreshToken }
            );

            // Save the new tokens
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            // Update the Authorization header
            originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

            // Retry the original request
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // Handle logout or token invalidation
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login"; // Redirect to login
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosWithRefresh;