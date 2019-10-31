import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import DataTopProfile from '../../../component/DataTopProfile';
import {ScrollView} from 'react-native-gesture-handler';
import {GetSetoranHariIni} from '../../../config/service/Transaction';
import {GetItem} from '../../../config/service/Storage';
import AsyncStorage from '@react-native-community/async-storage';

export default class SetoranHariIni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        omset: '0',
        tunai: '0',
        non_tunai: '0',
        cash_register: '0',
        setoran_hari_ini: '0',
      },
    };
  }

  async componentDidMount() {
    let responsible_id;

    await AsyncStorage.getItem('id_responsible').then(res => {
      responsible_id = res;
    });

    let data;
    await GetSetoranHariIni(responsible_id).then(res => {
      console.log(data);
      data = res.data.data;
    });

    this.setState({data: data});
  }
  render() {
    let data = this.state.data;

    return (
      <>
        <DetailTop title="Setoran Hari Ini" />
        <DataTopProfile />
        <ScrollView style={{paddingHorizontal: 40}}>
          <SetoranBox title="OMSET" amount={'Rp. ' + data.omset} />
          <SetoranBox title="TUNAI" amount={'Rp. ' + data.tunai} />
          <SetoranBox title="NON TUNAI" amount={'Rp. ' + data.non_tunai} />
          <SetoranBox
            title="CASH REGISTER"
            amount={'Rp. ' + data.cash_register}
          />
          <Text style={{marginTop: 20, textAlign: 'center'}}>
            SETORAN HARI INI
          </Text>
          <View style={[styles.setoranBox, {backgroundColor: 'purple'}]}>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: 'white'}}>
              {'RP. ' + data.setoran_hari_ini}
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }
}

const SetoranBox = props => {
  return (
    <>
      <Text style={{marginTop: 20}}>{props.title}</Text>
      <View style={styles.setoranBox}>
        <Text style={{fontWeight: 'bold'}}>{props.amount}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  setoranBox: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingVertical: 12,
    marginTop: 5,
  },
});
