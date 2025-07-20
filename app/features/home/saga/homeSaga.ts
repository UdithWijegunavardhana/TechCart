import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
} from '../redux/homeSlice';
import HomeApi from '../api/home.api';

function* fetchHomeProductsSaga() {
  try {
    const data = yield call(HomeApi.getAll);
    yield put(getProductsSuccess(data.products));
  } catch (error: any) {
    yield put(getProductsFailure(error.message || 'Failed to fetch products'));
  }
}

export function* homeSaga() {
  yield takeLatest(getProductsRequest.type, fetchHomeProductsSaga);
}
