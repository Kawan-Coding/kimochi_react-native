import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  AppRegistry,
  Linking,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
export default class ScanBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }
  onSuccess = e => {
    console.log(e.data);
    this.setState({data: e.data});

    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };
  render() {
    return (
      <>
        <QRCodeScanner
          onRead={this.onSuccess}
          //   flashMode={QRCodeScanner.Constants.FlashMode.torch}
          topContent={<Text style={styles.centerText}>{this.state.data}</Text>}
          bottomContent={
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => this.props.navigation.pop()}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
