import { AuthProvider } from 'react-admin';
import { FORBIDDEN, UNAUTHORIZED, ERROR_MESSAGES } from 'constants/index';
import tokens from 'storage/tokenStorage';
import { http } from 'api/httpClient';

const UNAUTHORIZED_STATUS_CODES = [FORBIDDEN, UNAUTHORIZED];

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
      return Promise.reject(ERROR_MESSAGES.INVALID_USER);
    }
  },
  checkError: (error) => {
    const status = error.status;
    if (UNAUTHORIZED_STATUS_CODES.some((code) => code === status)) {
      tokens.clear();
      return Promise.reject(ERROR_MESSAGES.AUTH_ERROR);
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    tokens.getAccessToken()
      ? Promise.resolve()
      : Promise.reject(ERROR_MESSAGES.AUTH_ERROR),
  logout: () => {
    tokens.clear();
    return Promise.resolve();
  },
  getPermissions: () => {
    return Promise.resolve();
  },
};

export default authProvider;
