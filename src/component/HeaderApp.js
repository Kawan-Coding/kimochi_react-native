import React, {Component} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import avatar from '../assets/img/man.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

import {IndonesiaDate} from '../config/utilities/IndonesiaDate';
import '../config/router';
const HeaderApp = props => {
  let date = IndonesiaDate(new Date());
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{flex: 1}}>
          <View style={styles.headerItemsRound}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CloseCashier')}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 12, color: 'red', fontWeight: 'bold'}}>
                  Close
                </Text>
              </View>
              {/* <Image source={avatar} style={styles.avatar} /> */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.headerItemsRound}>
            <Image source={avatar} style={styles.avatar} />
          </View>
        </View>
        <View style={{flex: 3}}>
          <View style={styles.headerUsername}>
            <Text style={styles.usernameText}>
              Teman Koding /<Text style={{color: '#fB5516'}}> Programmer</Text>
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.headerDate}>
            {date.hari +
              ', ' +
              date.tanggal +
              ' ' +
              date.bulan +
              ' ' +
              date.tahun}{' '}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#43Af4A',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDate: {
    textAlign: 'right',
    color: 'white',
    fontSize: 12,
  },
  headerItemsRound: {
    borderRadius: 40,
    width: 38,
    height: 38,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerUsername: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
  },
  usernameText: {
    fontSize: 11,
    textAlign: 'center',
  },
  avatar: {
    flex: 1,
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
});
export default withNavigation(HeaderApp);
