import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import bgHome from '../../../assets/img/bgHome.jpg';
import rocket from '../../../assets/img/speed.png';
import userAdd from '../../../assets/img/userAdd.png';

import DataHome from '../../../component/DataHome';
import KimochiModal from '../../../component/KimochiModal';

import {CheckCustomerNumber} from '../../../config/service/Pegawai';
import {GetDataWelcome} from '../../../config/service/Transaction';
import {GetItem} from '../../../config/service/Storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalVisible: '',
      number: '',
      modalStatus: '',
      customer_id: null,
    };
  }
  changeModalVisibility = bool => {
    this.setState({
      isModalVisible: bool,
    });
  };
  checkCustomer = async number => {
    await CheckCustomerNumber(number).then(result => {
      if (result.data.error) {
        this.setState({modalStatus: 'unregistered'});
        this.displayModal();
      } else {
        this.setState({
          modalStatus: 'registered',
          customer_id: result.data.data.id,
        });
        this.displayModal();
      }
    });
  };
  redirectRegister = () => {
    this.changeModalVisibility(false);
    this.props.navigation.navigate('CustomerRegister');
  };
  redirectOrder = () => {
    this.changeModalVisibility(false);
    this.props.navigation.navigate('CustomerOrder', {
      customer_id: this.state.customer_id,
    });
  };
  displayModal = () => {
    this.changeModalVisibility(true);
  };
  getTransaction = async responsible_id => {
    await GetDataWelcome(responsible_id).then(res => {
      if (res.data.error) {
        console.log(res.data);
      } else {
        console.log(res.data.data);
        this.setState({data: res.data.data});
      }
    });
  };
  componentDidMount = async () => {
    await GetItem('id_responsible').then(async res => {
      await this.getTransaction(res);
    });
  };
  render() {
    let kimochimodal;
    if (this.state.modalStatus == 'unregistered') {
      kimochimodal = (
        <KimochiModal
          opacity={this.state.isModalVisible}
          hide={() => this.changeModalVisibility}
          message={
            'Customer belum terdaftar di dalam sistem KIMOCHI GARAGE \n\n Silahkan daftar Customer'
          }
          icon={userAdd}
          option={false}
          function={this.redirectRegister}
        />
      );
    }
    if (this.state.modalStatus == 'registered') {
      kimochimodal = (
        <KimochiModal
          opacity={this.state.isModalVisible}
          hide={this.changeModalVisibility}
          message={
            'Customer telah terdaftar di dalam sistem KIMOCHI GARAGE \n\n Silahkan lanjut order'
          }
          icon={userAdd}
          option={false}
          function={this.redirectOrder}
        />
      );
    }
    let data = {
      total_customer: 0,
      total_antrian: 0,
      total_omset: 0,
      cash_register: 0,
    };
    if (this.state.data.length != 0) {
      data = this.state.data;
      console.log(data);
    }
    return (
      <>
        <HeaderApp />
        <ImageBackground source={bgHome} style={{flex: 1, zIndex: -10}}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
              <Text style={[styles.centerWhite, styles.titleText]}>
                Welcome to{' '}
                <Text style={{fontWeight: 'bold'}}>KIMOCHI GARAGE</Text>
              </Text>

              <Text style={[styles.centerWhite, {marginBottom: 15}]}>
                Enter your phone number
              </Text>

              <View style={styles.btnWrap}>
                <TextInput
                  style={styles.numInput}
                  value={this.state.number}
                  keyboardType={'number-pad'}
                  onChangeText={number => this.setState({number: number})}
                />
              </View>

              <View style={styles.rocketWrap}>
                <TouchableOpacity
                  onPress={() => this.checkCustomer(this.state.number)}>
                  <Image source={rocket} style={styles.rocketImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.container, {marginTop: 40}]}>
              <View style={styles.dataWrap}>
                <DataHome
                  amount={data.total_customer}
                  title={'Total Customer'}
                  color={'#34e1eb'}
                />
                <DataHome
                  amount={data.cash_register}
                  title={'Cash Register'}
                  color={'yellow'}
                />
              </View>
              <View style={styles.dataWrap}>
                <DataHome
                  amount={data.total_antrian}
                  title={'Total Antrian'}
                  color={'#34e1eb'}
                />
                <DataHome
                  amount={data.total_omset}
                  title={'Total Omset'}
                  color={'yellow'}
                />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        <BottomTab />
        {kimochimodal}
        {/* <KimochiModal
          opacity={this.state.isModalVisible}
          hide={() => this.changeModalVisibility}
        /> */}
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
  btnWrap: {
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flex: 1,
    opacity: 0.9,
  },
  numInput: {
    paddingVertical: 10,
    color: '#fB5516',
    height: 50,
    width: 280,
    textAlign: 'center',
    zIndex: 10000,
  },
  centerWhite: {
    textAlign: 'center',
    color: 'white',

    fontSize: 16,
  },
  titleText: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 20,
    marginTop: 15,
  },
  rocketWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    backgroundColor: '#3390d3',
    borderRadius: 100,
    width: 160,
    height: 160,
    opacity: 0.95,
  },
  rocketImg: {
    width: 100,
    height: 100,
  },
  dataWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    width: '100%',
    opacity: 0.8,
  },
});
