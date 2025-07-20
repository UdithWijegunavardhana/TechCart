import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {HomeStackParamList} from '../../../navigation/HomeStack';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

const ProductDetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {productId} = route.params;
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 1598;
  const totalPrice = quantity * unitPrice;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} color="black" />
          </Pressable>
          <Text style={styles.headerText}>Item Details</Text>
        </View>
        <Image
          // source={require('./assets/iphone15.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>iPhone 15</Text>
            <View style={styles.ratingBadge}>
              <Feather name="star" size={20} color="#fff" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>
          <Text style={styles.discountBadge}>discount 7%</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat...
          </Text>
          <Text style={styles.subheading}>Tags</Text>
          <Text style={styles.tags}>#iPhone #iPhone15 #Apple</Text>
          <Text style={styles.subheading}>Quantity</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#d18850"
            thumbTintColor="#d18850"
            value={quantity}
            onValueChange={setQuantity}
          />
          <Text style={styles.quantityIndicator}>{quantity}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  image: {
    width: '100%',
    height: '35%',
    alignSelf: 'center',
  },
  infoSection: {
    paddingTop: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8caa6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: '#000',
    fontWeight: '600',
  },
  discountBadge: {
    backgroundColor: '#f9e0c4',
    alignSelf: 'flex-start',
    marginVertical: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    color: '#b6721d',
    fontWeight: '600',
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginVertical: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  tags: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  slider: {
    width: width - 60,
    height: 40,
  },
  quantityIndicator: {
    alignSelf: 'flex-end',
    backgroundColor: '#f9e0c4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: -10,
    marginBottom: 20,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
