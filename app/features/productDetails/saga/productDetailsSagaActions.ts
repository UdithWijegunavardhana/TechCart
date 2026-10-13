import { createAction } from '@reduxjs/toolkit';

export const productDetailsSagaActions = {
  fetchProduct: createAction<number>('ProductDetails/FetchProduct'),
};
