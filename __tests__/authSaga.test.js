import {runSaga, stdChannel} from 'redux-saga';

import {authSaga} from '../app/features/auth/saga/authSaga';
import {authSagaActions} from '../app/features/auth/saga/authSagaActions';
import AuthService from '../app/features/auth/api/auth.service';
import {setAuthHeader, removeAuthHeader} from '../app/api/axiosInstance';
import {storage, StorageKeys} from '../app/utils/storage';

jest.mock('../app/utils/storage', () => ({
  storage: {set: jest.fn(), getString: jest.fn(), delete: jest.fn()},
  StorageKeys: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER: 'user',
  },
}));
jest.mock('../app/api/axiosInstance', () => ({
  setAuthHeader: jest.fn(),
  removeAuthHeader: jest.fn(),
}));
jest.mock('../app/features/auth/api/auth.service', () => ({login: jest.fn()}));

const signInResponse = {
  accessToken: 'access',
  refreshToken: 'refresh',
  id: 1,
  username: 'emilys',
  email: 'emily@example.com',
  firstName: 'Emily',
  lastName: 'Johnson',
  gender: 'female',
  image: 'https://dummyjson.com/icon/emilys/128',
};
const {accessToken, refreshToken, ...user} = signInResponse;

const run = async action => {
  const dispatched = [];
  const channel = stdChannel();
  const task = runSaga({channel, dispatch: a => dispatched.push(a)}, authSaga);
  channel.put(action);
  await new Promise(resolve => setImmediate(resolve));
  task.cancel();
  return dispatched;
};

describe('authSaga', () => {
  beforeEach(() => jest.clearAllMocks());

  it('login sets the auth header and persists the user without tokens', async () => {
    AuthService.login.mockResolvedValue(signInResponse);

    const dispatched = await run(
      authSagaActions.login({username: 'emilys', password: 'emilyspass'}),
    );

    expect(setAuthHeader).toHaveBeenCalledWith('access');
    expect(storage.set).toHaveBeenCalledWith(
      StorageKeys.USER,
      JSON.stringify(user),
    );
    expect(dispatched[0].payload).toEqual({
      token: 'access',
      refreshToken: 'refresh',
      user,
    });
  });

  it('restoreSession restores the stored user and sets the auth header', async () => {
    storage.getString.mockImplementation(
      key =>
        ({
          accessToken: 'access',
          refreshToken: 'refresh',
          user: JSON.stringify(user),
        }[key]),
    );

    const dispatched = await run(authSagaActions.restoreSession());

    expect(setAuthHeader).toHaveBeenCalledWith('access');
    expect(dispatched[0].payload.user).toEqual(user);
  });

  it('logout clears the stored user and the auth header', async () => {
    await run(authSagaActions.logout());

    expect(storage.delete).toHaveBeenCalledWith(StorageKeys.USER);
    expect(removeAuthHeader).toHaveBeenCalled();
  });
});
