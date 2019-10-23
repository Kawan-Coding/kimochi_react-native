import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';
import BottomTab from '../../../component/BottomTab';
import HeaderApp from '../../../component/HeaderApp';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import bgHome from '../../../assets/img/bgHome.jpg';
import rocket from '../../../assets/img/speed.png';

import DataHome from '../../../component/DataHome';
import KimochiModal from '../../../component/KimochiModal';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      number: '',
    };
  }
  changeModalVisibility = bool => {
    this.setState({
      isModalVisible: bool,
    });
  };
  render() {
    return (
      <>
        <HeaderApp />
        <ImageBackground source={bgHome} style={{flex: 1, zIndex: -10}}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
              <Text style={[styles.centerWhite, styles.titleText]}>
                Welcome to{' '}
                <Text style={{fontWeight: 'bold'}}>KIMOCHI GARAGE</Text>
              </Text>

              <Text style={[styles.centerWhite, {marginBottom: 15}]}>
                Enter your phone number
              </Text>

              <View style={styles.btnWrap}>
                <TextInput
                  style={styles.numInput}
                  value={this.state.number}
                  onChangeText={number => this.setState({number: number})}
                />
              </View>

              <View style={styles.rocketWrap}>
                <TouchableOpacity
                  onPress={() => this.changeModalVisibility(true)}>
                  <Image source={rocket} style={styles.rocketImg} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.container, {marginTop: 40}]}>
              <View style={styles.dataWrap}>
                <DataHome />
                <DataHome />
              </View>
              <View style={styles.dataWrap}>
                <DataHome />
                <DataHome />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        <BottomTab />
        <KimochiModal
          opacity={this.state.isModalVisible}
          hide={() => this.changeModalVisibility()}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrap: {
    marginTop: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    flex: 1,
    opacity: 0.9,
  },
  numInput: {
    paddingVertical: 10,
    color: '#fB5516',
    height: 50,
    width: 280,
    textAlign: 'center',
    zIndex: 10000,
  },
  centerWhite: {
    textAlign: 'center',
    color: 'white',

    fontSize: 16,
  },
  titleText: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 20,
    marginTop: 15,
  },
  rocketWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    backgroundColor: '#3390d3',
    borderRadius: 100,
    width: 160,
    height: 160,
    opacity: 0.95,
  },
  rocketImg: {
    width: 100,
    height: 100,
  },
  dataWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    width: '100%',
    opacity: 0.8,
  },
});
