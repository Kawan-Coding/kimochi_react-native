import React, {Component} from 'react';

import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import homeIcon from '../assets/img/home.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

import CustomerRegister from '../containers/pages/singlePage/CustomerRegister';
export default class KimochiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width - 30,
    };
    Dimensions.addEventListener('change', e => {
      this.setState(e.window);
    });
  }
  closeModal = () => {
    this.props.changeModalVisibility(false);
  };

  registerRedirect = () => {
    // this.props.hide(false);
    // this.props.linkNavigation('RegisterCustomer');
  };

  render() {
    let modal;
    console.log(this.props.opacity);
    if (this.props.option == true && this.props.opacity == true) {
      modal = (
        <>
          <View
            style={[
              styles.overlay,
              {opacity: this.props.opacity ? 0.75 : 0},
            ]}></View>
          <View
            style={[
              styles.container,
              styles.modal,
              {display: this.props.opacity ? 'flex' : 'none'},
            ]}>
            <View style={styles.modalHeader}>
              <Image style={styles.modalImg} source={this.props.icon} />
            </View>
            <View style={styles.modalContent}>
              <Text>{this.props.message}</Text>
              <TouchableOpacity
                onPress={() => this.props.function(this.props.page)}>
                <View style={styles.modalBtn}>
                  <Text style={styles.btnText}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }
    if (this.props.option == false && this.props.opacity == true) {
      modal = (
        <>
          <View
            style={[
              styles.overlay,
              {opacity: this.props.opacity ? 0.75 : 0},
            ]}></View>
          <View
            style={[
              styles.container,
              styles.modal,
              {display: this.props.opacity ? 'flex' : 'none'},
            ]}>
            <View style={styles.modalHeader}>
              <Image style={styles.modalImg} source={this.props.icon} />
            </View>
            <View style={styles.modalContent}>
              <Text>{this.props.message}</Text>
              <TouchableOpacity onPress={() => this.props.function()}>
                <View style={styles.modalBtn}>
                  <Text style={styles.btnText}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }

    return <>{modal}</>;
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1001,
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: Dimensions.get('window').width - 30,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 3.5,
    zIndex: 1002,
  },
  modalHeader: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#43Af4A',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalImg: {
    width: 50,
    height: 50,
  },
  modalContent: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 100,
    backgroundColor: '#fB5516',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  modalBtnNo: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 15,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
