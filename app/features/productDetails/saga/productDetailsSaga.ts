import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getProductRequest,
  getProductSuccess,
  getProductFailure,
} from '../redux/productDetailsSlice';
import ProductDetailsService from '../api/productDetails.service';
import {productDetailsSagaActions} from './productDetailsSagaActions';
import {ProductDetailsStrings} from '../constants';
import {HomeProduct} from '../../home/api/home.api.types';

function* fetchProductDetailsSaga(
  action: ReturnType<typeof productDetailsSagaActions.fetchProduct>,
) {
  try {
    yield put(getProductRequest());
    const data: HomeProduct = yield call(
      ProductDetailsService.getById,
      action.payload,
    );
    yield put(getProductSuccess(data));
  } catch (error: any) {
    yield put(
      getProductFailure(error.message || ProductDetailsStrings.fetch_failed),
    );
  }
}

export function* productDetailsSaga() {
  yield takeLatest(
    productDetailsSagaActions.fetchProduct.type,
    fetchProductDetailsSaga,
  );
}
