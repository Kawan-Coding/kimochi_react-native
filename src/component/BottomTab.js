import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

import cashierIcon from '../assets/img/cashier.png';
import homeIcon from '../assets/img/home.png';
import orderIcon from '../assets/img/choices.png';
import notificationIcon from '../assets/img/notification.png';
import profileIcon from '../assets/img/user.png';
export default class BottomTab extends Component {
  render() {
    return (
      <>
        <View style={styles.bottomTab}>
          <View style={styles.bottomTabContent}>
            <Image style={styles.bottomTabImages} source={homeIcon} />
            <Text style={styles.bottomTabText}>Home</Text>
          </View>
          <View style={styles.bottomTabContent}>
            <Image style={styles.bottomTabImages} source={orderIcon} />
            <Text style={styles.bottomTabText}>Order</Text>
          </View>
          <View style={styles.bottomTabContent}>
            <Image style={styles.bottomTabImages} source={cashierIcon} />
            <Text style={styles.bottomTabText}>Cashier</Text>
          </View>
          <View style={styles.bottomTabContent}>
            <Image style={styles.bottomTabImages} source={notificationIcon} />
            <Text style={styles.bottomTabText}>Notifikasi</Text>
          </View>
          <View style={styles.bottomTabContent}>
            <Image style={styles.bottomTabImages} source={profileIcon} />
            <Text style={styles.bottomTabText}>Account</Text>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#43Af4A',
    paddingVertical: 9,
  },
  bottomTabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabImages: {
    flex: 1,
    resizeMode: 'contain',
  },
  bottomTabText: {
    fontSize: 12,
    color: 'white',
  },
});
