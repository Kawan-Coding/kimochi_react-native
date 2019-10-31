import React, {Component} from 'react';

import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';

import bgLogin from '../../../assets/img/bgLogin.jpg';
import userIcon from '../../../assets/img/user.png';
import locked from '../../../assets/img/locked.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Auth} from '../../../config/service/Auth';
import {SetItem, GetItem} from '../../../config/service/Storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      data: '',
      invalid: false,
    };

    // this.IsLogin();
  }

  changeInvalid = bool => {
    this.setState({invalid: bool});
  };
  LoginService = async (username, password) => {
    await Auth(username, password).then(async result => {
      if (result.data.error == false) {
        this.changeInvalid(false);
        try {
          let data = result.data.data;

          let cashStatus = data.cash_flow_status;
          let cashId = data.cash_flow_id;
          await SetItem('id', data.responsible.pegawai.id);
          await SetItem('nama_lengkap', data.responsible.pegawai.nama_lengkap);
          await SetItem('no_telepon', data.responsible.pegawai.no_telepon);
          await SetItem('foto', data.responsible.pegawai.foto);
          await SetItem('create_at', data.responsible.pegawai.create_at);
          await SetItem('cabang_id', data.responsible.cabang.id);
          await SetItem('cabang_nama', data.responsible.cabang.nama);

          await SetItem('cabang_alamat', data.responsible.cabang.alamat);

          await SetItem('cash_flow_status', cashStatus);
          await SetItem('cash_flow_id', cashId);

          await SetItem(
            'id_responsible',
            data.responsible.cabang.id_responsible,
          );

          await SetItem('role', data.responsible.cabang.role).then(() => {
            if (cashStatus == 'unvalidated') {
              this.props.navigation.navigate('ValidationCheck');
            }
            if (cashStatus == 'progress') {
              this.props.navigation.navigate('Home');
            }
            if (cashStatus == 'validated') {
              this.props.navigation.navigate('OpenCashier');
            }
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.changeInvalid(true);
      }
    });
    // this.state.data = dataService.data;
    // dataService = this.state.data;
    // console.log(dataService.error);
    // if (dataService.error == false) {
    //   console.log('mlebu');
    //   await AsyncStorage.setItem('ID', dataService.data.id);

    // }
  };

  render() {
    let invalid;
    if (this.state.invalid) {
      invalid = (
        <Text style={{color: 'red', textAlign: 'center', fontSize: 15}}>
          Maaf username / password anda salah
        </Text>
      );
    }
    return (
      <>
        <ImageBackground
          source={bgLogin}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.loginWrap}>
            <View style={styles.loginForm}>
              <View style={styles.formImg}>
                <Image source={userIcon} style={styles.iconImg} />
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.Input}
                  value={this.state.username}
                  onChangeText={username => this.setState({username: username})}
                />
              </View>
            </View>
            <View style={styles.loginForm}>
              <View style={styles.formImg}>
                <Image source={locked} style={styles.iconImg} />
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.Input}
                  value={this.state.password}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({password: password})}
                />
              </View>
            </View>
            {invalid}
            <TouchableOpacity
              onPress={() =>
                this.LoginService(this.state.username, this.state.password)
              }>
              <View style={styles.btnWrap}>
                <Text style={{color: '#fB5516'}}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              marginBottom: 10,
            }}>
            V.1.0
          </Text>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loginWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formImg: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  iconImg: {
    width: 25,
    height: 30,
  },
  formInput: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  Input: {
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: 210,
  },
  btnWrap: {
    marginTop: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 260,
    paddingVertical: 10,
    opacity: 0.9,
  },
  loginBtn: {
    borderRadius: 10,
  },
});

export default Login;
