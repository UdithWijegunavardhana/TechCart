import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';

import {useAuth} from '../../../contexts/AuthContext';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import {FormData, SignInStrings} from '../consts';
import {passwordRules, usernameRules} from '../validation';
import colors from '../../../theme/colours';

const SignInScreen = () => {
  const {login, loading} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    login(data.username, data.password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ios: 'padding', android: undefined})}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{SignInStrings.header}</Text>
        <View style={styles.form}>
          <Controller
            control={control}
            name="username"
            rules={usernameRules}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
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
          {errors.username ? (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          ) : null}
          <Controller
            control={control}
            name="password"
            rules={passwordRules}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
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
                    onPress={() => setShowPassword(prev => !prev)}>
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
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          ) : null}
          <Button
            title="Log In"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
          <TouchableOpacity style={styles.forgotContainer}>
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
