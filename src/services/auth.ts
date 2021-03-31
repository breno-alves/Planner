import Api from '../services/api';
import { useHistory } from 'react-router-dom';
export const isAuthenticated = () => {
  const refreshToken = localStorage.getItem('accessToken');
  return !!refreshToken;
};

export const getToken = () => localStorage.getItem('accessToken');

export const login = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
};
