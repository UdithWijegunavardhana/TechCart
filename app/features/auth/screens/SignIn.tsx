import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import { useAuth } from '../../../contexts/AuthContext';
import colors from '../../../theme/colors';
import { FormData, SignInStrings } from '../constants';
import { passwordRules, usernameRules } from '../validation';

const SignInScreen = () => {
  const BASE_URL = Config.API_URL;
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: useMemo(
      () => ({
        username: '',
        password: '',
      }),
      []
    ),
  });

  const togglePassword = useCallback(
    () => setShowPassword(prev => !prev),
    []
  );

  const onSubmit = useCallback(
    (data: FormData) => {
      login(data.username, data.password);
    },
    [login]
  );

  const HeaderTitle = useMemo(
    () => <Text style={styles.title}>{SignInStrings.header}</Text>,
    []
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.innerContainer}>
        {HeaderTitle}

        <View style={styles.form}>
          <Controller
            control={control}
            name="username"
            rules={usernameRules}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                testID="UsernameInput"
                placeholder="Username"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                iconLeft={
                  <Feather name="user" size={18} color={colors.textSecondary} />
                }
              />
            )}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            rules={passwordRules}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                testID="PasswordInput"
                placeholder="Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={!showPassword}
                iconLeft={
                  <Feather name="lock" size={18} color={colors.textSecondary} />
                }
                iconRight={
                  <TouchableOpacity
                    onPress={togglePassword}
                    testID="togglePasswordButton"
                  >
                    <Feather
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={18}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                }
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Button
            testID="logInButton"
            title="Log In"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.forgotContainer}
            testID="forgotPasswordButton"
          >
            <Text style={styles.forgotText}>
              {SignInStrings.forgot_password}
            </Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            {SignInStrings.terms_and_conditions}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 4,
  },
  forgotContainer: {
    marginTop: 8,
    alignSelf: 'center',
  },
  forgotText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 24,
  },
});

export default SignInScreen;
