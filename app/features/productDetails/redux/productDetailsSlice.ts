import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HomeProduct } from '../../home/api/home.api.types';

interface ProductDetailsState {
  product: HomeProduct | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailsState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    getProductRequest(state) {
      state.product = null;
      state.loading = true;
      state.error = null;
    },
    getProductSuccess(state, action: PayloadAction<HomeProduct>) {
      state.product = action.payload;
      state.loading = false;
    },
    getProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductRequest, getProductSuccess, getProductFailure } =
  productDetailsSlice.actions;

export default productDetailsSlice.reducer;
