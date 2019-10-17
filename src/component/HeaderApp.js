import React, {Component} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import avatar from '../assets/img/man.png';
export default class HeaderApp extends Component {
  render() {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={{flex: 1}}>
            <View style={styles.headerItemsRound}>
              <Image source={avatar} style={styles.avatar} />
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
                Teman Koding /
                <Text style={{color: '#fB5516'}}> Programmer</Text>
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.headerDate}>Rabu 31 Juli 2019</Text>
          </View>
        </View>
      </>
    );
  }
}

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
