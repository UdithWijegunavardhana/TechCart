import {RootState} from '../../../redux/store';

export const selectProductDetails = (state: RootState) =>
  state.productDetails.product;
export const selectProductDetailsLoading = (state: RootState) =>
  state.productDetails.loading;
export const selectProductDetailsError = (state: RootState) =>
  state.productDetails.error;
