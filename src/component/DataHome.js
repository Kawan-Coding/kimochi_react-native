import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default class DataHome extends Component {
  render() {
    return (
      <>
        <View style={styles.dataInner}>
          <Text style={styles.dataText}>Total Customer</Text>
          <View style={[styles.btnWrap, {flex: 1}]}>
            <TextInput style={styles.dataInput} value="1200" />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  btnWrap: {
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flex: 1,
    opacity: 0.9,
  },

  dataInner: {
    padding: 15,
  },
  dataInput: {
    width: 170,
    textAlign: 'center',
  },
  dataText: {
    textAlign: 'center',
    color: '#00effe',
  },
});
