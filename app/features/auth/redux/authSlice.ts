import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: any;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(
      state,
      _action: PayloadAction<{username: string; password: string}>,
    ) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{token: string; refreshToken: string; user: any}>,
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const {loginRequest, loginSuccess, loginFailure, logout} =
  authSlice.actions;

export default authSlice.reducer;
