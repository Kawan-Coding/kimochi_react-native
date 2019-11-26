import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SheetTitle from '../../../component/SheetTitle';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {GetDiscount} from '../../../config/service/Transaction';

export default class DiscountSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      data: [],
    };
  }
  componentDidMount = async () => {
    await GetDiscount().then(res => {
      this.setState({data: res.data.data});
    });
  };
  render() {
    const fun = this.props.navigation.state.params.fun;
    let discountCard;
    if (this.state.data.length != 0) {
      let data = this.state.data;
      console.log(data);
      discountCard = data.map((res, index) => {
        return (
          <DiscountCard
            title={res.nama}
            content={res.detail}
            amount={res.kuota}
            fun={fun}
            price={res.potongan}
            key={index}
          />
        );
      });
    } else {
      discountCard = (
        <Text style={{textAlign: 'center'}}>Maaf Diskon tidak tersedia</Text>
      );
    }
    return (
      <>
        <View
          style={{
            flex: 1,
          }}>
          <SheetTitle
            title={'Voucher Discount'}
            close={this.props.navigation.pop}
          />
          <ScrollView style={{flex: 1, backgroundColor: 'white', padding: 20}}>
            {discountCard}
          </ScrollView>
        </View>
      </>
    );
  }
}

const DiscountCard = props => {
  let price;
  if (props.price < 1) {
    price = props.price * 100 + '%';
  } else {
    price = 'Rp. ' + props.price;
  }
  return (
    <View style={styles.discountCard}>
      <View style={{flex: 2}}>
        <Text style={{fontWeight: 'bold', color: 'purple', fontSize: 16}}>
          {props.title}
        </Text>
        <Text style={{fontSize: 12}}>{props.content}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#fB5516', fontWeight: 'bold', fontSize: 22}}>
          {price}
        </Text>
        <View
          style={{
            paddingVertical: 7,
            width: 100,
            backgroundColor: '#43Af4A',
            borderRadius: 25,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => props.fun(true, props.price, props.title)}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              Pilih
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discountCard: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
});
