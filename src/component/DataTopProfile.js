import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {IndonesiaDate} from '../config/utilities/IndonesiaDate';
import AsyncStorage from '@react-native-community/async-storage';
export default class DataTopProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama_lengkap: '',
      role: '',
      id: '',
      no_telepon: '',
      email: 'fawwazdaffam99@gmail.com',
    };
  }
  // let nama_lengkap;
  // let role;
  // let id;
  // let no_telepon;
  // let email = 'fawwazdaffam99@gmail.com';

  componentDidMount = async () => {
    await AsyncStorage.getItem('nama_lengkap').then(res => {
      this.setState({nama_lengkap: res});
    });
    await AsyncStorage.getItem('role').then(res => {
      this.setState({role: res});
    });
    await AsyncStorage.getItem('id').then(res => {
      this.setState({id: res});
    });
    await AsyncStorage.getItem('no_telepon').then(res => {
      this.setState({no_telepon: res});
    });
  };

  render() {
    let date = IndonesiaDate(new Date());
    let data = this.state;
    return (
      <>
        <View style={styles.header}>
          <DataTop
            data1={date.tanggal + ' ' + date.bulan + ' ' + date.tahun}
            data2={data.role}
          />
          <DataTop data1={data.nama_lengkap} data2={data.id} />
          <DataTop data1={data.no_telepon} data2={data.email} />
        </View>
      </>
    );
  }
}

const DataTop = props => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text>{props.data1}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text>{props.data2}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#cccccc',
    borderTopColor: '#cccccc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStyle: 'dotted',
  },
});
