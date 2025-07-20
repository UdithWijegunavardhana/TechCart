import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {dummyCartData} from '../constants';
import {
  calculateCartSummary,
  clearCartWithAlert,
  updateQuantity,
} from '../utils';
import CartItem from '../components/CartItem';

// TODO: Move all strings, use color const.
function CartScreen() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(dummyCartData);
  const {subtotal, discount, total} = calculateCartSummary(cartItems);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => updateQuantity(prev, id, delta));
  };

  const handleClearCart = () => {
    clearCartWithAlert(setCartItems);
  };

  const renderItem = ({item}: {item: (typeof dummyCartData)[0]}) => (
    <CartItem item={item} onUpdateQuantity={handleUpdateQuantity} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <TouchableOpacity onPress={handleClearCart}>
            <Feather name="trash" size={18} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingBottom: 100}}
        />
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discounts</Text>
            <Text>${discount.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {fontSize: 18, fontWeight: '600'},
  summary: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  totalLabel: {fontSize: 16, fontWeight: '600'},
  totalAmount: {fontSize: 18, fontWeight: '700'},
  checkoutBtn: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  checkoutText: {color: '#fff', fontWeight: '600'},
});

export default CartScreen;
