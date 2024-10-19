import axios from 'axios';

const API_URL = 'http://localhost:3001/users'; // Adjust according to your setup

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/users/login`, credentials);
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users`, userData);
};
