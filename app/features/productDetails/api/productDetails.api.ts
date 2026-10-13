import BaseApi from '../../../api/base.api';
import { HomeProduct } from '../../home/api/home.api.types';

const PRODUCTS_ENDPOINT = '/products';

class ProductDetailsApi extends BaseApi {
  getProductById = (productId: number): Promise<HomeProduct> =>
    this.getAsync<HomeProduct>(`${PRODUCTS_ENDPOINT}/${productId}`);
}

export default new ProductDetailsApi();
