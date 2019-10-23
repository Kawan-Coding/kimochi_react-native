import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';

import Deal from '../../../assets/img/deal.jpg';
import DetailTop from '../../../component/DetailTop';

const NotifDetail = props => {
  return (
    <>
      <DetailTop title={'New Order'} />
      <ScrollView>
        <View>
          <Image source={Deal} style={{width: '100%', height: 300}} />
          <Text style={styles.notifContent}>
            Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan
            dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi
            standar contoh teks sejak tahun 1500an, saat
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  notifContent: {
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default withNavigation(NotifDetail);
