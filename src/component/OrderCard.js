import React, {Component} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

import {IndonesiaDate} from '../config/utilities/IndonesiaDate';
import {TouchableOpacity} from 'react-native-gesture-handler';
const OrderCard = props => {
  let date = IndonesiaDate(new Date());
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
        onPress={() => props.navigation.navigate('StatusOrder')}>
        <View style={styles.cardContent}>
          <View style={{flex: 4, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <DetailOrderCard title={'TR ID'} content={'TO_123456'} />
              <DetailOrderCard title={'Customer'} content={'Atta Halilintar'} />
              <DetailOrderCard title={'Customer ID'} content={'CST_12735735'} />
              <DetailOrderCard title={'Telephone'} content={'081212831238'} />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.status, {backgroundColor: 'red'}]}>
              Unpaid
            </Text>
            <Text style={[styles.status, {backgroundColor: 'blue'}]}>
              Proccess
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
