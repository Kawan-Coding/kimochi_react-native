import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
const DetailTop = props => {
  return (
    <>
      <View style={styles.detailTop}>
        <View style={styles.topLeft}>
          <Text style={{fontWeight: 'bold', color: '#fB5516', fontSize: 21}}>
            {props.title}
          </Text>
        </View>
        <View style={styles.topRight}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  detailTop: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  topLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default withNavigation(DetailTop);
