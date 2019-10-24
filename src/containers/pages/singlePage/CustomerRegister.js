import React, {Component} from 'react';

import {Text, TextInput, StyleSheet, View, Picker} from 'react-native';
import DetailTop from '../../../component/DetailTop';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import DatePicker from 'react-native-datepicker';

import {AddCustomer} from '../../../config/service/Customer';
export default class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: null,
      email: '',
      nama_lengkap: '',
      no_telepon: '',
      kendaraan: '',
      plat_nomor: '',
      member: '',
      gender: '',
      date: new Date(),
    };
  }

  register = async () => {
    console.log('masuk');
    let data = this.state;
    await AddCustomer(
      data.username,
      data.password,
      data.nama_lengkap,
      data.no_telepon,
      data.kendaraan,
      data.plat_nomor,
      data.member,
    ).then(result => {
      if (result.data.error) {
        console.log(result.data.message);
      } else {
        this.props.navigation.navigate('Home');
      }
    });
  };
  render() {
    return (
      <>
        <DetailTop title={'Pendaftaran Customer'} />
        <ScrollView style={{padding: 15, marginTop: 10}}>
          <Text style={{marginTop: 10}}>
            Nama
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.nama_lengkap}
            onChange={nama_lengkap =>
              this.setState({nama_lengkap: nama_lengkap})
            }
          />
          <Text style={{marginTop: 10}}>
            No HP
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.no_telepon}
            onChange={no_telepon => this.setState({no_telepon: no_telepon})}
          />
          <Text style={{marginTop: 10}}>
            Email
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChange={email => this.setState({email: email})}
          />
          <Text style={{marginTop: 10}}>
            Gender
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <Picker
            style={styles.input}
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }>
            <Picker.Item label="Laki-laki" value="L" />
            <Picker.Item label="Perempuan" value="P" />
          </Picker>
          <Text style={{marginTop: 10}}>
            Tanggal Lahir
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          {/* <View style={styles.input} onPress={this.datepicker}></View> */}
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1960-05-01"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({date: date});
            }}
          />
          <Text style={{marginTop: 10}}>Merk Kendaraan</Text>
          <TextInput
            style={styles.input}
            value={this.state.kendaraan}
            onChange={kendaraan => this.setState({kendaraan: kendaraan})}
          />
          <Text style={{marginTop: 10}}>Plat Nomer</Text>
          <TextInput
            style={styles.input}
            value={this.state.plat_nomor}
            onChange={plat_nomor => this.setState({plat_nomor: plat_nomor})}
          />
          <Text style={{marginTop: 10}}>
            Status Member
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.member}
            onChange={member => this.setState({member: member})}
          />
          <TouchableOpacity onPress={() => this.register()}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <BtnConfirm title="Save" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  }
}

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
  input: {
    width: '100%',
    height: 45,
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,

    paddingHorizontal: 10,
  },
});
