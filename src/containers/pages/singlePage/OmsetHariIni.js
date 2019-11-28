import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import DataTopProfile from '../../../component/DataTopProfile';
import {GetOmsetHariIni} from '../../../config/service/Transaction';
import {GetItem} from '../../../config/service/Storage';
import AsyncStorage from '@react-native-community/async-storage';
import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import {ScrollView} from 'react-native-gesture-handler';
export default class OmsetHariIni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount = async () => {
    let responsible_id;
    await GetItem('id_responsible').then(res => {
      responsible_id = res;
    });
    await GetOmsetHariIni(responsible_id).then(res => {
      this.setState({data: res.data.data});
    });
  };
  loopPembayaran = data => {
    if (data.pembayaran == null) {
      return <></>;
    } else {
      data.pembayaran.map(data => {
        console.log(data);
        return (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>data.nama</Text>
            <BtnOmset data={data.total} color={'orange'} />
          </View>
        );
      });
    }
  };
  render() {
    let data = this.state.data;
    let pembayaran;
    if (data.pembayaran == null) {
      pembayaran = <></>;
    } else {
      pembayaran = data.pembayaran.map(data => {
        return (
          <View
            style={{flex: 1, alignItems: 'center'}}
            key={data.metode_pembayaran_id}>
            <Text
              style={{fontWeight: 'bold'}}
              key={data.metode_pembayaran_id + 'A'}>
              {data.nama}
            </Text>
            <BtnOmset
              data={data.total}
              color={'orange'}
              key={data.metode_pembayaran_id + 'B'}
            />
          </View>
        );
      });
    }
    return (
      <>
        <DetailTop title="Omset Hari ini" />
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
              <BtnOmset data={'Rp. ' + data.omset} color={'blue'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>TUNAI</Text>
              <BtnOmset data={'Rp. ' + data.tunai} color={'purple'} />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>NON TUNAI</Text>
              <BtnOmset data={'Rp. ' + data.non_tunai} color={'purple'} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {pembayaran}
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
