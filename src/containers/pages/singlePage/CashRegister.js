import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import DataTopProfile from '../../../component/DataTopProfile';

import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import {ScrollView} from 'react-native-gesture-handler';
import {GetCashRegister} from '../../../config/service/Transaction';
import AsyncStorage from '@react-native-community/async-storage';

export default class CashRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create_at: null,
      open_cash: '',
    };
  }

  componentDidMount = async () => {
    let cash_flow_id;
    await AsyncStorage.getItem('cash_flow_id').then(res => {
      cash_flow_id = res;
    });
    await GetCashRegister(cash_flow_id).then(res => {
      if (res.data.error == false) {
        let data = res.data.data;

        this.setState({create_at: data.open, open_cash: data.open_cash});
      }
    });
  };
  render() {
    let data = this.state;

    // let date = IndonesiaDate(new Date(data.create_at));
    console.log(data.create_at);
    let date = new Date(data.create_at);
    console.log(date);
    date = IndonesiaDate(new Date(date));
    console.log(date);

    return (
      <>
        <DetailTop title="Cash Register" />

        <DataTopProfile />

        <ScrollView style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text>Time Register</Text>
          <View style={styles.registerBox}>
            <Text>
              {date.jam + ' : ' + date.menit + ' : ' + date.detik + ' WIB'}
            </Text>
          </View>
          <Text style={{marginTop: 20}}>Cash Register</Text>
          <View style={[styles.registerBox, {backgroundColor: 'grey'}]}>
            <Text style={{color: 'white'}}>Rp. {data.open_cash}</Text>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#cccccc',
    borderTopColor: '#cccccc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStyle: 'dotted',
  },
  registerBox: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingVertical: 12,
  },
});
