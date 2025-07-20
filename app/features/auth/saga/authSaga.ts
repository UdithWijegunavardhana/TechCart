import {call, put, takeLatest} from 'redux-saga/effects';
import AuthService from '../api/auth.service';
import {authSagaActions} from './authSagaActions';
import {loginSuccess, loginFailure, logout} from '../redux/authSlice';
import {SignInResponse} from '../api/auth.api.types';
import {storage, StorageKeys} from '../../../utils/storage';
import {removeAuthHeader} from '../../../api/axiosInstance';

function* loginSaga(
  action: ReturnType<typeof authSagaActions.login>,
): Generator<any, void, SignInResponse> {
  try {
    const response: SignInResponse = yield call(
      AuthService.login,
      action.payload,
    );
    yield put(loginSuccess({token: response.accessToken, user: response}));
    yield call(
      [storage, 'set'],
      StorageKeys.ACCESS_TOKEN,
      response.accessToken,
    );
    yield call(
      [storage, 'set'],
      StorageKeys.REFRESH_TOKEN,
      response.refreshToken,
    );
  } catch (error: any) {
    yield put(loginFailure(error?.response?.data?.message || 'Login failed'));
  }
}

function* restoreSessionSaga(): Generator<any, void, void> {
  try {
    const token = storage.getString(StorageKeys.ACCESS_TOKEN);
    const refreshToken = storage.getString(StorageKeys.REFRESH_TOKEN);

    if (token) {
      yield put(
        loginSuccess({token, refreshToken: refreshToken ?? '', user: null}),
      );
    } else {
      yield put(logout());
    }
  } catch (error) {
    yield put(logout());
  }
}

function* logoutSaga() {
  try {
    yield call([storage, 'delete'], StorageKeys.ACCESS_TOKEN);
    yield call([storage, 'delete'], StorageKeys.REFRESH_TOKEN);

    yield call(removeAuthHeader);
    yield put(logout());
  } catch (e) {}
}

export function* authSaga() {
  yield takeLatest(authSagaActions.login.type, loginSaga);
  yield takeLatest(authSagaActions.restoreSession.type, restoreSessionSaga);
  yield takeLatest(authSagaActions.logout.type, logoutSaga);
}
