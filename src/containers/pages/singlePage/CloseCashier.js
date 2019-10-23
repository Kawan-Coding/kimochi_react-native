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
import bgCloseCashier from '../../../assets/img/bgCloseCashier.jpg';
import userIcon from '../../../assets/img/user.png';
import leftArrow from '../../../assets/img/leftArrow.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

import KimochiModal from '../../../component/KimochiModal';
export default class CloseCashier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      number: '10000',
    };
  }
  changeModalVisibility = bool => {
    this.setState({
      isModalVisible: bool,
    });
  };

  render() {
    var date = IndonesiaDate(new Date());
    return (
      <>
        <ImageBackground
          source={bgCloseCashier}
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
                <Text style={{color: 'white'}}>Nama Kasir</Text>
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
              <Text style={{color: 'white'}}>Cash Deposit</Text>
            </View>
            <View style={styles.loginForm}>
              <View style={styles.formImg}>
                <Text style={styles.currency}>Rp.</Text>
              </View>
              <View style={styles.formInput}>
                <TextInput style={styles.Input} value={this.state.number} />
              </View>
            </View>
            <TouchableOpacity onPress={() => this.changeModalVisibility(true)}>
              <View style={styles.btnWrap}>
                <Text style={{color: '#fB5516'}}>CLOSE CASHIER</Text>
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
        <KimochiModal
          opacity={this.state.isModalVisible}
          hide={() => this.changeModalVisibility()}
        />
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
