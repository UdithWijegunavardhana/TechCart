import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/redux/authSlice';
import homeReducer from '../features/home/redux/homeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

export default rootReducer;
