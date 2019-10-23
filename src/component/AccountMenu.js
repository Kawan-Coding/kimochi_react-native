import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
const AccoutMenu = props => {
  return (
    <>
      <View style={styles.menuWrap}>
        <View style={styles.menuIcon}>
          <Image source={props.image} style={styles.iconImg} />
        </View>
        <View style={styles.menuAction}>
          <Text style={styles.menuActionText}>{props.title}</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  menuWrap: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  menuIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImg: {
    width: 40,
    height: 40,
  },
  menuAction: {
    flex: 4,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
export default AccoutMenu;
