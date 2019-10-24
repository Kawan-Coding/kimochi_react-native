import React, {Component} from 'react';

import {Text, TextInput, StyleSheet, View, Picker} from 'react-native';
import DetailTop from '../../../component/DetailTop';

import {ScrollView} from 'react-native-gesture-handler';
export default class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
    };
  }
  render() {
    return (
      <>
        <DetailTop title={'Pendaftaran Customer'} />
        <ScrollView style={{padding: 15, marginTop: 10}}>
          <Text style={{marginTop: 10}}>
            Nama
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput style={styles.input} />
          <Text style={{marginTop: 10}}>
            No HP
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput style={styles.input} />
          <Text style={{marginTop: 10}}>
            Email
            <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput style={styles.input} />
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
            <Picker.item label="Laki-laki" value="L" />
            <Picker.item label="Perempuan" value="P" />
          </Picker>
        </ScrollView>
      </>
    );
  }
}

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
