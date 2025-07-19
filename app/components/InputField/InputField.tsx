import React, {useState, useEffect, useRef} from 'react';
import {
  TextInput,
  View,
  Animated,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface InputFieldProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  secureTextEntryToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  iconLeft,
  iconRight,
  secureTextEntryToggle,
  secureTextEntry,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalSecure, setInternalSecure] = useState(!!secureTextEntry);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [animatedLabel, isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: iconLeft ? 36 : 12,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 4],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: '#999',
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {iconLeft && <View style={styles.leftIcon}>{iconLeft}</View>}
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          inputStyle,
          {paddingLeft: iconLeft ? 36 : 12, paddingRight: iconRight ? 36 : 12},
        ]}
        secureTextEntry={internalSecure}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {secureTextEntryToggle && (
        <Pressable
          style={styles.rightIcon}
          onPress={() => setInternalSecure(!internalSecure)}>
          <Feather
            name={internalSecure ? 'eye' : 'eye-off'}
            size={20}
            color="#666"
          />
        </Pressable>
      )}
      {!secureTextEntryToggle && iconRight && (
        <View style={styles.rightIcon}>{iconRight}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 8,
    color: '#000',
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: 16,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: 16,
    zIndex: 1,
  },
});

export default InputField;
