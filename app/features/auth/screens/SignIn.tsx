import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';

import {useAuth} from '../../../contexts/AuthContext';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import {FormData} from '../consts';

const SignInScreen = () => {
  const {login, loading} = useAuth();

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
    console.log('🟩 data', data);
    login(data.username, data.password);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        rules={{required: 'Username is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <InputField
            placeholder="Username"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            iconLeft={<Feather name="user" size={18} color="#666" />}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{required: 'Password is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <InputField
            placeholder="Password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry
            secureTextEntryToggle
            iconLeft={<Feather name="lock" size={18} color="#666" />}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
  },
});

export default SignInScreen;
