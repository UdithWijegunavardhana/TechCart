import {call, put, takeLatest} from 'redux-saga/effects';
import AuthService from '../api/auth.service';
import {authSagaActions} from './authSagaActions';
import {loginSuccess, loginFailure} from '../redux/authSlice';
import { SignInResponse } from '../api/auth.api.types';

function* loginWorker(
  action: ReturnType<typeof authSagaActions.login>,
): Generator<any, void, SignInResponse> {
  try {
   const response: SignInResponse = yield call(AuthService.login, action.payload);
    yield put(loginSuccess({token: response.token, user: response}));
  } catch (error: any) {
    yield put(loginFailure(error?.response?.data?.message || 'Login failed'));
  }
}

export function* authSaga() {
  yield takeLatest(authSagaActions.login.type, loginWorker);
}
