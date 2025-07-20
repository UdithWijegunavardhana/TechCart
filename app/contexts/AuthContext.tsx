import React, {createContext, useContext, ReactNode, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {RootState} from '../redux/store';
import {authSagaActions} from '../features/auth/saga/authSagaActions';

interface AuthContextType {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();
  const {token, user, loading, error} = useSelector(
    (state: RootState) => state.auth,
  );
  const isAuthenticated = !!token;

  const value = useMemo(() => {
    return {
      token,
      user,
      isAuthenticated,
      loading,
      error,
      login: (username: string, password: string) => {
        dispatch(authSagaActions.login({username, password}));
      },
      logout: () => {
        dispatch(authSagaActions.logout());
      },
    };
  }, [token, user, isAuthenticated, loading, error, dispatch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
