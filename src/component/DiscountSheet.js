import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SheetTitle from './SheetTitle';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
export default DiscountSheet = props => {
  return (
    <>
      <View
        style={{
          flex: 1,
          height: 500,
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        <SheetTitle title={'Voucher Discount'} close={props.close} />
        <ScrollView style={{flex: 1, backgroundColor: 'white', padding: 20}}>
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
        </ScrollView>
      </View>
    </>
  );
};

const DiscountCard = props => {
  return (
    <View style={styles.discountCard}>
      <View style={{flex: 2}}>
        <Text style={{fontWeight: 'bold', color: 'purple', fontSize: 16}}>
          {props.title}
        </Text>
        <Text style={{fontSize: 12}}>{props.content}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#fB5516', fontWeight: 'bold', fontSize: 22}}>
          {props.amount}
        </Text>
        <View
          style={{
            paddingVertical: 7,
            width: 100,
            backgroundColor: '#43Af4A',
            borderRadius: 25,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => props.function(true, 5000, 'voucher bulan agustus')}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              Pilih
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discountCard: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
});
