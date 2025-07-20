import { AxiosError } from 'axios';

import { HomeProductsResponse } from './home.api.types';
import HomeProductApi from './home.api';

const ProductService = {
  getAll: async (): Promise<HomeProductsResponse> => {
    try {
      const response = await HomeProductApi.getAllProducts();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error('ProductService - getAll error:', err.message);
      return Promise.reject(err);
    }
  },
};

export default ProductService;
