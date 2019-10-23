import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

import BottomTabIcon from './BottomTabIcon';
import cashierIcon from '../assets/img/cashier.png';
import homeIcon from '../assets/img/home.png';
import orderIcon from '../assets/img/choices.png';
import notificationIcon from '../assets/img/notification.png';
import profileIcon from '../assets/img/user.png';

import {withNavigation} from 'react-navigation';

const BottomTab = props => {
  return (
    <>
      <View style={styles.bottomTab}>
        <BottomTabIcon
          title="Home"
          image={homeIcon}
          onPress={() => props.navigation.navigate('Home')}
        />
        <BottomTabIcon
          title="Order"
          image={orderIcon}
          onPress={() => props.navigation.navigate('Order')}
        />
        <BottomTabIcon
          title="Cashier"
          image={cashierIcon}
          onPress={() => props.navigation.navigate('Cashier')}
        />
        <BottomTabIcon
          title="Notification"
          image={notificationIcon}
          onPress={() => props.navigation.navigate('Notification')}
        />
        <BottomTabIcon
          title="Profile"
          image={profileIcon}
          onPress={() => props.navigation.navigate('Profile')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#43Af4A',
    paddingVertical: 9,
    zIndex: 100,
  },
});
export default withNavigation(BottomTab);
