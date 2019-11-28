import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {IndonesiaDate} from '../config/utilities/IndonesiaDate';
import {GetItem} from '../config/service/Storage';
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
    await GetItem('nama_lengkap').then(res => {
      this.setState({nama_lengkap: res});
    });
    await GetItem('role').then(res => {
      this.setState({role: res});
    });
    await GetItem('id').then(res => {
      this.setState({id: res});
    });
    await GetItem('no_telepon').then(res => {
      this.setState({no_telepon: res});
    });
    await GetItem('email').then(res => {
      this.setState({email: res});
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
