import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";


const getTokenExpiration = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp * 1000; // Convert to milliseconds
};

const useTokenRefresh = (accessToken, setAccessToken) => {
  useEffect(() => {
    if (!accessToken) return;

    const refreshToken = async () => {
      try {
        const response = await axios.post(
          'http://localhost:4000/api/auth/refresh-token'
          , {
          token: localStorage.getItem("refreshToken"), // Or however you store it
        });
        setAccessToken(response.data.accessToken);

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      } catch (err) {
        console.error("Failed to refresh token:", err);
        // Handle errors, e.g., log out the user
      }
    };

    const tokenExpiration = getTokenExpiration(accessToken);
    const now = Date.now();

    // Refresh the token 1 minute before it expires
    const timeout = tokenExpiration - now - 60 * 1000;

    if (timeout > 0) {
      const timer = setTimeout(refreshToken, timeout);
      return () => clearTimeout(timer);
    } else {
      refreshToken(); // Token is already expired or close to expiration
    }
  }, [accessToken, setAccessToken]);
};

export {useTokenRefresh};
