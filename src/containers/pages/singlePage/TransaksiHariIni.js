import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import DataTopProfile from '../../../component/DataTopProfile';
import {ScrollView} from 'react-native-gesture-handler';

export default class TransaksiHariIni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tr_id: 'TR_12345',
        name: 'Kawan Koding',
        order: [
          {
            id: 1,
            product_name: 'Cuci Standar Helm Full Face',
            amount: '2',
            price: 'Rp. 15.000',
          },
          {
            id: 2,
            product_name: 'Cuci Standar Helm Full Face',
            amount: '2',
            price: 'Rp. 15.000',
          },
          {
            id: 3,
            product_name: 'Cuci Standar Helm Full Face',
            amount: '1',
            price: 'Rp. 12.000',
          },
        ],
        sub_total: 'RP. 55.000',
        voucher_discount: 'RP.5000',
        total_payment: 'RP. 50000',
        type: 'OVO',
      },
    };
  }
  render() {
    return (
      <>
        <DetailTop title="Transaksi Hari Ini" />
        <View style={styles.header}>
          <HeaderItem title={'Total Transaksi'} amount={'26'} />
          <HeaderItem title={'Tunai'} amount={'16'} />
          <HeaderItem title={'Non Tunai'} amount={'10'} />
        </View>
        <ScrollView style={{paddingHorizontal: 25, paddingVertical: 10}}>
          <Text style={{color: '#fB5516', fontSize: 20, fontWeight: 'bold'}}>
            Detail
          </Text>
          <TransaksiCard data={this.state.data} />
        </ScrollView>
      </>
    );
  }
}
const TransaksiCard = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text>{props.data.tr_id}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>{props.data.name}</Text>
            </View>
          </View>

          {props.data.order.map(order => {
            return (
              <TransaksiDetail
                product_name={order.product_name}
                amount={order.amount}
                price={order.price}
                key={order.id}
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
          <Text style={styles.detailRight}>Ovo</Text>
          <Text style={styles.detailRight}>Rp. 50.000</Text>
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
