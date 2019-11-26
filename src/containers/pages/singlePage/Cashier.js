import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {ScrollView} from 'react-native-gesture-handler';
import Search from '../../../assets/img/search.png';
import OrderCard from '../../../component/OrderCard';

import {GetAllOrder, GetAllBooking} from '../../../config/service/Barang';
import {GetItem} from '../../../config/service/Storage';

export default class Cashier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getOrder = async () => {
    await GetItem('cabang_id').then(async result => {
      await GetAllOrder(result).then(result => {
        if (result.data.error) {
          console.log(result.data.message);
        } else {
          console.log(result);
          this.setState({data: result.data.data});
        }
      });
    });
  };
  componentDidMount = async () => {
    await this.getOrder();
  };
  render() {
    let orderCard;
    if (this.state.data.length != 0) {
      orderCard = this.state.data.map(res => {
        if (res.status == 'unpaid') {
          return (
            <OrderCard
              transaction_status={res.status}
              process_status={res.status_produksi}
              create_at={res.jam_order}
              tr_id={res.tr_id}
              data_customer={res.data_customer}
              dataSend={[]}
              dataView={[]}
              customer_id={res.customer_id}
              telephone={res.data_customer.no_telepon}
              link={this.props.navigation.navigate}
              page={'ShoppingCart'}
              key={res.taking_order_id}
            />
          );
        }
      });
    }
    return (
      <>
        <HeaderApp />
        <View style={styles.searchMenu}>
          <View style={styles.searchLeft}>
            <Text style={{fontWeight: 'bold'}}>PENDING TRANSACTION</Text>
          </View>
          <View style={styles.searchRight}>
            <Image source={Search} style={{width: 20, height: 20}} />
          </View>
        </View>
        <ScrollView style={{paddingHorizontal: 20}}>{orderCard}</ScrollView>

        <BottomTab />
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchMenu: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 7,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  searchLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
