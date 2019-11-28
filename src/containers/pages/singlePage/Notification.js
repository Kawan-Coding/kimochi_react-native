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
import {GetAllNotif} from '../../../config/service/Notification';
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    await GetAllNotif().then(res => {
      this.setState({data: res});
    });
  };
  render() {
    let notifCard;
    if (this.state.data.length != 0) {
      let data = this.state.data.data.data;
      notifCard = data.map((res, index) => {
        return (
          <>
            <NotifCard
              title={res.judul}
              content={res.detail}
              create_at={res.create_at}
              key={index + 's'}
              id={res.id}
            />
          </>
        );
      });
    }
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
            {notifCard}
            {/* <NotifCard />
            <NotifCard />
            <NotifCard />
            <NotifCard />
            <NotifCard />
            <NotifCard /> */}
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
