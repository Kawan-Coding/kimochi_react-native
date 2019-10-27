import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

import DetailTop from '../../../component/DetailTop';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Discount from '../../../assets/img/discount.png';
import Voucher from '../../../assets/img/voucher.png';
import Bill from '../../../assets/img/bill.png';
import Money from '../../../assets/img/money.png';
import Checked from '../../../assets/img/checked.png';

import KimochiModal from '../../../component/KimochiModal';
export default class CashierPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAwal: 20000,
      discountVisible: false,
      discountChoosen: false,
      totalAkhir: 18000,
      isModalVisible: false,
    };
    this.changeDiscountVisibility = this.changeDiscountVisibility.bind(this);
    this.changeModalVisibility = this.changeModalVisibility.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.chooseDiscount = this.chooseDiscount.bind(this);
  }

  changeDiscountVisibility = visible => {
    console.log('masuk visibility');
    this.setState({discountVisible: visible});
  };
  chooseDiscount = visible => {
    this.changeDiscountVisibility(false);
    this.setState({discountChoosen: visible});
  };
  changeModalVisibility = bool => {
    this.setState({
      isModalVisible: bool,
    });
  };
  confirmPayment = () => {
    console.log('confirm payment');
    this.changeModalVisibility(false);
  };
  render() {
    let discountText = '';
    let discountCardText = 'Discount';
    if (this.state.discountChoosen) {
      discountText = 'Voucher Discount Agustus';
      discountCardText = 'Rp. 5000';
    }
    return (
      <>
        <DetailTop title="Cashier-Payment" />
        <View style={{padding: 10, flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <MemberCard
              tr_id={'TO_1234567'}
              total={this.state.totalAwal}
              nama={'Kawan Koding'}
              cst_id={'ID_1234567'}
              no_hp={'08123939'}
              member={'Member Honda Kartika Sari'}
            />
            <TouchableOpacity
              onPress={() => this.changeDiscountVisibility('flex')}>
              <PaymentCard image={Discount} type={discountCardText} />
            </TouchableOpacity>
            <Text
              style={{
                color: 'purple',
                display: this.state.discountChoosen ? 'flex' : 'none',
              }}>
              {discountText}
            </Text>
            <PaymentCard image={Voucher} type={'Coupon'} />
            <PaymentCard image={Bill} type={'Payment'} />
            <PaymentCard image={Money} type={'Bonus'} />
          </ScrollView>
        </View>
        <PaymentBtn
          total={this.state.totalAkhir}
          kembalian={this.state.totalAwal - this.state.totalAkhir}
          function={this.changeModalVisibility}
        />
        <View style={{display: this.state.discountVisible ? 'flex' : 'none'}}>
          <DiscountSheet function={this.chooseDiscount} />
        </View>
        <KimochiModal
          opacity={this.state.isModalVisible}
          hide={() => this.changeModalVisibility}
          message={
            'Pembayaran telah berhasil dilakukan \n\n Apakah customer telah menerima barang?'
          }
          icon={Checked}
          option={true}
          function={this.confirmPayment}
        />
      </>
    );
  }
}
const MemberCard = props => {
  return (
    <>
      <View style={styles.memberCard}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View>
            <Text style={styles.textBold}>{props.tr_id}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.textBold}>Rp. {props.total}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <View>
            <Text>{props.nama}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text>{props.cst_id}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text>{props.no_hp}</Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <Text style={{textAlign: 'right'}}>{props.member}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
const PaymentCard = props => {
  let bgPayment = {
    backgroundColor: '',
  };
  let title = props.type;

  if (props.type == 'Discount') {
    bgPayment.backgroundColor = 'red';
  }
  if (props.type == 'Coupon') {
    bgPayment.backgroundColor = 'purple';
  }
  if (props.type == 'Payment') {
    bgPayment.backgroundColor = 'green';
  }
  if (props.type == 'Bonus') {
    bgPayment.backgroundColor = 'orange';
  }
  return (
    <>
      <View
        style={[
          styles.memberCard,
          {flex: 1, flexDirection: 'row', alignItems: 'center'},
        ]}>
        <Text>{title}</Text>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <View style={[styles.roundedPayment, bgPayment]}>
            <Image source={props.image} style={{width: 17, height: 17}} />
          </View>
        </View>
      </View>
    </>
  );
};

const PaymentBtn = props => {
  return (
    <View style={styles.paymentWrap}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Text style={{flex: 1, color: 'white'}}>
          Sub total{'\n'}
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.total}</Text>
        </Text>
        <Text style={{flex: 1, color: 'white', textAlign: 'right'}}>
          Kembalian{'\n'}
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {props.kembalian}
          </Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => props.function(true)}>
        <BtnConfirm title={'Bayar'} />
      </TouchableOpacity>
    </View>
  );
};

const BtnConfirm = props => {
  return (
    <>
      <View
        style={{
          paddingVertical: 7,
          width: 120,
          backgroundColor: '#fB5516',
          borderRadius: 7,
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
          {props.title}
        </Text>
      </View>
    </>
  );
};

const DiscountSheet = props => {
  return (
    <>
      <View
        style={{
          flex: 1,
          height: 500,
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        <SheetTitle title={'Voucher Discount'} />
        <ScrollView style={{flex: 1, backgroundColor: 'white', padding: 20}}>
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
          <DiscountCard
            title={'Voucher Diskon Agustus'}
            content={'Syarat menunjukkan KTP Kemudian KTP di Foto'}
            amount={'Rp.5000'}
            function={props.function}
          />
        </ScrollView>
      </View>
    </>
  );
};
const SheetTitle = props => {
  return (
    <View style={styles.sheet}>
      <Text style={{color: 'white'}}>{props.title}</Text>
    </View>
  );
};
const DiscountCard = props => {
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
          {props.amount}
        </Text>
        <View
          style={{
            paddingVertical: 7,
            width: 100,
            backgroundColor: '#43Af4A',
            borderRadius: 25,
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={() => props.function(true)}>
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
  memberCard: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginVertical: 5,
  },
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
  sheet: {
    height: 50,
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  roundedPayment: {
    borderRadius: 40,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentWrap: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43Af4A',
    padding: 10,
  },
});
