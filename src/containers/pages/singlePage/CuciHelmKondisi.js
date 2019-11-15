import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TextInput, Picker} from 'react-native';

import DetailTop from '../../../component/DetailTop';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
export default class CuciHelmKondisi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempurung_luar: 'mulus',
      kaca: 'mulus',
      baut_kiri: 'bagus',
      baut_kanan: 'bagus',
      busa: 'bagus',
    };
  }
  tempurungHandler = val => {
    this.setState({tempurung_luar: val});
  };
  kacaHandler = val => {
    this.setState({kaca: val});
  };
  bautKiriHandler = val => {
    this.setState({baut_kiri: val});
  };
  bautKananHandler = val => {
    this.setState({baut_kanan: val});
  };
  busaHandler = val => {
    this.setState({busa: val});
  };
  kondisiSave = () => {
    let data = this.state;

    let val =
      '{"tempurung_luar":"' +
      data.tempurung_luar +
      '","kaca":"' +
      data.kaca +
      '","baut_kiri":"' +
      data.baut_kiri +
      '","baut_kanan":"' +
      data.baut_kanan +
      '","busa":"' +
      data.busa +
      '"}';

    let fun = this.props.navigation.state.params.fun;

    fun(val);
    this.props.navigation.pop();
  };
  render() {
    return (
      <>
        <DetailTop title={'Kondisi Helm'} />
        <ScrollView>
          <View style={styles.container}>
            <Text>Cuci Helm Kondisi</Text>
            <View style={styles.inputWrap}>
              <Text>Tempurung Luar</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={this.state.tempurung_luar}
                  onValueChange={(itemValue, itemIndex) =>
                    this.tempurungHandler(itemValue)
                  }>
                  <Picker.Item label="Mulus" value="Mulus" />
                  <Picker.Item label="Baret" value="Baret" />
                  <Picker.Item label="Retak" value="Retak" />
                  <Picker.Item label="Pecah" value="Pecah" />
                </Picker>
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text>Kaca / Visor</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={this.state.kaca}
                  onValueChange={(itemValue, itemIndex) =>
                    this.kacaHandler(itemValue)
                  }>
                  <Picker.Item label="Mulus" value="Mulus" />
                  <Picker.Item label="Baret buram" value="Baret buram" />
                  <Picker.Item label="Retak" value="Retak" />
                  <Picker.Item label="Pecah" value="Pecah" />
                </Picker>
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text>Baut Kiri</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={this.state.baut_kiri}
                  onValueChange={(itemValue, itemIndex) =>
                    this.bautKiriHandler(itemValue)
                  }>
                  <Picker.Item label="Bagus" value="Bagus" />
                  <Picker.Item label="Penyet" value="Penyet" />
                  <Picker.Item label="Rusak" value="Rusak" />
                </Picker>
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text>Baut Kanan</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={this.state.baut_kanan}
                  onValueChange={(itemValue, itemIndex) =>
                    this.bautKananHandler(itemValue)
                  }>
                  <Picker.Item label="Bagus" value="Bagus" />
                  <Picker.Item label="Penyet" value="Penyet" />
                  <Picker.Item label="Rusak" value="Rusak" />
                </Picker>
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text>Busa</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={this.state.busa}
                  onValueChange={(itemValue, itemIndex) =>
                    this.busaHandler(itemValue)
                  }>
                  <Picker.Item label="Bagus" value="Bagus" />
                  <Picker.Item label="Kempes" value="Kempes" />
                  <Picker.Item label="Robek" value="Robek" />
                </Picker>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            borderTopColor: '#cccccc',
            borderTopWidth: 1,
          }}>
          <TouchableOpacity onPress={() => this.kondisiSave()}>
            <BtnConfirm title="SAVE" />
          </TouchableOpacity>
        </View>
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
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: 3,
  },
  inputWrap: {
    marginTop: 10,
    width: '100%',
  },
});
