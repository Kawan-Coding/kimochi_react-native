import React, {Component} from 'react';
import DetailTop from '../../../component/DetailTop';
import StatusOrderCard from '../../../component/StatusOrderCard';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import shoppingCart from '../../../assets/img/shoppingCart.png';
import {ListBottom, ListTop} from '../../../component/Bill';
import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import {SetTakingOrder} from '../../../config/service/Transaction';
import {GetItem} from '../../../config/service/Storage';
import {GetBarangTrId} from '../../../config/service/Barang';
import {GetCustomer} from '../../../config/service/Customer';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSend: this.props.navigation.state.params.dataSend,
      dataView: this.props.navigation.state.params.dataView,
      dataFoto: this.props.navigation.state.params.dataFoto,
      total: 0,
      customer_id: this.props.navigation.state.params.customer_id,
      isPaymentDone: false,
      tr_id: this.props.navigation.state.params.tr_id,
      dataCustomer: null,
    };
  }

  getCount = () => {
    let count = 0;

    if (this.state.dataSend.length != 0) {
      this.state.dataSend.map(res => {
        count += res.qyt;

        // console.log(res.qyt);
      });
    }

    return count;
  };
  addTransaction = () => {
    this.props.navigation.navigate('CustomerOrder', {
      tr_id: this.state.tr_id,
      customer_id: this.state.customer_id,
    });
  };
  componentDidMount = async () => {
    if (this.state.tr_id != null) {
      console.log('tr id ga null');
      this.trIdExist(this.state.tr_id);
    } else {
      console.log('tr id null');
      await GetCustomer(this.state.customer_id).then(res => {
        if (res.data.error) {
          console.log(res.data.msg);
        }
        this.setState({dataCustomer: res.data.data});
      });
      this.sumTotal();
    }
    // console.log(this.state.dataSend);
    // console.log(this.state.dataView);
  };
  trIdExist = async tr_id => {
    console.log('masuk sini');
    await GetBarangTrId(tr_id).then(res => {
      if (res.data.error) {
        console.log(res.data.msg);
      } else {
        let price = 0;
        res.data.data.data.map(res => {
          price += Number(res.data_barang.harga * res.qyt);
        });
        this.setState({
          dataView: res.data.data,
          total: price,
          isPaymentDone: true,
        });
      }
    });
  };
  sumTotal = () => {
    let total = this.state.total;
    this.state.dataView.cuci_helm.map(res => {
      total += res.harga * res.qyt;
    });
    this.state.dataView.aksesoris.map(res => {
      total += res.harga * res.qyt;
    });

    this.setState({total: total});
  };
  confirmPayment = async val => {
    if (val == 'SAVE') {
      let cabang_id;
      let customer_id = this.state.customer_id;
      let dataSend = this.state.dataSend;
      let dataFoto = this.state.dataFoto;
      dataSend = JSON.stringify(dataSend);
      // dataFoto = JSON.stringify(dataFoto);
      // console.log(dataSend);
      // console.log(dataFoto);
      await GetItem('cabang_id').then(res => {
        cabang_id = res;
      });
      await SetTakingOrder(
        cabang_id,
        customer_id,
        'order',
        dataSend,
        dataFoto,
      ).then(res => {
        this.props.navigation.navigate('Cashier');
        // let tr_id = res.data.data.tr_id;
        // this.setState({isPaymentDone: true, tr_id: tr_id});
        // this.trIdExist(tr_id);
      });
    }
    if (val == 'BAYAR') {
      this.props.navigation.navigate('CashierPayment', {
        tr_id: this.state.tr_id,
      });
    }
  };
  render() {
    let count;
    if (this.state.dataSend.length != 0) {
      let qyt = this.getCount();
      if (qyt != 0) {
        count = (
          <>
            <View
              style={{
                position: 'absolute',
                right: -5,
                top: -10,
                backgroundColor: 'red',
                width: 22,
                height: 22,
                borderRadius: 50,

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 10}}>{qyt}</Text>
            </View>
          </>
        );
      }
    }
    let menuTop;
    let btnConfirm;
    if (this.state.isPaymentDone) {
      btnConfirm = (
        <TouchableOpacity onPress={() => this.confirmPayment('BAYAR')}>
          <BtnConfirm title="BAYAR" />
        </TouchableOpacity>
      );
      menuTop = (
        <>
          <View
            style={{
              flexDirection: 'row',

              paddingVertical: 10,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => this.addTransaction()}>
                <View
                  style={{
                    backgroundColor: '#43Af4A',
                    paddingVertical: 3,
                    paddingHorizontal: 7,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white'}}>Tambah Transaksi</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    } else {
      btnConfirm = (
        <TouchableOpacity onPress={() => this.confirmPayment('SAVE')}>
          <BtnConfirm title="SAVE" />
        </TouchableOpacity>
      );
      menuTop = (
        <View
          style={{
            flexDirection: 'row',

            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <View
                style={[
                  styles.orderTab,
                  {marginRight: 5},
                  {backgroundColor: '#43Af4A'},
                ]}>
                <Text style={[{fontSize: 12}, {color: 'white'}]}>Back</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <View style={[styles.orderTab, {backgroundColor: 'white'}]}>
                <Text style={[{fontSize: 12}, {color: '#43Af4A'}]}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <View style={styles.cardIcon}>
              {count}
              <Image source={shoppingCart} style={styles.cartIcon} />
            </View>
          </View>
        </View>
      );
    }

    let dataCuciHelm;
    let dataAksesoris;

    if (this.state.tr_id == null) {
      dataCuciHelm = this.state.dataView.cuci_helm.map((res, index) => {
        if (res.qyt != 0) {
          return (
            <>
              <Text style={{fontWeight: 'bold'}}>Cuci Helm</Text>
              <ListBottom
                title={res.nama}
                amount={res.qyt}
                price={res.harga * res.qyt}
                key={index + 's'}
              />
            </>
          );
        }
      });
      dataAksesoris = this.state.dataView.aksesoris.map((res, index) => {
        if (res.qyt != 0) {
          return (
            <>
              <Text style={{fontWeight: 'bold'}}>Aksesoris</Text>
              <ListBottom
                title={res.nama}
                amount={res.qyt}
                price={res.harga * res.qyt}
                key={index + 't'}
              />
            </>
          );
        }
      });
    } else {
      if (this.state.dataView.length != 0 && this.state.tr_id !== null) {
        dataCuciHelm = this.state.dataView.data.map((res, index) => {
          let price = res.data_barang.harga * res.qyt;

          return (
            <>
              <ListBottom
                title={res.data_barang.nama}
                amount={res.data_barang.qyt}
                price={price}
                key={index + 'a'}
              />
            </>
          );
        });
      }
    }

    //   this.state.dataView.map(res=>{

    //   })
    let dataCustomer;

    if (this.state.tr_id == null) {
      if (this.state.dataCustomer != null) {
        let date = IndonesiaDate(new Date());
        let dataCust = this.state.dataCustomer;
        console.log(dataCustomer);
        dataCustomer = (
          <View
            style={[
              styles.cardWrap,
              {borderStyle: 'dotted', paddingBottom: 15},
            ]}>
            <ListTop
              title={'' + date.tanggal + ' ' + date.bulan + ' ' + date.tahun}
              content={this.state.tr_id}
            />
            <ListTop
              title={dataCust.nama_lengkap}
              content={dataCust.no_telepon}
            />
            <ListTop title={dataCust.email} content={dataCust.member} />

            <ListTop title={'Kimochi Wallet -- ' + dataCust.kimochi_wallet} />
          </View>
        );
      }
    } else {
      if (this.state.dataView.length != 0) {
        let date = IndonesiaDate(new Date(this.state.dataView.dll.create_at));
        let data = this.state.dataView.customer;

        dataCustomer = (
          <View
            style={[
              styles.cardWrap,
              {borderStyle: 'dotted', paddingBottom: 15},
            ]}>
            <ListTop
              title={'' + date.tanggal + ' ' + date.bulan + ' ' + date.tahun}
              content={this.state.tr_id}
            />
            <ListTop title={data.nama_lengkap} content={data.no_telepon} />
            <ListTop title={data.email} content={data.member} />

            <ListTop title={'Kimochi Wallet --' + data.kimochi_wallet} />
          </View>
        );
      }
    }
    return (
      <>
        <DetailTop title="ORDER" />
        <StatusOrderCard id={this.state.customer_id} />
        <View style={styles.container}>
          <View>
            <Text style={{fontWeight: 'bold'}}>KIMOCHI SERVICE</Text>
          </View>

          {menuTop}

          <ScrollView>
            {dataCustomer}
            {dataCuciHelm}
            {dataAksesoris}
            <ListBottom
              bold={true}
              title={'Sub Total'}
              price={this.state.total}
            />
          </ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              borderTopColor: '#cccccc',
              borderTopWidth: 1,
            }}>
            {btnConfirm}
          </View>
        </View>
      </>
    );
  }
}

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
  container: {
    padding: 10,
    flex: 1,
  },
  cardIcon: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  cartIcon: {
    width: 22,
    height: 19,
  },
  orderTab: {
    width: 100,
    borderColor: '#43Af4A',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    padding: 3,
  },
});
