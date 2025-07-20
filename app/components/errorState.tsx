import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

// TODO: Move all strings, use color const.
const ErrorState: React.FC<ErrorStateProps> = ({message = '', onRetry}) => {
  return (
    <View style={styles.container}>
      <Feather name="alert-circle" size={48} color="#FF3B30" />
      <Text style={styles.messageTop}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginTop: 12,
  },
  messageTop: {
    fontSize: 16,
    color: '#333',
    marginTop: 12,
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2ECC71',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ErrorState;
