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

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSend: this.props.navigation.state.params.dataSend,
      dataView: this.props.navigation.state.params.dataView,
      total: 0,
      customer_id: this.props.navigation.state.params.customer_id,
      isPaymentDone: false,
      tr_id: '',
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
  componentDidMount = () => {
    // console.log(this.state.dataSend);
    // console.log(this.state.dataView);
    this.sumTotal();
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
  confirmPayment = async () => {
    let cabang_id;
    let customer_id = this.state.customer_id;
    let dataSend = this.state.dataSend;
    dataSend = JSON.stringify(dataSend);
    console.log(dataSend);
    await GetItem('cabang_id').then(res => {
      cabang_id = res;
    });
    await SetTakingOrder(cabang_id, customer_id, 'order', dataSend).then(
      res => {
        console.log(res);
        this.setState({isPaymentDone: true});
      },
    );
  };
  render() {
    let date = IndonesiaDate(new Date());
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
    if (this.state.isPaymentDone) {
      menuTop = <></>;
    } else {
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
            <TouchableOpacity onPress={() => this.changeTabStatus(false)}>
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

    dataCuciHelm = this.state.dataView.cuci_helm.map(res => {
      if (res.qyt != 0) {
        return (
          <>
            <Text style={{fontWeight: 'bold'}}>Cuci Helm</Text>
            <ListBottom title={res.nama} amount={res.qyt} price={res.harga} />
          </>
        );
      }
    });
    dataAksesoris = this.state.dataView.aksesoris.map(res => {
      if (res.qyt != 0) {
        return (
          <>
            <Text style={{fontWeight: 'bold'}}>Aksesoris</Text>
            <ListBottom
              title={res.nama}
              amount={res.qyt}
              price={res.harga * res.qyt}
            />
          </>
        );
      }
    });
    //   this.state.dataView.map(res=>{

    //   })

    return (
      <>
        <DetailTop title="ORDER" />
        <StatusOrderCard id="8" />
        <View style={styles.container}>
          <View>
            <Text style={{fontWeight: 'bold'}}>KIMOCHI SERVICE</Text>
          </View>

          {menuTop}

          <ScrollView>
            <View
              style={[
                styles.cardWrap,
                {borderStyle: 'dotted', paddingBottom: 15},
              ]}>
              <ListTop
                title={'' + date.tanggal + ' ' + date.bulan + ' ' + date.tahun}
                content={this.state.tr_id}
              />
              <ListTop title={'Luna Maya'} content={'081239123'} />
              <ListTop title={'luna@gmail.com'} content={'GRAB'} />

              <ListTop title={'Kimochi Wallet -- Rp.3000'} />
            </View>
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
            <TouchableOpacity onPress={() => this.confirmPayment()}>
              <BtnConfirm title="SAVE" />
            </TouchableOpacity>
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
