// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const signup = async (userDetails) => {
    const response = await axios.post(`${API_URL}/signup`, userDetails);
    console.log(response.data);
    return response.data;
    };
