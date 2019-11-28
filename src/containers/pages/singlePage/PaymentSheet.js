import React, {Component} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import SheetTitle from '../../../component/SheetTitle';
import {GetPayment} from '../../../config/service/Transaction';
import {GetItem} from '../../../config/service/Storage';

export default class PaymentSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.navigation.state.params.total,

      method: 'tunai',
      nominal: null,
      kembalian: 0,
      no_rek: null,
      payment_method: [],
      payment_method_label: 'Pilih metode pembayaran',
      payment_method_id: '',

      payment_method_choosen: false,
      isModalReactVisible: false,
    };
  }

  componentDidMount = async () => {
    await GetItem('cabang_id').then(async res => {
      await GetPayment(res).then(res => {
        console.log(res.data.data);
        this.setState({payment_method: res.data.data});
        res.data.data.map(res => {
          if (res.jenis == 'tunai') {
            this.setState({payment_method_id: res.id});
          }
        });
      });
    });
  };
  setReactModalVisible = bool => {
    this.setState({isModalReactVisible: !this.state.isModalReactVisible});
  };
  setPaymentMethod = (id, label) => {
    console.log('masuk sini');
    this.setState({payment_method_label: label, payment_method_id: id});
    this.setReactModalVisible(!this.state.isModalReactVisible);
    this.setState({payment_method_choosen: true});
  };
  handleNominal = val => {
    console.log(Number(val));
    if (Number(val) > this.state.total) {
      let kembalian = Number(val) - this.state.total;
      this.setState({kembalian: kembalian});
      this.setState({nominal: val});
    } else if (val == '') {
      this.setState({kembalian: 0});
      this.setState({nominal: val});
    } else {
      this.setState({kembalian: 0});
      this.setState({nominal: val});
    }
  };
  confirmPayment = async () => {
    let dataSend;
    if (this.state.method == 'tunai') {
      dataSend = {
        type: 'TUNAI',
        id: 47,
        media: 'TUNAI',
        no_rek: '',
        nominal: this.state.nominal,
        kembalian: this.state.kembalian,
      };
    }
    if (this.state.method == 'non-tunai') {
      dataSend = {
        type: 'NON-TUNAI',
        id: this.state.payment_method_id,
        media: this.state.payment_method_label,
        no_rek: this.state.no_rek,
        nominal: this.state.total,
        kembalian: this.state.kembalian,
      };
    }
    let fun = this.props.navigation.state.params.fun;
    await fun(true, dataSend.type, dataSend);
  };
  // pickerChange(index) {
  //   this.state.payment_method.map((v, i) => {
  //     if (index === i) {
  //       this.setState({
  //         payment_method_label: this.state.payment_method[index].nama,
  //         payment_method_id: this.state.payment_method[index].id,
  //       });
  //     }
  //   });
  // }
  // getPicker = () => {
  //   return this.state.payment_method.map((res, index) => {
  //     console.log(res.nama);
  //     return (
  //       <>
  //         <Picker.Item
  //           label={'' + res.nama}
  //           value={'' + res.id}
  //           key={'' + index}
  //         />
  //       </>
  //     );
  //   });
  // };
  render() {
    let option;
    if (this.state.method == 'tunai') {
      option = (
        <>
          <Text style={{fontWeight: 'bold'}}>Nominal</Text>
          <View style={[styles.input, {flex: 1, flexDirection: 'row'}]}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Rp.</Text>
            </View>
            <View style={{flex: 10}}>
              <TextInput
                keyboardType={'numeric'}
                value={this.state.nominal}
                onChangeText={value => this.handleNominal(value)}
              />
            </View>
          </View>

          <Text style={{fontWeight: 'bold'}}>Kembalian</Text>
          <View style={[styles.input, {flex: 1, flexDirection: 'row'}]}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Rp.</Text>
            </View>
            <View style={{flex: 10}}>
              <TextInput
                keyboardType={'numeric'}
                value={this.state.kembalian.toString()}
              />
            </View>
          </View>
        </>
      );
    }
    let pickerItem = <Picker.Item label={'BCA'} value={'32'} />;
    let reactModal;
    let nomor;
    if (this.state.method == 'non-tunai') {
      if (this.state.payment_method.length != 0) {
        option = (
          <>
            <Text style={{fontWeight: 'bold'}}>Jenis</Text>
            <TouchableOpacity onPress={() => this.setReactModalVisible()}>
              <View style={[styles.input, {justifyContent: 'center'}]}>
                <Text>{this.state.payment_method_label}</Text>
              </View>
            </TouchableOpacity>
          </>
        );
      }
    }
    if (
      this.state.payment_method_choosen == true &&
      this.state.method == 'non-tunai'
    ) {
      nomor = (
        <>
          <Text style={{fontWeight: 'bold'}}>Nomor</Text>
          <View style={[styles.input, {flex: 1, flexDirection: 'row'}]}>
            <View style={{flex: 10}}>
              <TextInput
                keyboardType={'numeric'}
                value={this.state.no_rek}
                onChangeText={value => this.setState({no_rek: value})}
              />
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        <View
          style={{
            flex: 1,
          }}>
          <SheetTitle title="Payment" close={this.props.navigation.pop} />
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#2cbbd1',
                width: '90%',
                justifyContent: 'center',
                marginVertical: 15,
                padding: 12,
                borderRadius: 20,
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Rp. {this.state.total}
              </Text>
            </View>
          </View>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
              padding: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  alignItems: 'flex-start',

                  flex: 1,
                }}>
                <Text style={{fontWeight: 'bold'}}>Method</Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',

                  flex: 1,
                }}>
                <Text style={{fontWeight: 'bold'}}>Tunai / Non Tunai</Text>
              </View>
            </View>
            <Picker
              style={styles.input}
              selectedValue={this.state.method}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({method: itemValue})
              }>
              <Picker.Item label="Tunai" value="tunai" />
              <Picker.Item label="Non-tunai" value="non-tunai" />
            </Picker>
            {option}
            {nomor}
          </ScrollView>
          <TouchableOpacity onPress={() => this.confirmPayment()}>
            <View
              style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
              <BtnConfirm title={'save'} />
            </View>
          </TouchableOpacity>
          {/* <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isModalReactVisible}
            onRequestClose={() => this.setReactModalVisible()}> */}
          <View
            style={{
              // marginTop: 20,
              padding: 20,
              backgroundColor: 'white',
              borderTopColor: '#cccccc',
              borderTopWidth: 1,

              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              opacity: this.state.isModalReactVisible ? 1 : 0,
            }}>
            {this.state.payment_method.map((res, index) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => this.setPaymentMethod(res.id, res.nama)}
                    key={index}>
                    <View style={{paddingVertical: 4}}>
                      <Text style={{paddingVertical: 5}}>{res.nama}</Text>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })}
          </View>
          {/* </Modal> */}
        </View>
      </>
    );
  }
}
const PaymentBtn = props => {
  return (
    <View style={styles.paymentWrap}>
      <TouchableOpacity onPress={() => props.function(true)}>
        <BtnConfirm title={'Bayar'} />
      </TouchableOpacity>
    </View>
  );
};
const BtnConfirm = props => {
  return (
    <>
      <View
        style={{
          paddingVertical: 7,
          width: 120,
          backgroundColor: '#fB5516',
          borderRadius: 7,
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
          {props.title}
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,

    paddingHorizontal: 10,
  },
  paymentWrap: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43Af4A',
    padding: 10,
  },
});
