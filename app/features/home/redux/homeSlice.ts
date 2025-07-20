import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeProduct {
  image: string;
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
}

interface HomeProductsState {
  items: HomeProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeProductsState = {
  items: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getProductsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess(state, action: PayloadAction<HomeProduct[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    getProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
