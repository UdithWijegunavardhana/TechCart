import {all, fork} from 'redux-saga/effects';
import {authSaga} from '../features/auth/saga/authSaga';
import {homeSaga} from '../features/home/saga/homeSaga';
import {productDetailsSaga} from '../features/productDetails/saga/productDetailsSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(homeSaga), fork(productDetailsSaga)]);
}
