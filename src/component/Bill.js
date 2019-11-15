import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
const ListTop = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <Text>{props.title}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>{props.content}</Text>
        </View>
      </View>
    </>
  );
};

const ListBottom = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <Text style={props.bold ? {fontWeight: 'bold'} : {fontWeight: '100'}}>
            {props.title}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text>{props.amount}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>RP. {props.price}</Text>
        </View>
      </View>
    </>
  );
};

export {ListTop, ListBottom};
