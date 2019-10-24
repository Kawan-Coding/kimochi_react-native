import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {ScrollView} from 'react-native-gesture-handler';

import Search from '../../../assets/img/search.png';
import OrderCard from '../../../component/OrderCard';
import KimochiModal from '../../../component/KimochiModal';

import {GetAllBarang} from '../../../config/service/Barang';
export default class Order extends Component {
  constructor(props) {
    super(props);
    state = {
      data: '',
    };
    this.getBarang();
  }
  getBarang = async () => {
    await GetAllBarang().then(result => {
      if (result.data.error) {
        console.log(result.data.message);
      }
      {
        this.state.data = result.data;
      }
    });
  };
  displayOrderCard = () => {
    let data = this.state.data.data;
    // let items = data.map((item,key)=>{
    // <OrderCard key={item.id} transaction_status ={} process_status={} create_at={} tr_id={} data_customer={} customer_id={} telephone={} onPress={this.modalTrigger()}/>
    // })
    // return items;
  };
  modalTrigger = async () => {};
  render() {
    return (
      <>
        <HeaderApp />

        <View style={[styles.menutTop, styles.container]}>
          <View style={styles.btnMenu}>
            <Text style={styles.btnText}>BOOKING</Text>
          </View>
          <View style={[styles.btnMenu, {backgroundColor: '#fB5516'}]}>
            <Text style={[styles.btnText, {color: 'white'}]}>ORDER</Text>
          </View>
        </View>
        <View style={styles.searchMenu}>
          <View style={styles.searchLeft}>
            <Text style={{fontWeight: 'bold'}}>Order List</Text>
          </View>
          <View style={styles.searchRight}>
            <Image source={Search} style={{width: 20, height: 20}} />
          </View>
        </View>
        <ScrollView style={{paddingHorizontal: 20}}>
          {this.displayOrderCard()}
        </ScrollView>

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 30,
    borderColor: '#fB5516',
    borderWidth: 1,
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
