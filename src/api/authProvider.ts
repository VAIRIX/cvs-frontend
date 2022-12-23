import { AuthProvider } from 'react-admin';
import { AUTH_ERROR } from '../constants/errorMessages';
import Tokens from '../storage/tokenStorage';
import { http } from './httpClient';

const tokens = Tokens.getInstance();

interface LoginResponse {
  data: {
    accessToken: string;
  };
}

export interface LoginProps {
  username: string;
  password: string;
}

const authProvider: AuthProvider = {
  login: async ({ username, password }: LoginProps) => {
    try {
      const response: LoginResponse = await http.post('/auth/sign-in', {
        username,
        password,
      });

      tokens.setAccessToken(response.data.accessToken);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(AUTH_ERROR);
    }
  },
  checkError: () => {
    tokens.clear();
    return Promise.reject(AUTH_ERROR);
  },
  checkAuth: () =>
    tokens.getAccessToken() ? Promise.resolve() : Promise.reject(AUTH_ERROR),
  logout: () => {
    tokens.clear();
    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve();
  },
};

export default authProvider;
