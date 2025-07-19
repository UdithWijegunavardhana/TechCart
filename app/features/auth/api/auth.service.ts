// app/redux/slices/auth/auth.service.ts
import AuthApi from './auth.api';
import { SignInRequest, SignInResponse } from './auth.api.types';
import { AxiosError } from 'axios';

const AuthService = {
  login: async (data: SignInRequest): Promise<SignInResponse> => {
    try {
      const response = await AuthApi.loginAPI(data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('AuthService - login error:', err.message);
      return Promise.reject(err);
    }
  },
};

export default AuthService;
