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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Auth} from '../../../config/service/Auth';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      data: [],
    };
    // this.IsLogin();
  }

  LoginService = async (username, password) => {
    const dataService = await Auth(username, password);
    console.log(dataService);
    this.state.data.push(dataService);
    // await AsyncStorage.setItem('ID', '22');
  };

  render() {
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
                <Image source={userIcon} style={styles.iconImg} />
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
