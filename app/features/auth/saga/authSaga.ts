import {call, put, takeLatest} from 'redux-saga/effects';
import AuthService from '../api/auth.service';
import {authSagaActions} from './authSagaActions';
import {loginSuccess, loginFailure} from '../redux/authSlice';
import {SignInResponse} from '../api/auth.api.types';

function* loginSaga(
  action: ReturnType<typeof authSagaActions.login>,
): Generator<any, void, SignInResponse> {
  console.log('🟩 action', action);
  try {
    const response: SignInResponse = yield call(
      AuthService.login,
      action.payload,
    );
    console.log('🟩 response in saga:', response);
    yield put(loginSuccess({token: response.accessToken, user: response}));
  } catch (error: any) {
    yield put(loginFailure(error?.response?.data?.message || 'Login failed'));
  }
}

export function* authSaga() {
  yield takeLatest(authSagaActions.login.type, loginSaga);
}
