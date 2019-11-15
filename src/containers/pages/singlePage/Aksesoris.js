import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Picker,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import leftArrowGreen from '../../../assets/img/leftArrowGreen.png';
import {BaseUrlPhoto} from '../../../config/service/Template';
import {ScrollView} from 'react-native-gesture-handler';

export default class Aksesoris extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qyt: this.props.navigation.state.params.qyt,
      warna: 'merah',
      barang_id: this.props.navigation.state.params.barang_id,
    };
  }

  warnaHandler = val => {
    this.setState({warna: val});
  };
  qytHandler = bool => {
    let count = this.state.qyt;
    if (count >= 0) {
      if (bool) {
        this.setState({qyt: count + 1});
      } else {
        if (count != 0) {
          this.setState({qyt: count - 1});
        }
      }
    }
  };
  aksesorisSave = async () => {
    let data = this.state;
    // let barang_id = this.props.navigation.state.params.barang_id;

    let qyt = data.qyt;
    let jenis_transaksi = 'aksesoris';

    let dataSend =
      '{"barang_id":"' +
      data.barang_id +
      '","qyt":' +
      qyt +
      ',"jenis_transaksi":"' +
      jenis_transaksi +
      '"}';

    let fun = this.props.navigation.state.params.fun;

    dataSend = JSON.parse(dataSend);

    await fun(dataSend);
    this.props.navigation.pop();
  };

  render() {
    let params = this.props.navigation.state.params;
    return (
      <>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <Image source={leftArrowGreen} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <View style={[styles.contentCard, {alignItems: 'center'}]}>
              <Image
                source={{uri: params.image}}
                style={{width: 360, height: 360, resizeMode: 'contain'}}
              />
            </View>
            <View style={styles.contentCard}>
              <Text style={styles.titleText}>{params.title}</Text>
              <Text style={styles.contentText}>{params.detail}</Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{flex: 1}}>
                  <Text style={styles.labelText}>Harga</Text>
                  <Text style={styles.titleText}>RP. {params.price}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.labelText}>Quantity</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      marginRight: 20,
                      borderWidth: 1,
                      borderColor: '#cccccc',
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity onPress={() => this.qytHandler(false)}>
                      <Counter type={'-'} />
                    </TouchableOpacity>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>{this.state.qyt}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.qytHandler(true)}>
                      <Counter type={'+'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.labelText}>Warna</Text>
                <Picker
                  style={{height: 25}}
                  selectedValue={this.state.warna}
                  onValueChange={(itemValue, itemIndex) =>
                    this.warnaHandler(itemValue)
                  }>
                  <Picker.Item label="Merah" value="Merah" />
                  <Picker.Item label="Kuning" value="Kuning" />
                </Picker>
              </View>
            </View>
            <View style={styles.contentCard}>
              <Text style={styles.titleText}>Spesifikasi</Text>
              <Text style={styles.contentText}>Iki Spesifikasi barang</Text>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 25,
            borderTopColor: '#cccccc',
            borderTopWidth: 1,
          }}>
          <TouchableOpacity onPress={() => this.aksesorisSave()}>
            <BtnConfirm title={'Pesan'} />
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
          backgroundColor: '#43Af4A',
          borderRadius: 7,
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
          {props.title}
        </Text>
      </View>
    </>
  );
};
const Counter = props => {
  return (
    <View
      style={{
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{props.type}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  contentCard: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  titleText: {
    color: '#fB5516',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentText: {
    fontSize: 12,
  },
  labelText: {
    fontSize: 10,
  },
});
