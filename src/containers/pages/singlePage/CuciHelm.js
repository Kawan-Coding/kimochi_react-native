import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import upImage from '../../../assets/img/upImage.png';
import ImagePicker from 'react-native-image-picker';
export default class CuciHelm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jenis_helm: this.props.navigation.state.params.jenis_helm,
      merk_helm: '',
      lama_pemakaian: '',
      kondisi: null,
      foto_helm: null,
    };
    console.log(this.props.navigation.state.params);
  }
  jenisHandler = val => {
    this.setState({jenis_helm: val});
  };
  merkHandler = val => {
    this.setState({merk_helm: val});
  };
  lamaHandler = val => {
    this.setState({lama_pemakaian: val});
  };
  kondisiHandler = val => {
    this.setState({kondisi: val});
  };
  cuciSave = async () => {
    let data = this.state;
    let barang_id = this.props.navigation.state.params.barang_id;

    let qyt = 1;
    let jenis_transaksi = 'cuci_helm';
    // let data_foto = {
    //   uri: data.foto_helm.path,
    //   name: 'foto_helm.jpg',
    //   type: 'image/jpg',
    // };

    // let data_foto = new FormData();
    // data_foto.append({
    //   uri: data.foto_helm.path,
    //   name: 'foto_helm.jpg',
    //   type: 'image/jpg',
    // });

    let data_foto = {
      uri: 'file://' + data.foto_helm.path,
      name: 'foto_helm.jpg',
      type: 'image/jpg',
    };
    // data_foto = JSON.stringify(data_foto);

    let kondisi =
      '{"jenis_helm":"' +
      data.jenis_helm +
      '","merk_helm":"' +
      data.merk_helm +
      '","lama_pemakaian":"' +
      data.lama_pemakaian +
      '","kondisi":' +
      data.kondisi +
      '}';
    let dataSend =
      '{"barang_id":"' +
      barang_id +
      '","qyt":' +
      qyt +
      ',"jenis_transaksi":"' +
      jenis_transaksi +
      '","kondisi":' +
      kondisi +
      ',"foto_helm":"eyaa"}';

    let fun = this.props.navigation.state.params.fun;
    let fun2 = this.props.navigation.state.params.fun2;
    console.log(dataSend);
    dataSend = JSON.parse(dataSend);
    console.log(dataSend);
    await fun(dataSend);
    await fun2(data_foto);
    this.props.navigation.pop();
  };
  handleImage = () => {
    ImagePicker.showImagePicker(options, response => {
      //   console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;
        console.log(source);
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};

        this.setState({
          foto_helm: source,
        });
      }
    });
  };

  render() {
    let foto_helm;
    if (this.state.foto_helm) {
      foto_helm = (
        <>
          <Image
            source={this.state.foto_helm}
            style={{width: 400, height: 400, resizeMode: 'contain'}}
          />
        </>
      );
    }
    return (
      <>
        <DetailTop title="CUCI HELM" />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputWrap}>
              <Text>Jenis Helm</Text>
              <View style={styles.input}>
                <TextInput value={this.state.jenis_helm} />
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text>Merk Helm</Text>
              <View style={styles.input}>
                <TextInput
                  value={this.state.merk_helm}
                  onChangeText={res => this.merkHandler(res)}
                />
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text>Lama Pemakaian</Text>
              <View style={styles.input}>
                <TextInput
                  value={this.state.lama_pemakaian}
                  onChangeText={res => this.lamaHandler(res)}
                />
              </View>
            </View>
            <View style={styles.inputWrap}>
              <Text>Kondisi</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CuciHelmKondisi', {
                    fun: this.kondisiHandler,
                  })
                }>
                <View
                  style={[
                    styles.input,
                    {
                      height: 50,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    },
                    this.state.kondisi == null
                      ? {backgroundColor: '#fB5516'}
                      : {backgroundColor: '#43Af4A'},
                  ]}>
                  <Text
                    style={{
                      fontSize: 28,
                      color: 'white',
                      marginRight: 10,
                      marginBottom: 5,
                    }}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrap}>
              <Text>Foto</Text>
              <TouchableOpacity onPress={() => this.handleImage()}>
                <Image
                  source={upImage}
                  style={{height: 45, width: 45, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              {foto_helm}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <TouchableOpacity onPress={() => this.cuciSave()}>
              <BtnConfirm title="SAVE" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}
const options = {
  title: 'Pilih Foto',
  noData: true,
  //   customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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
