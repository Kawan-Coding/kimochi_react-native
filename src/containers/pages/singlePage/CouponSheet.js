import React, {Component} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import SheetTitle from '../../../component/SheetTitle';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

export default class CouponSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Kode: '',
      Nominal: '',
      Keterangan: '',
      loading: true,
    };
  }

  onChangeKode = input => {
    // const newEmail = event.target.value;
    this.setState({Kode: input});
  };
  onChangeNominal = input => {
    this.setState({Nominal: input});
  };
  onChangeKeterangan = input => {
    this.setState({Keterangan: input});
  };

  render() {
    const fun = this.props.navigation.state.params.function;
    // fun();
    return (
      <>
        <View
          style={{
            flex: 1,

            bottom: 0,
          }}>
          <SheetTitle
            title={'Voucher Coupon'}
            close={this.props.navigation.pop}
          />
          <ScrollView style={{flex: 1, backgroundColor: 'white', padding: 20}}>
            <Text style={styles.labelInput}>Kode</Text>

            <TextInput
              style={styles.input}
              onChangeText={this.onChangeKode.bind(this)}
              value={this.state.Kode}
            />
            <Text style={styles.labelInput}>Nominal</Text>
            <TextInput
              style={styles.input}
              onChangeText={this.onChangeNominal.bind(this)}
              value={this.state.Nominal}
              keyboardType={'numeric'}
            />
            <Text style={styles.labelInput}>Keterangan</Text>
            <TextInput
              style={[styles.input, {height: 100}]}
              value={this.state.Keterangan}
              onChangeText={this.onChangeKeterangan.bind(this)}
            />
          </ScrollView>
          <View
            style={{
              backgroundColor: '#43Af4A',
              height: 75,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => this.props.function()}>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fB5516'}}>Simpan</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginVertical: 5,
    textAlign: 'center',
    zIndex: 10000,
  },
  labelInput: {
    fontWeight: 'bold',
    marginTop: 5,
  },
});
