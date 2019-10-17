/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Home from './src/containers/pages/Home';
import Order from './src/containers/pages/Order';

import HeaderApp from './src/component/HeaderApp';
import BottomTab from './src/component/BottomTab';

const App: () => React$Node = () => {
  return (
    <>
      <HeaderApp />
      <Home />
      <Order />
      <BottomTab />
    </>
  );
};

export default App;
