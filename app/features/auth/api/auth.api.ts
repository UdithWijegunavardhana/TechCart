import BaseApi from '../../../api/base.api';
import { SignInRequest, SignInResponse } from './auth.api.types';

const LOGIN_ENDPOINT = '/auth/login';

class AuthApi extends BaseApi {
  loginAPI = (data: SignInRequest): Promise<SignInResponse> =>
    this.postAsync<SignInResponse>(LOGIN_ENDPOINT, undefined, data);
}

export default new AuthApi();
