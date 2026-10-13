import { AxiosError } from 'axios';

import { HomeProduct } from '../../home/api/home.api.types';
import ProductDetailsApi from './productDetails.api';

const ProductDetailsService = {
  getById: async (productId: number): Promise<HomeProduct> => {
    try {
      return await ProductDetailsApi.getProductById(productId);
    } catch (error) {
      const err = error as AxiosError;
      console.error('ProductDetailsService - getById error:', err.message);
      return Promise.reject(err);
    }
  },
};

export default ProductDetailsService;
