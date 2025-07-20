import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

type CartItemProps = {
  item: {
    id: string;
    name: string;
    image: any;
    price: number;
    quantity: number;
    discount?: number | null;
  };
  onUpdateQuantity: (id: string, delta: number) => void;
};

export default function CartItem({item, onUpdateQuantity}: CartItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>
          The display has rounded corners that follow a beautiful curved
          design...
        </Text>
        <View style={styles.priceRow}>
          {item.discount && (
            <Text style={styles.discountText}>
              -{Math.round(item.discount * 100)}%
            </Text>
          )}
          <Text style={styles.price}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, -1)}
            style={styles.qtyBtn}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, 1)}
            style={styles.qtyBtn}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  image: {width: 70, height: 70, borderRadius: 8, marginRight: 12},
  itemInfo: {flex: 1},
  title: {fontWeight: '600', fontSize: 16},
  description: {color: '#777', fontSize: 12, marginVertical: 4},
  priceRow: {flexDirection: 'row', alignItems: 'center'},
  price: {fontWeight: '600', fontSize: 16},
  discountText: {
    backgroundColor: '#ffe4c4',
    color: '#d35400',
    fontSize: 10,
    marginRight: 6,
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  qtyText: {fontSize: 16},
  qtyCount: {marginHorizontal: 8, fontSize: 16},
});
