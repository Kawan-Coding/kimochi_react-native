import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import edit from '../../../assets/img/edit.png';
import fund from '../../../assets/img/fundsBlack.png';
import budget from '../../../assets/img/budgetBlack.png';
import money from '../../../assets/img/moneyBlack.png';
import cashier from '../../../assets/img/cashierBlack.png';
import calendar from '../../../assets/img/calendarBlack.png';

import AccoutMenu from '../../../component/AccountMenu';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
    };
    this.getProfile();
  }
  async getProfile() {
    const formData = new FormData();
    formData.append('id', await AsyncStorage.getItem('ID'));
    return await axios({
      url: 'http://kawankoding.kampungbudaya.com/sapi/pegawai/read',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        this.setState(dataSource);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const data = this.state.dataSource;
    console.log(data);
    return (
      <>
        <HeaderApp />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.accountHeader}>My Account</Text>
            <View style={styles.accountCard}>
              <View style={styles.cardLeft}>
                <Text style={{fontWeight: 'bold'}}>{data.username}</Text>
                <Text>kawancoding@gmail.com</Text>
                <Text>+628223844937</Text>
              </View>
              <View style={styles.cardRight}>
                <TouchableOpacity>
                  <Text style={{color: '#43Af4A', fontSize: 16}}>Edit</Text>
                  {/* <Image
                    source={edit}
                    style={{flex: 1, width: 25, alignSelf: 'center'}}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.accountMenu}>
              <AccoutMenu image={fund} title={'Cash Register'} />
              <AccoutMenu image={budget} title={'Omset Hari Ini'} />
              <AccoutMenu image={money} title={'Setoran Hari Ini'} />
              <AccoutMenu image={cashier} title={'Transaksi Hari Ini'} />
              <AccoutMenu image={calendar} title={'History Transaksi'} />
            </View>
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
  },
  accountHeader: {
    marginLeft: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  accountCard: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    flex: 1,
    flexDirection: 'row',
  },
  cardLeft: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardRight: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  accountMenu: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
