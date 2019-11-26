import React, {Component} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import DataTopProfile from '../../../component/DataTopProfile';

import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import calendarColor from '../../../assets/img/calendarColor.png';
import {GetHistoryTransaksi} from '../../../config/service/Transaction';
import {GetItem} from '../../../config/service/Storage';
export default class HIstoryTransaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateChoosen: false,
      date: new Date(),
      mode: 'date',
      show: false,
      data: [],
    };
  }
  setDate = async (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      dateChoosen: true,
    });
    await this.getHistory();
  };
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };
  getHistory = async () => {
    await GetItem('id_responsible').then(async res => {
      let date = IndonesiaDate(this.state.date);
      date = '' + date.tahun + date.bulan + date.tanggal;
      await GetHistoryTransaksi(res, date).then(res => {
        console.log(res);
        this.setState({data: res.data.data});
      });
    });
  };
  render() {
    let data = this.state.data;
    let pembayaran;
    if (data.pembayaran == null) {
      pembayaran = (
        <>
          <Text>Data transaksi tidak ditemukan</Text>
        </>
      );
    } else {
      pembayaran = data.pembayaran.map(data => {
        return (
          <View
            style={{flex: 1, alignItems: 'center'}}
            key={data.metode_pembayaran_id}>
            <Text
              style={{fontWeight: 'bold'}}
              key={data.metode_pembayaran_id + 'A'}>
              {data.nama}
            </Text>
            <BtnOmset
              data={data.total}
              color={'orange'}
              key={data.metode_pembayaran_id + 'B'}
            />
          </View>
        );
      });
    }
    const {show, date, mode} = this.state;
    let tanggal = IndonesiaDate(this.state.date);
    return (
      <>
        <DetailTop title="History Transaksi" />
        <DataTopProfile />
        <TouchableOpacity onPress={this.datepicker}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Image
              source={calendarColor}
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
              }}
            />
            <Text>
              {tanggal.tanggal + ' ' + tanggal.bulan + ' ' + tanggal.tahun}
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={{paddingHorizontal: 20}}>
          <View style={{display: this.state.dateChoosen ? 'flex' : 'none'}}>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>TOTAL OMSET</Text>
                <BtnOmset data={'Rp. 750.000'} color={'blue'} />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>TUNAI</Text>
                <BtnOmset data={'Rp. 750.000'} color={'purple'} />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>NON TUNAI</Text>
                <BtnOmset data={'Rp. 750.000'} color={'purple'} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>GLOBAL</Text>
                <BtnOmset data={'Rp. 750.000'} color={'orange'} />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>CASH</Text>
                <BtnOmset data={'Rp. 750.000'} color={'orange'} />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>EDC</Text>
                <BtnOmset data={'Rp. 750.000'} color={'orange'} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>OVO</Text>
                <BtnOmset data={'Rp. 750.000'} color={'orange'} />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>GO PAY</Text>
                <BtnOmset data={'Rp. 750.000'} color={'orange'} />
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>KIMOCHI</Text>
                <BtnOmset data={'Rp. 750.000'} color={'orange'} />
              </View>
            </View> */}
            {pembayaran}
          </View>
        </ScrollView>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}
      </>
    );
  }
}
const BtnOmset = props => {
  let backgroundColor = '';
  let color = '';
  let borderColor = '';
  if (props.color == 'blue') {
    backgroundColor = {
      backgroundColor: 'blue',
    };
    color = {
      color: 'white',
    };
    borderColor = {
      borderColor: '#cccccc',
    };
  }
  if (props.color == 'purple') {
    backgroundColor = {
      backgroundColor: 'purple',
    };
    color = {
      color: 'white',
    };
    borderColor = {
      borderColor: '#cccccc',
    };
  }
  if (props.color == 'orange') {
    backgroundColor = {
      backgroundColor: 'white',
    };
    color = {
      color: '#fB5516',
    };
    borderColor = {
      borderColor: '#fB5516',
    };
  }

  return (
    <>
      <View style={[styles.omsetBox, backgroundColor, borderColor]}>
        <Text style={color}>{props.data}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  omsetBox: {
    width: '90%',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingVertical: 8,
    marginTop: 5,
  },
});
