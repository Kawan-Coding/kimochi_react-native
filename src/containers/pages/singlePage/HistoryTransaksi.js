import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import DataTopProfile from '../../../component/DataTopProfile';

import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import {ScrollView} from 'react-native-gesture-handler';
export default class HIstoryTransaksi extends Component {
  render() {
    return (
      <>
        <DetailTop title="History Transaksi" />
        <DataTopProfile />
        <ScrollView style={{paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>TOTAL OMSET</Text>
              <BtnOmset data={'Rp. 750.000'} color={'blue'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>TUNAI</Text>
              <BtnOmset data={'Rp. 750.000'} color={'purple'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>NON TUNAI</Text>
              <BtnOmset data={'Rp. 750.000'} color={'purple'} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>GLOBAL</Text>
              <BtnOmset data={'Rp. 750.000'} color={'orange'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>CASH</Text>
              <BtnOmset data={'Rp. 750.000'} color={'orange'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>EDC</Text>
              <BtnOmset data={'Rp. 750.000'} color={'orange'} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>OVO</Text>
              <BtnOmset data={'Rp. 750.000'} color={'orange'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>GO PAY</Text>
              <BtnOmset data={'Rp. 750.000'} color={'orange'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>KIMOCHI</Text>
              <BtnOmset data={'Rp. 750.000'} color={'orange'} />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
const BtnOmset = props => {
  let backgroundColor = '';
  let color = '';
  let borderColor = '';
  if (props.color == 'blue') {
    backgroundColor = {
      backgroundColor: 'blue',
    };
    color = {
      color: 'white',
    };
    borderColor = {
      borderColor: '#cccccc',
    };
  }
  if (props.color == 'purple') {
    backgroundColor = {
      backgroundColor: 'purple',
    };
    color = {
      color: 'white',
    };
    borderColor = {
      borderColor: '#cccccc',
    };
  }
  if (props.color == 'orange') {
    backgroundColor = {
      backgroundColor: 'white',
    };
    color = {
      color: '#fB5516',
    };
    borderColor = {
      borderColor: '#fB5516',
    };
  }
  console.log(color);
  return (
    <>
      <View style={[styles.omsetBox, backgroundColor, borderColor]}>
        <Text style={color}>{props.data}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  omsetBox: {
    width: '90%',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingVertical: 8,
    marginTop: 5,
  },
});
