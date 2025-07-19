import {all, fork} from 'redux-saga/effects';
import {authSaga} from '../features/auth/saga/authSaga';

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
