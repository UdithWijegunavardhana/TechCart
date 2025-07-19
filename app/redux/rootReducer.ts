import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/redux/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // add more slices here
});

export default rootReducer;
