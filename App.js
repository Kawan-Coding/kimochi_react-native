/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import Router from './src/config/router';
import {withNavigation} from 'react-navigation';

async () => {
  try {
    const getID = await AsyncStorage.getItem('ID');
    console.log(getID);
    if (getID != null) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  } catch (error) {
    console.log(error);
  }
};
const App: () => React$Node = () => {
  return (
    <>
      <Router />
    </>
  );
};
export default App;
