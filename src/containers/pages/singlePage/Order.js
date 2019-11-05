import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Search from '../../../assets/img/search.png';
import OrderCard from '../../../component/OrderCard';
import KimochiModal from '../../../component/KimochiModal';

import {GetAllOrder, GetAllBooking} from '../../../config/service/Barang';
import {GetItem} from '../../../config/service/Storage';
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOrder: [],
      dataBooking: [],
      tabOrder: true,
    };
  }
  getOrder = async () => {
    await GetItem('cabang_id').then(async result => {
      await GetAllOrder(result).then(result => {
        if (result.data.error) {
          console.log(result.data.message);
        } else {
          this.setState({dataOrder: result.data.data});
        }
      });
    });
  };
  getBooking = async () => {
    await GetItem('cabang_id').then(async result => {
      await GetAllBooking(result).then(result => {
        console.log(result);
        if (result.data.error) {
          console.log(result.data.message);
        } else {
          this.setState({dataBooking: result.data.data});
        }
      });
    });
  };
  changeTabOrder = bool => {
    this.setState({tabOrder: bool});
  };
  componentDidMount = async () => {
    await this.getOrder();
    await this.getBooking();
  };
  // displayOrderCard = () => {
  //   let data = this.state.data.data;
  //   let items = data.map((item,key)=>{
  //   <OrderCard key={item.id} transaction_status ={} process_status={} create_at={} tr_id={} data_customer={} customer_id={} telephone={} onPress={this.modalTrigger()}/>
  //   })
  //   return items;
  // };
  modalTrigger = async () => {};

  render() {
    var orderCard;

    if (
      this.state.dataOrder.length != 0 ||
      this.state.dataBooking.length != 0
    ) {
      if (this.state.tabOrder) {
        orderCard = this.state.dataOrder.map(item => {
          console.log(item);
          return (
            <OrderCard
              transaction_status={'unpaid'}
              create_at={new Date()}
              tr_id={'TO_123456'}
              data_customer={'KAwan Koding'}
              customer_id={'CST_123456'}
              telephone={'0909898'}
              link={'StatusOrder'}
              key={item.taking_order_id}
              // onPress={this.modalTrigger()}
            />
          );
        });
      } else {
        // orderCard = this.state.dataBooking.map(item => {
        orderCard = (
          // return (
          <OrderCard
            transaction_status={'unpaid'}
            create_at={new Date()}
            tr_id={'TO_123456'}
            data_customer={'KAwan Koding'}
            customer_id={'CST_123456'}
            telephone={'0909898'}
            link={'ScanBooking'}
            // onPress={this.modalTrigger()}
          />
        );
        // );
        // });
      }
    }

    return (
      <>
        <HeaderApp />

        <View style={[styles.menutTop, styles.container]}>
          <TouchableOpacity onPress={() => this.changeTabOrder(false)}>
            <View
              style={[
                styles.btnMenu,
                this.state.tabOrder
                  ? {backgroundColor: 'white'}
                  : {backgroundColor: '#fB5516'},
              ]}>
              <Text
                style={[
                  styles.btnText,
                  this.state.tabOrder ? {color: 'black'} : {color: 'white'},
                ]}>
                BOOKING
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.changeTabOrder(true)}>
            <View
              style={[
                styles.btnMenu,
                this.state.tabOrder
                  ? {backgroundColor: '#fB5516'}
                  : {backgroundColor: 'white'},
              ]}>
              <Text
                style={[
                  styles.btnText,
                  this.state.tabOrder ? {color: 'white'} : {color: 'black'},
                ]}>
                ORDER
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchMenu}>
          <View style={styles.searchLeft}>
            <Text style={{fontWeight: 'bold'}}>Order List</Text>
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
    padding: 20,
  },
  menutTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 30,
    borderColor: '#fB5516',
    borderWidth: 1,

    width: 175,
  },
  btnText: {
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  searchMenu: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 7,
    marginHorizontal: 20,
    marginBottom: 20,
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
