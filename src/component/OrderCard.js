import React, {Component} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

import {IndonesiaDate} from '../config/utilities/IndonesiaDate';
import {TouchableOpacity} from 'react-native-gesture-handler';
const OrderCard = props => {
  let date = new Date(props.create_at);

  date = IndonesiaDate(new Date(date));
  // console.log(date);
  let transaction_status = '';
  let process_status = '';
  if (props.transaction_status == 'unpaid') {
    transaction_status = 'red';
  }
  if (props.transaction_status == 'paid') {
    transaction_status = '#43Af4A';
  }
  if (props.process_status == 'finish') {
    process_status = 'purple';
  }
  if (props.process_status == 'process') {
    process_status = 'blue';
  }
  return (
    <>
      <View style={styles.cardTop}>
        <View
          style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text style={{color: '#fB5516'}}>Jam Order</Text>
        </View>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Text style={{color: '#fB5516'}}>
            {date.jam + ':' + date.menit + ':' + date.detik + ' WIB'}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          props.link(props.page, {
            tr_id: props.tr_id,
            customer_id: props.customer_id,
            transaction_status: props.transaction_status,
            dataSend: props.dataSend,
            dataView: props.dataView,
          })
        }>
        <View style={styles.cardContent}>
          <View style={{flex: 4, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <DetailOrderCard title={'TR_ID'} content={props.tr_id} />
              <DetailOrderCard
                title={'Customer'}
                content={props.data_customer.nama_lengkap}
              />
              <DetailOrderCard
                title={'Customer ID'}
                content={props.customer_id}
              />
              <DetailOrderCard title={'Telephone'} content={props.telephone} />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={[styles.status, {backgroundColor: transaction_status}]}>
              {props.transaction_status}
            </Text>
            <Text style={[styles.status, {backgroundColor: process_status}]}>
              {props.process_status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const DetailOrderCard = props => {
  return (
    <>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text>{props.title}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>:{props.content}</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  cardTop: {
    flexDirection: 'row',
  },
  cardContent: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
  },
  status: {
    padding: 2,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 12,
    marginBottom: 5,
  },
});
export default withNavigation(OrderCard);
