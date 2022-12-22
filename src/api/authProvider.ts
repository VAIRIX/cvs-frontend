import axios from 'axios';
import { AuthProvider } from 'react-admin';
import Tokens from '../storage/tokenStorage';
import { http } from './httpClient';

const tokens = Tokens.getInstance();
export interface LoginProps {
  username: string;
  password: string;
}

const authProvider: AuthProvider = {
  login: async ({ username, password }: LoginProps) => {
    try {
      const response = await http.post('/auth/sign-in', {
        username,
        password,
      });

      tokens.setAccessToken((response.data as any).accessToken);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      tokens.clear();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    tokens.getAccessToken() ? Promise.resolve() : Promise.reject(),
  logout: () => {
    tokens.clear();
    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve();
  },
};

export default authProvider;
