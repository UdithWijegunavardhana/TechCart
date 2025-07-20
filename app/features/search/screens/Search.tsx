import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const recentSearches = ['iPhone X', 'iPhone SE'];

const dummyProducts = [
  {
    id: 1,
    name: 'iPhone 14 Pro Max',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    price: 1598.0,
    // image: require('../../../assets/iphone14.png'),
  },
];

// TODO: Move all strings, use color const, API integration.
const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState(dummyProducts);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = dummyProducts.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredResults(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Feather
            name="search"
            size={18}
            color="#888"
            style={{marginRight: 8}}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={query}
            onChangeText={handleSearch}
          />
        </View>

        {query === '' ? (
          <Text style={styles.placeholder}>Start typing to search...</Text>
        ) : filteredResults.length > 0 ? (
          <FlatList
            data={filteredResults}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingTop: 16}}
            renderItem={({item}) => (
              <View style={styles.resultCard}>
                <Image source={item.image} style={styles.resultImage} />
                <View style={{flex: 1}}>
                  <Text style={styles.resultTitle}>{item.name}</Text>
                  <Text style={styles.resultDescription} numberOfLines={1}>
                    {item.description}
                  </Text>
                  <Text style={styles.resultPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.recentSearchTitle}>Recent Searches</Text>
            <View style={styles.recentSearchContainer}>
              {recentSearches.map((item, index) => (
                <Text key={index} style={styles.recentSearchTag}>
                  {item}
                </Text>
              ))}
            </View>

            <Image
              // source={require('../../../assets/no-result.png')}
              style={styles.noResultImage}
            />
            <Text style={styles.noResultText}>No Result Found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  placeholder: {
    marginTop: 20,
    textAlign: 'center',
    color: '#aaa',
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 13,
    color: '#777',
  },
  resultPrice: {
    marginTop: 4,
    fontWeight: '700',
    fontSize: 14,
  },
  noResultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  recentSearchTitle: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  recentSearchContainer: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  recentSearchTag: {
    backgroundColor: '#fbe5ce',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 13,
    color: '#333',
  },
  noResultImage: {
    width: 120,
    height: 120,
    marginVertical: 20,
    opacity: 0.5,
  },
  noResultText: {
    color: '#888',
    fontSize: 16,
  },
});
