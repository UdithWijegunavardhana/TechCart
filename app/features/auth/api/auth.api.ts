import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';

import { SignInRequest, SignInResponse } from './auth.api.types';

const LOGIN_ENDPOINT = 'https://dummyjson.com/auth/login';
const BASE_URL = Config.API_URL;

// TODO: Use base API configs
const AuthApi = {
  loginAPI: (data: SignInRequest): Promise<AxiosResponse<SignInResponse>> => {
    return axios.post(LOGIN_ENDPOINT, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

export default AuthApi;
