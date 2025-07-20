import {all, fork} from 'redux-saga/effects';
import { authSaga } from '../features/auth/saga/authSaga';
import { homeSaga } from '../features/home/saga/homeSaga';

export default function* rootSaga() {
  yield all([fork(authSaga, homeSaga,)]);
}
