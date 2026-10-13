import {AxiosError} from 'axios';

import AuthApi from './auth.api';
import {SignInRequest, SignInResponse} from './auth.api.types';

const AuthService = {
  login: async (data: SignInRequest): Promise<SignInResponse> => {
    try {
      return await AuthApi.loginAPI(data);
    } catch (error) {
      const err = error as AxiosError;
      console.error('AuthService - login error:', err.message);
      return Promise.reject(err);
    }
  },
};

export default AuthService;
