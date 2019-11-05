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
      password: '',
      email: '',
      nama_lengkap: '',
      no_telepon: '',
      email: '',
      tanggal_lahir: null,
      kendaraan: '',
      plat_nomor: '',
      member: '',
      gender: 'laki-laki',
      date: new Date(),
    };
  }
  handleNamaLengkap = val => {
    this.setState({nama_lengkap: val});
  };
  handleNoTelepon = val => {
    this.setState({no_telepon: val});
  };
  handleEmail = val => {
    this.setState({email: val});
  };
  handleTanggalLahir = val => {
    this.setState({tanggal_lahir: val.format()});
  };
  handleKendaraan = val => {
    this.setState({kendaraan: val});
  };
  handlePlatNomor = val => {
    this.setState({plat_nomor: val});
  };
  handleMember = val => {
    this.setState({member: val});
  };
  handleGender = val => {
    console.log(val);
    this.setState({gender: val});
  };
  register = async () => {
    let data = this.state;
    console.log(data);
    await AddCustomer(
      data.username,
      data.password,
      data.nama_lengkap,
      data.no_telepon,
      data.email,
      data.tanggal_lahir,
      data.kendaraan,
      data.plat_nomor,
      data.member,
      data.gender,
    ).then(result => {
      console.log(result);
      if (result.data.error) {
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
            onChangeText={nama_lengkap => this.handleNamaLengkap(nama_lengkap)}
          />
          <Text style={{marginTop: 10}}>
            No HP
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            value={this.state.no_telepon}
            onChangeText={no_telepon => this.handleNoTelepon(no_telepon)}
          />
          <Text style={{marginTop: 10}}>
            Email
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.handleEmail(email)}
          />
          <Text style={{marginTop: 10}}>
            Gender
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <Picker
            style={styles.input}
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) =>
              this.handleGender(itemValue)
            }>
            <Picker.Item label="Laki-laki" value="laki-laki" />
            <Picker.Item label="Perempuan" value="perempuan" />
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
              this.handleTanggalLahir(date);
            }}
          />
          <Text style={{marginTop: 10}}>Merk Kendaraan</Text>
          <TextInput
            style={styles.input}
            value={this.state.kendaraan}
            onChangeText={kendaraan => this.handleKendaraan(kendaraan)}
          />
          <Text style={{marginTop: 10}}>Plat Nomer</Text>
          <TextInput
            style={styles.input}
            value={this.state.plat_nomor}
            onChangeText={plat_nomor => this.handlePlatNomor(plat_nomor)}
          />
          <Text style={{marginTop: 10}}>
            Status Member
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={this.state.member}
            onChangeText={member => this.handleMember(member)}
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
