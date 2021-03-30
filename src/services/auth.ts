import Api from '../services/api';

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
