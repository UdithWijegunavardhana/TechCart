import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import ErrorState from '../../../components/errorState';
import LoadingScreen from '../../../components/LoadingScreen';
import {HomeStackParamList} from '../../../navigation/stackNavigators/HomeStack';
import {ProductDetailsStrings} from '../constants';
import {
  selectProductDetails,
  selectProductDetailsError,
  selectProductDetailsLoading,
} from '../redux/productDetailsSelectors';
import {productDetailsSagaActions} from '../saga/productDetailsSagaActions';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

// TODO: use color const.
const ProductDetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {productId} = route.params;
  const dispatch = useDispatch();
  const product = useSelector(selectProductDetails);
  const loading = useSelector(selectProductDetailsLoading);
  const failedToFetch = useSelector(selectProductDetailsError);
  const [quantity, setQuantity] = useState(1);
  const totalPrice = quantity * (product?.price ?? 0);

  const fetchProduct = useCallback(() => {
    dispatch(productDetailsSagaActions.fetchProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} color="black" />
          </Pressable>
          <Text style={styles.headerText}>
            {ProductDetailsStrings.item_details}
          </Text>
        </View>
        {loading && <LoadingScreen />}
        {!loading && failedToFetch && (
          <ErrorState message={failedToFetch} onRetry={fetchProduct} />
        )}
        {!loading && !failedToFetch && product && (
          <>
            <Image
              source={{uri: product.images?.[0] ?? product.thumbnail}}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.infoSection}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{product.title}</Text>
                <View style={styles.ratingBadge}>
                  <Feather name="star" size={20} color="#fff" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
              </View>
              <Text style={styles.discountBadge}>
                {ProductDetailsStrings.discount}{' '}
                {Math.round(product.discountPercentage)}%
              </Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.subheading}>
                {ProductDetailsStrings.tags}
              </Text>
              <Text style={styles.tags}>
                {product.tags.map(tag => `#${tag}`).join(' ')}
              </Text>
              <Text style={styles.subheading}>
                {ProductDetailsStrings.quantity}
              </Text>
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
                  <Text style={styles.buttonText}>
                    {ProductDetailsStrings.add_to_cart}
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
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
