import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import NotifCard from '../../../component/NotifCard';
import clearNotif from '../../../assets/img/clearNotif.png';
export default class Notification extends Component {
  render() {
    return (
      <>
        <HeaderApp />
        <ScrollView>
          <View style={styles.clearNotif}>
            <TouchableOpacity>
              <Image source={clearNotif} style={{width: 30, height: 30}} />
              <Text>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notifList}>
            <NotifCard />
            <NotifCard />
            <NotifCard />
            <NotifCard />
            <NotifCard />
            <NotifCard />
            {/* <FlatList /> */}
          </View>
        </ScrollView>
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
  clearNotif: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
