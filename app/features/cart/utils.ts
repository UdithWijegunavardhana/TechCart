import {Alert} from 'react-native';
import { CartItem } from './constants';

export const updateQuantity = (
  items: CartItem[],
  id: string,
  delta: number,
): CartItem[] => {
  return items.map(item =>
    item.id === id
      ? {...item, quantity: Math.max(1, item.quantity + delta)}
      : item,
  );
};

export const clearCartWithAlert = (setItems: (items: CartItem[]) => void) => {
  Alert.alert('Clear Cart?', 'Are you sure you want to remove all items?', [
    {text: 'Cancel'},
    {text: 'Clear', onPress: () => setItems([])},
  ]);
};

export const calculateCartSummary = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = items.reduce(
    (sum, item) =>
      sum + (item.discount ? item.price * item.discount * item.quantity : 0),
    0,
  );
  const total = subtotal - discount;

  return {subtotal, discount, total};
};

