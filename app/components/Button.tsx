import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from 'react-native';

import colors from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  height?: number;
}

// TODO: use color const.
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
  iconLeft,
  iconRight,
  backgroundColor = colors.black,
  textColor = colors.white,
  borderRadius = 12,
  height = 48,
}) => {
  const containerStyle = StyleSheet.flatten([
    styles.base,
    {
      backgroundColor: disabled ? colors.disabled : backgroundColor,
      borderRadius,
      height,
      width: fullWidth ? ('100%' as DimensionValue) : undefined,
      opacity: disabled ? 0.7 : 1,
    },
    style,
  ]);

  const titleStyle = StyleSheet.flatten([
    styles.text,
    {color: textColor},
    textStyle,
  ]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={containerStyle}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          <Text style={titleStyle}>{title}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
