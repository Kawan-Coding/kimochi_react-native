import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default SheetTitle = props => {
  return (
    <View style={styles.sheet}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'white'}}>{props.title}</Text>
        <View
          style={{alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1}}>
          <TouchableOpacity onPress={() => props.close()}>
            <Text
              style={{
                textAlign: 'right',
                color: 'white',
                paddingHorizontal: 15,
              }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    height: 50,
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
