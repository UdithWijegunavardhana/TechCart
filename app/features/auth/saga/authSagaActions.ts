// app/redux/slices/auth/authSagaActions.ts
import {createAction} from '@reduxjs/toolkit';
import { SignInRequest } from '../api/auth.api.types';

export const authSagaActions = {
  login: createAction<SignInRequest>('Auth/Login'),
};
