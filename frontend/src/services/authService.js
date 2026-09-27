// services/authService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/api/auth`;

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const signup = async (userDetails) => {
    const response = await axios.post(`${API_URL}/signup`, userDetails);
    console.log(response.data);
    return response.data;
    };

export const googleLogin = async (credential) => {
  const response = await axios.post(`${API_URL}/googlelogin`, { credential });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgetpassword`, { email });
  return response.data;
};

export const resetPassword = async (email, password) => {
  const response = await axios.put(`${API_URL}/resetpassword`, { email, password });
  return response.data;
};
