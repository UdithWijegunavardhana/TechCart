import BaseApi from '../../../api/base.api';
import { HomeProductsResponse } from './home.api.types';

const GET_PRODUCTS_ENDPOINT = '/products';

class HomeProductApi extends BaseApi {
  getAllProducts = (): Promise<HomeProductsResponse> =>
    this.getAsync<HomeProductsResponse>(GET_PRODUCTS_ENDPOINT);
}

export default new HomeProductApi();
