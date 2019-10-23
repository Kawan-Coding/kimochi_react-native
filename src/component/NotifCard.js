import React, {Component} from 'react';

import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';

import {IndonesiaDate} from '../config/utilities/IndonesiaDate';
import IconCard from '../assets/img/calendarBlack.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

const NotifCard = props => {
  let date = IndonesiaDate(new Date());
  return (
    <>
      <View style={styles.container}>
        <Image source={IconCard} style={styles.iconCard} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('NotifDetail')}>
          <View style={styles.cardWrap}>
            <View style={styles.cardTop}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text style={{fontWeight: 'bold'}}>New Order</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{fontSize: 12}}>
                  {date.tanggal + ' ' + date.bulan + ' ' + date.tahun}
                </Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text>
                Congrat's anda mendapatkan tambahan (1) satu customer baru.
                Silahkan lihat order di fitur order
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: Dimensions.get('window').width - 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  iconCard: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginHorizontal: 7,
  },
  cardWrap: {
    paddingHorizontal: 5,
  },
  cardTop: {
    flexDirection: 'row',
  },
  cardContent: {
    marginTop: 10,
    width: '90%',
  },
});

export default withNavigation(NotifCard);
