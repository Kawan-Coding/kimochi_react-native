import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
export default class Cashier extends Component {
  render() {
    return (
      <>
        <HeaderApp />
        <View style={styles.container}>
          <Text>Cashier</Text>
        </View>
        <BottomTab />
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
