// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginAPI,
  signup as signupAPI,
} from "../../services/authService";

// Asynchronous thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Call the login API
      const response = await loginAPI(credentials);
      // console.log(response);
      return response; // Assuming the API returns { user, token }
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

// Asynchronous thunk for register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      // Call the register API
      const response = await signupAPI(userDetails);
      return response; // Assuming the API returns { user, token }
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

// Initial state (reading from localStorage if available)
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // User details
  accessToken: localStorage.getItem("accessToken") || null, // JWT token
  refreshToken: localStorage.getItem("refreshToken") || null, // Refresh token
  isAuthenticated: Boolean(localStorage.getItem("accessToken")), // Whether user is authenticated
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      // Clear user and token data on logout
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Remove data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginUser async actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle registerUser async actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
