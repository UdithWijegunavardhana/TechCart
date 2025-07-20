import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../../../components/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectHomeError,
  selectHomeLoading,
  selectHomeProducts,
} from '../redux/homeSelectors';
import {getProductsRequest, getProductsSuccess} from '../redux/homeSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../navigation/HomeStack';

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'iPhone 15',
    price: 1598,
    rating: 3,
    image: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
  },
  {
    id: 2,
    title: 'iPhone 14',
    price: 1598,
    rating: 4,
    image: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
  },
  {
    id: 3,
    title: 'iPhone 16 Pro',
    price: 1999,
    rating: 5,
    image: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
  },
];

const HomeScreen = () => {
  type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useDispatch();
  const products = useSelector(selectHomeProducts);
  // const loading = useSelector(selectHomeLoading);
  // const error = useSelector(selectHomeError);

  useEffect(() => {
    dispatch(getProductsRequest());
  }, []);

  console.log('🟩 items:', products);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.name}>John!</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cart}
          onPress={() => navigation.navigate('Cart')}>
          <Feather name="shopping-cart" size={20} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>What’s New</Text>
      <FlatList
        data={MOCK_PRODUCTS}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <ProductCard
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            onPress={() =>
              navigation.navigate('ProductDetail', {productId: item.id})
            }
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 40, height: 40, borderRadius: 20, marginRight: 12},
  greeting: {fontSize: 14, color: '#666'},
  name: {fontSize: 20, fontWeight: 'bold'},
  cart: {
    position: 'relative',
    backgroundColor: '#F1F1F1',
    padding: 8,
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {color: '#fff', fontSize: 10},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  list: {
    paddingBottom: 100,
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
