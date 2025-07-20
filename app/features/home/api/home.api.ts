import axios, { AxiosResponse } from 'axios';

import { HomeProductsResponse } from './home.api.types';

const GET_PRODUCTS_ENDPOINT = 'https://dummyjson.com/products';

const HomeProductApi = {
  getAllProducts: (): Promise<AxiosResponse<HomeProductsResponse>> => {
    return axios.get(GET_PRODUCTS_ENDPOINT, {
      headers: {'Content-Type': 'application/json'},
    });
  },
};

export default HomeProductApi;
