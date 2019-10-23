import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import DetailTop from '../../../component/DetailTop';
import avatar from '../../../assets/img/man.png';

import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';

let date = IndonesiaDate(new Date());
export default class StatusOrder extends Component {
  render() {
    return (
      <>
        <DetailTop title={'Status Order - Proses'} />
        <StatusOrderCard
          name={'Kawan Koding'}
          number={'09812312'}
          history={'3'}
          member={'Member Grab'}
        />
        <ScrollView>
          <View style={{paddingHorizontal: 20, marginVertical: 20, flex: 1}}>
            <OrderList />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            <BtnConfirm title={'Selesai'} />
          </View>
        </ScrollView>
      </>
    );
  }
}

const StatusOrderCard = props => {
  return (
    <>
      <View style={styles.cardWrap}>
        <View style={styles.statusCard}>
          <View style={styles.headerItemsRound}>
            <Image source={avatar} style={styles.avatar} />
          </View>
          <View style={styles.cardContent}>
            <Text style={{color: 'white', fontSize: 18}}>{props.name}</Text>
            <Text style={{color: 'white'}}>{props.number}</Text>
            <View style={styles.contentInner}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>History Transaksi</Text>
                <Text style={styles.textContent}>{props.history}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>Status Member</Text>
                <Text style={styles.textContent}>{props.member}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const OrderList = props => {
  return (
    <>
      <View style={styles.listTop}>
        <Text style={{flex: 2, fontWeight: 'bold'}}>ORDER LIST</Text>
        <Text style={[styles.status, {flex: 1, backgroundColor: 'red'}]}>
          Unpaid
        </Text>
      </View>
      <View
        style={[styles.cardWrap, {borderStyle: 'dotted', paddingBottom: 15}]}>
        <ListTop
          title={'' + date.tanggal + ' ' + date.bulan + ' ' + date.tahun}
          content={'TO_123456789'}
        />
        <ListTop title={'Luna Maya'} content={'081239123'} />
        <ListTop title={'luna@gmail.com'} content={'GRAB'} />
        <ListTop title={'luna@gmail.com'} content={'GRAB'} />
        <ListTop title={'Kimochi Wallet -- Rp.3000'} />
      </View>
      <View style={[styles.cardWrap, {paddingVertical: 15}]}>
        <ListBottom
          title={'Cuci Standar Helm Half Face A'}
          amount={'1'}
          price={'15.000'}
        />
        <ListBottom
          title={'Cuci Standar Helm Half Face A'}
          amount={'1'}
          price={'15.000'}
        />
        <ListBottom
          title={'Cuci Standar Helm Half Face A'}
          amount={'2'}
          price={'15.000'}
        />
        <ListBottom
          title={'Cuci Standar Helm Half Face A'}
          amount={'1'}
          price={'15.000'}
        />
        <ListBottom title={'Sub total'} price={'15.000'} bold={true} />
      </View>
    </>
  );
};

const ListTop = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <Text>{props.title}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>{props.content}</Text>
        </View>
      </View>
    </>
  );
};

const ListBottom = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <Text style={props.bold ? {fontWeight: 'bold'} : {fontWeight: '100'}}>
            {props.title}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text>{props.amount}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>RP. {props.price}</Text>
        </View>
      </View>
    </>
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
  cardWrap: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  statusCard: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#43Af4A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  listTop: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  status: {
    paddingHorizontal: 2,
    paddingVertical: 4,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 12,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  headerItemsRound: {
    borderRadius: 40,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  avatar: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  contentInner: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  textContent: {
    color: '#fB5516',
    fontWeight: 'bold',
  },
});
