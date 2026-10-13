import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/redux/authSlice';
import homeReducer from '../features/home/redux/homeSlice';
import productDetailsReducer from '../features/productDetails/redux/productDetailsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  productDetails: productDetailsReducer,
});

export default rootReducer;
