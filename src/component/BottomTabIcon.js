import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const BottomTabIcon = props => {
  return (
    <View style={styles.bottomTabContent}>
      <TouchableOpacity onPress={props.onPress}>
        <Image style={styles.bottomTabImages} source={props.image} />
        <Text style={styles.bottomTabText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomTabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabImages: {
    flex: 1,
    width: 24,
    alignSelf: 'center',
  },
  bottomTabText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
});
export default BottomTabIcon;
