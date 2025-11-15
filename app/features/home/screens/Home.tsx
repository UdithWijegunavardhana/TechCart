import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import ErrorState from '../../../components/errorState';
import LoadingScreen from '../../../components/LoadingScreen';
import { HomeStackParamList } from '../../../navigation/stackNavigators/HomeStack';
import colors from '../../../theme/colors';
import ProductCard from '../components/ProductCard';
import { HomeStrings } from '../constants';
import {
  selectHomeError,
  selectHomeLoading,
  selectHomeProducts,
} from '../redux/homeSelectors';
import { homeSagaActions } from '../saga/homeSagaActions';

const HomeScreen = () => {
  type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp>();

  const products = useSelector(selectHomeProducts);
  const loading = useSelector(selectHomeLoading);
  const failedToFetch = useSelector(selectHomeError);

  useEffect(() => {
    dispatch(homeSagaActions.fetchProducts());
  }, []);

  const keyExtractor = useCallback((item: { id: { toString: () => any; }; }) => item.id.toString(), []);

  const renderItem = useCallback(
    ({item}) => (
      <ProductCard
        title={item.title}
        image={item.image}
        price={item.price}
        rating={item.rating}
        onPress={() =>
          navigation.navigate('ProductDetail', {productId: item.id})
        }
      />
    ),
    [navigation]
  );

  const HeaderComponent = useMemo(
    () => (
      <>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greeting}>{HomeStrings.good_morning_text}</Text>
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

        <Text style={styles.sectionTitle}>{HomeStrings.whats_new}</Text>
      </>
    ),
    [navigation]
  );

  const listContentStyle = useMemo(
    () => ({paddingBottom: 100, paddingHorizontal: 8}),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen />}
      {failedToFetch && <ErrorState message={failedToFetch} />}

      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={listContentStyle}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},

  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 40, height: 40, borderRadius: 20, marginRight: 12},
  greeting: {fontSize: 14, color: colors.textSecondary},
  name: {fontSize: 20, fontWeight: 'bold'},

  cart: {
    position: 'relative',
    backgroundColor: colors.background,
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
  badgeText: {color: colors.white, fontSize: 10},

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
});

export default HomeScreen;
