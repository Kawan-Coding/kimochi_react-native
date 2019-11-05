import React, {Component} from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';

import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import bgOpenCashier from '../../../assets/img/bgOpenCashier.jpg';
import userIcon from '../../../assets/img/user.png';
import leftArrow from '../../../assets/img/leftArrow.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {OpenCashierService} from '../../../config/service/Pegawai';
import {SetItem, GetItem} from '../../../config/service/Storage';
// import AsyncStorage from '@react-native-community/async-storage';

export default class OpenCashier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      invalid: false,
      nama_lengkap: '',
    };
  }
  changeInvalid = bool => {
    this.setState({invalid: bool});
  };
  onChangeNumber = value => {
    this.setState({number: value});
  };
  authCashier = async () => {
    let id_responsible = '';
    await GetItem('id_responsible').then(res => {
      id_responsible = res;
    });
    let id = '';
    await GetItem('id').then(res => {
      id = res;
    });
    console.log(id_responsible);
    console.log(id);
    // let open_cash = this.state.number;
    // console.log(open_cash);
    await OpenCashierService(id_responsible, this.state.number, id).then(
      async result => {
        console.log(result);
        if (result.data.error) {
          this.changeInvalid(true);
        } else {
          this.props.navigation.navigate('Home');
        }
      },
    );
  };
  componentDidMount = async () => {
    await AsyncStorage.getItem('nama_lengkap').then(res => {
      this.setState({nama_lengkap: res});
    });
  };
  render() {
    let nama_lengkap = this.state.nama_lengkap;
    let invalid;
    if (this.state.invalid) {
      invalid = (
        <Text style={{color: 'red', textAlign: 'center', fontSize: 15}}>
          Maaf username / password anda salah
        </Text>
      );
    }

    var date = IndonesiaDate(new Date());
    return (
      <>
        <ImageBackground
          source={bgOpenCashier}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.topWrap}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Image source={leftArrow} style={styles.leftArrow} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                flex: 1,
              }}>
              <Text
                style={{
                  color: 'grey',
                  textAlign: 'right',
                }}>
                Selamat malam{'\n'}
                <Text style={{color: 'white'}}>{nama_lengkap}</Text>
                {'\n'}Selamat Bekerja
              </Text>
            </View>
          </View>
          <View style={styles.loginWrap}>
            <View style={styles.dateForm}>
              <Text
                style={{color: 'white', textAlign: 'center', marginBottom: 20}}>
                <Text style={{fontSize: 48}}>{date.tanggal + '\n'}</Text>
                <Text style={{fontSize: 24}}>
                  {date.bulan + ' ' + date.tahun + '\n'}
                </Text>
                <Text>{date.jam + '.' + date.menit + '.' + date.detik}</Text>
              </Text>
            </View>
            <View style={styles.titleForm}>
              <Text style={{color: 'white'}}>Cash Register</Text>
            </View>
            <View style={styles.loginForm}>
              <View style={styles.formImg}>
                <Text style={styles.currency}>Rp.</Text>
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.Input}
                  value={this.state.number}
                  keyboardType={'numeric'}
                  onChangeText={number => this.onChangeNumber(number)}
                />
              </View>
            </View>
            {invalid}
            <TouchableOpacity onPress={() => this.authCashier()}>
              <View style={styles.btnWrap}>
                <Text style={{color: '#fB5516'}}>OPEN CASHIER</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              marginBottom: 10,
            }}>
            V.1.0
          </Text>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  topWrap: {
    flexDirection: 'row',
    padding: 15,
    height: 80,
  },
  leftArrow: {
    width: 45,
    height: 38,
  },
  loginWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleForm: {
    width: 260,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 7,
  },
  loginForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 260,
    opacity: 0.9,
    borderRadius: 30,
  },
  formImg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  currency: {
    color: '#fB5516',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconImg: {
    width: 25,
    height: 30,
  },
  formInput: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  Input: {
    color: '#fB5516',
    width: 210,
    fontSize: 18,
  },
  btnWrap: {
    marginTop: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 260,
    paddingVertical: 10,
    opacity: 0.9,
  },
  loginBtn: {
    borderRadius: 10,
  },
});
