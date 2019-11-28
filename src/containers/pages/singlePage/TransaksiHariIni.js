import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import DataTopProfile from '../../../component/DataTopProfile';
import {ScrollView} from 'react-native-gesture-handler';
import {GetTransaksiHariIni} from '../../../config/service/Transaction';
import {GetItem} from '../../../config/service/Storage';

export default class TransaksiHariIni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount = async () => {
    await GetItem('cabang_id').then(async res => {
      await GetTransaksiHariIni(res).then(res => {
        if (res.data.error) {
          console.log(res.data);
        } else {
          this.setState({data: res.data.data});
        }
      });
    });
  };
  render() {
    let data;
    let bill;
    let head1;
    let head2;
    let head3;
    if (this.state.data.length != 0) {
      data = this.state.data;
      let tunai = 0;
      let non_tunai = 0;
      // console.log(data[0].data_payment);
      bill = data.map((item, index) => {
        tunai += Number(item.tunai);
        non_tunai += Number(item.non_tunai);
        return <TransaksiCard data={item} key={index + 's'} />;
      });
      head1 = (
        <HeaderItem title={'Total Transaksi'} amount={'' + data.length} />
      );
      head2 = <HeaderItem title={'Tunai'} amount={tunai} />;
      head3 = <HeaderItem title={'Non Tunai'} amount={non_tunai} />;
    } else {
      bill = <Text>Belum ada transaksi hari ini</Text>;
    }
    return (
      <>
        <DetailTop title="Transaksi Hari Ini" />
        <View style={styles.header}>
          {head1}
          {head2}
          {head3}
        </View>
        <ScrollView style={{paddingHorizontal: 25, paddingVertical: 10}}>
          <Text style={{color: '#fB5516', fontSize: 20, fontWeight: 'bold'}}>
            Detail
          </Text>
          {bill}
        </ScrollView>
      </>
    );
  }
}
const TransaksiCard = props => {
  return (
    <>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{flex: 3}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text>{props.data.tr_id}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>{props.data.data_customer.customer.nama_lengkap}</Text>
            </View>
          </View>

          {props.data.data_order.taking_order.map((order, index) => {
            return (
              <TransaksiDetail
                product_name={order.data_barang.nama}
                amount={order.qyt}
                price={order.data_barang.harga}
                key={index + 'r'}
              />
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          {props.data.data_payment.metode_pembayaran.map((item, index) => {
            return (
              <>
                <Text style={styles.detailRight}>{item.nama}</Text>
                <Text style={styles.detailRight}>Rp. {item.nominal}</Text>
              </>
            );
          })}
        </View>
      </View>
    </>
  );
};
const TransaksiDetail = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 4}}>
          <Text>{props.product_name}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center'}}>{props.amount}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text>{props.price}</Text>
        </View>
      </View>
    </>
  );
};
const HeaderItem = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text>{props.title}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>{props.amount}</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderBottomColor: '#cccccc',
    borderTopColor: '#cccccc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStyle: 'dotted',
  },
  detailRight: {
    width: '90%',
    backgroundColor: 'green',
    padding: 5,
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
    marginVertical: 3,
    fontSize: 10,
  },
});
