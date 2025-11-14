import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {useAuth} from '../app/contexts/AuthContext';
import SignInScreen from '../app/features/auth/screens/SignIn';

jest.mock('react-native-vector-icons/Feather', () => 'Feather');
jest.mock('../app/contexts/AuthContext');
jest.mock('../app/components/InputField', () => {
  const {TextInput, View, TouchableOpacity, Text} = require('react-native');
  return ({
    placeholder,
    onChangeText,
    value,
    iconLeft,
    iconRight,
    onPressRightIcon,
  }) => (
    <View>
      {iconLeft}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {iconRight ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="eye"
          onPress={onPressRightIcon}>
          <Text>eye</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
});
jest.mock('../app/components/Button', () => {
  const {Text, TouchableOpacity} = require('react-native');
  return ({title, onPress, loading}) => (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

describe('SignInScreen', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({login: mockLogin, loading: false});
    mockLogin.mockClear();
    jest.clearAllMocks();
  });

  it('renders SignInScreen correctly', () => {
    const {getByText, toJSON} = render(<SignInScreen />);
    expect(getByText('Log In')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('toggles password visibility', () => {
    const {getByRole} = render(<SignInScreen />);
    const toggleButton = getByRole('button', {name: /eye/i});
    expect(toggleButton).toBeTruthy();
  });

  it('calls login on form submit', async () => {
    const {getByPlaceholderText, getByText} = render(<SignInScreen />);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  // it('spies on the login function to verify it is called', async () => {
  //   const spy = jest.spyOn({mockLogin}, 'mockLogin');

  //   const {getByPlaceholderText, getByText} = render(<SignInScreen />);

  //   fireEvent.changeText(getByPlaceholderText('Username'), 'udith');
  //   fireEvent.changeText(getByPlaceholderText('Password'), '12345');
  //   fireEvent.press(getByText('Log In'));

  //   await waitFor(() => {
  //     expect(spy).toHaveBeenCalledTimes(1);
  //     expect(spy).toHaveBeenCalledWith('udith', '12345');
  //   });

  //   spy.mockRestore();
  // });
});
