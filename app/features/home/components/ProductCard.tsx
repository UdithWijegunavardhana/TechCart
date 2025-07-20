import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../../../theme/colors';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating?: number;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  rating = 0,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <Feather
            key={i}
            name="star"
            size={14}
            color={i < rating ? colors.starFilled : colors.starEmpty}
          />
        ))}
      </View>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    margin: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProductCard;
