import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {useAuth} from '../../../contexts/AuthContext';

// TODO: Move all strings, use color const, API integration.
const ProfileScreen = () => {
  const {logout} = useAuth();
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    // avatar: require('@assets/avatar.png'),
  };

  const menuItems = [
    {icon: 'shopping-bag', label: 'Orders'},
    {icon: 'map-pin', label: 'Addresses'},
    {icon: 'credit-card', label: 'Payment Methods'},
    {icon: 'bell', label: 'Notifications'},
    {icon: 'settings', label: 'Settings'},
    {icon: 'help-circle', label: 'Help & Support'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Feather name="more-vertical" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileCard}>
          <Image source={user.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <Feather name="edit" size={16} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Feather
                name={item.icon as any}
                size={18}
                style={styles.menuIcon}
              />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#ccc" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {fontSize: 18, fontWeight: '600'},

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  avatar: {width: 60, height: 60, borderRadius: 30, marginRight: 16},
  name: {fontSize: 16, fontWeight: '600'},
  email: {color: '#666', fontSize: 13, marginTop: 4},
  editIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 20,
  },

  menuList: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  menuIcon: {
    marginRight: 16,
    color: '#333',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
  },

  logoutButton: {
    backgroundColor: '#f44336',
    margin: 16,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileScreen;
