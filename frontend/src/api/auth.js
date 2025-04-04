import { FIXED_CREDENTIALS } from '../constants';

export const login = (username, password) => {
  const isAuthenticated = username === FIXED_CREDENTIALS.username && 
                         password === FIXED_CREDENTIALS.password;
  
  if (isAuthenticated) {
    localStorage.setItem('is_authenticated', 'true');
  }
  
  return isAuthenticated;
};

export const logout = () => {
  localStorage.removeItem('is_authenticated');
};

export const isAuthenticated = () => {
  return localStorage.getItem('is_authenticated') === 'true';
};