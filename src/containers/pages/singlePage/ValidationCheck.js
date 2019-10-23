import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';

import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import bgValidationCheck from '../../../assets/img/bgValidationCheck.jpg';
import leftArrow from '../../../assets/img/leftArrow.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class ValidationCheck extends Component {
  render() {
    let date = IndonesiaDate(new Date());
    return (
      <>
        <ImageBackground
          source={bgValidationCheck}
          style={{flex: 1, zIndex: -10}}>
          <View
            style={{
              alignSelf: 'flex-start',
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <Image source={leftArrow} style={styles.leftArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              <Text style={{fontSize: 64}}>{date.tanggal + '\n'}</Text>
              <Text style={{fontSize: 36}}>
                {date.bulan + ' ' + date.tahun + '\n'}
              </Text>
              <Text style={{fontSize: 24}}>
                {date.jam + '.' + date.menit + '.' + date.detik + '\n'}
              </Text>
            </Text>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
              <Text>Hallo{'\n\n'}</Text>
              <Text style={{fontWeight: 'bold'}}>Kawan Coding{'\n\n'}</Text>
              <Text>Setoran Anda Belum divalidasi{'\n'}</Text>
              <Text>
                Silahkan meminta validasi untuk dapat melanjutkan aktivitas
                kerja anda{'\n'}
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftArrow: {
    width: 45,
    height: 38,
  },
});
