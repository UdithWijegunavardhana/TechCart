import { AxiosResponse } from 'axios';
import axios from 'axios';

import { SignInRequest, SignInResponse } from './auth.api.types';

const LOGIN_ENDPOINT = 'https://dummyjson.com/auth/login';

// TODO: Use base API configs
const AuthApi = {
  loginAPI: (data: SignInRequest): Promise<AxiosResponse<SignInResponse>> => {
    return axios.post(LOGIN_ENDPOINT, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

export default AuthApi;
