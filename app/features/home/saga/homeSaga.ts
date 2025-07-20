import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
} from '../redux/homeSlice';
import ProductService from '../api/home.service';
import {homeSagaActions} from './homeSagaActions';
import {HomeProductsResponse} from '../api/home.api.types';

function* fetchHomeProductsSaga() {
  try {
    yield put(getProductsRequest());
    const data: HomeProductsResponse = yield call(ProductService.getAll);

    const rawProducts = data.products;
    const mappedProducts = rawProducts.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      thumbnail: product.thumbnail,
      image: product.images?.[0] ?? product.thumbnail,
    }));
    yield put(getProductsSuccess(mappedProducts));
  } catch (error: any) {
    yield put(getProductsFailure(error.message || 'Failed to fetch products'));
  }
}

export function* homeSaga() {
  yield takeLatest(homeSagaActions.fetchProducts.type, fetchHomeProductsSaga);
}
