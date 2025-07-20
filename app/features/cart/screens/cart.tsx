import React from 'react';
import { Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Cart Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 20},
});

export default CartScreen;
