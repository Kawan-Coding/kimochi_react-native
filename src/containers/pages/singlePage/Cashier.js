import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {ScrollView} from 'react-native-gesture-handler';
import Search from '../../../assets/img/search.png';
import OrderCard from '../../../component/OrderCard';

export default class Cashier extends Component {
  render() {
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
        <ScrollView style={{paddingHorizontal: 20}}>
          <OrderCard
            transaction_status={'paid'}
            process_status={'finish'}
            create_at={new Date()}
            tr_id={'TO_123456'}
            data_customer={'KAwan Koding'}
            customer_id={'CST_123456'}
            telephone={'0909898'}
            link={'CashierPayment'}
          />
        </ScrollView>

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
