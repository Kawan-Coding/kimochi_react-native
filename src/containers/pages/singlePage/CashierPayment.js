import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

import DetailTop from '../../../component/DetailTop';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Discount from '../../../assets/img/discount.png';
import Voucher from '../../../assets/img/voucher.png';
import Bill from '../../../assets/img/bill.png';
import Money from '../../../assets/img/money.png';
import Checked from '../../../assets/img/checked.png';

import KimochiModal from '../../../component/KimochiModal';
import CouponSheet from '../../../component/CouponSheet';
import DiscountSheet from '../../../component/DiscountSheet';
import PaymentSheet from '../../../component/PaymentSheet';

export default class CashierPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAwal: 20000,
      totalAkhir: 18000,
      overlayVisible: false,
      discountVisible: false,
      discountChoosen: false,
      discountValue: '',
      discountCardText: '',
      couponVisible: false,
      couponChoosen: false,
      couponValue: '',
      couponCardText: '',
      paymentVisible: false,
      paymentChoosen: false,
      paymentValue: '',
      paymentCardText: '',
      isModalVisible: false,
    };
    this.changeDiscountVisibility = this.changeDiscountVisibility.bind(this);
    this.changeModalVisibility = this.changeModalVisibility.bind(this);
    this.changeCouponVisibility = this.changeCouponVisibility.bind(this);
    this.changePaymentVisibility = this.changePaymentVisibility.bind(this);

    this.confirmPayment = this.confirmPayment.bind(this);
    this.chooseDiscount = this.chooseDiscount.bind(this);
    this.chooseCoupon = this.chooseCoupon.bind(this);
    this.choosePayment = this.choosePayment.bind(this);
  }
  changeOverlayVisibility = visible => {
    this.setState({overlayVisible: visible});
  };
  closeOverlay = () => {
    console.log('masuk close');
    this.setState({
      overlayVisible: false,
      discountVisible: false,
      couponVisible: false,
      paymentVisible: false,
    });
  };
  changeDiscountVisibility = visible => {
    this.changeOverlayVisibility(true);
    this.setState({discountVisible: visible});
  };
  chooseDiscount = (visible, discountValue, discountCardText) => {
    this.changeDiscountVisibility(false);
    this.changeOverlayVisibility(false);
    this.setState({
      discountChoosen: visible,
      discountValue: discountValue,
      discountCardText: discountCardText,
    });
  };
  changeCouponVisibility = visible => {
    this.changeOverlayVisibility(true);
    this.setState({couponVisible: visible});
  };
  chooseCoupon = visible => {
    this.changeCouponVisibility(false);
    this.setState({couponChoosen: visible});
  };
  changePaymentVisibility = visible => {
    this.changeOverlayVisibility(true);
    this.setState({paymentVisible: visible});
  };
  choosePayment = visible => {
    this.changeCouponVisibility(false);
    this.setState({paymentChoosen: visible});
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
  componentDidMount = () => {};
  render() {
    let discountValue = 'Discount';
    let discountCardText = '';
    if (this.state.discountChoosen) {
      if (this.state.discountValue > 1) {
        discountValue = 'Rp. ' + this.state.discountValue;
      }

      discountCardText = this.state.discountCardText;
    }
    let couponValue = 'Coupon';
    let couponCardText = '';

    let paymentValue = 'Payment';
    let paymentCardText = '';
    return (
      <>
        <View
          style={[
            {display: this.state.overlayVisible ? 'flex' : 'none', zIndex: 2},
          ]}>
          <View style={[styles.overlay, {zIndex: 2}]}></View>
        </View>

        <DetailTop title="Cashier-Payment" />
        <View style={{padding: 10, flex: 1, zIndex: 1}}>
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
              <PaymentCard image={Discount} type={discountValue} />
            </TouchableOpacity>
            <Text
              style={{
                color: 'purple',
                display: this.state.discountChoosen ? 'flex' : 'none',
              }}>
              {discountCardText}
            </Text>
            <TouchableOpacity
              onPress={() => this.changeCouponVisibility('flex')}>
              <PaymentCard image={Voucher} type={couponValue} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changePaymentVisibility('flex')}>
              <PaymentCard image={Bill} type={paymentValue} />
            </TouchableOpacity>
            <PaymentCard image={Money} type={'Bonus'} />
            <TextInput value={'123'} />
          </ScrollView>
        </View>
        <PaymentBtn
          total={this.state.totalAkhir}
          kembalian={this.state.totalAwal - this.state.totalAkhir}
          function={this.changeModalVisibility}
        />
        <View
          style={{
            display: this.state.discountVisible ? 'flex' : 'none',
            zIndex: 100,
            position: 'relative',
          }}>
          <DiscountSheet
            function={this.chooseDiscount}
            close={this.closeOverlay}
          />
        </View>
        <View
          style={{
            display: this.state.paymentVisible ? 'flex' : 'none',
            zIndex: 100,
            position: 'relative',
          }}>
          <PaymentSheet
            function={this.choosePayment}
            close={this.closeOverlay}
          />
        </View>
        <View
          style={{
            display: this.state.couponVisible ? 'flex' : 'none',
            position: 'relative',
            zIndex: 100,
          }}>
          <CouponSheet function={this.chooseCoupon} close={this.closeOverlay} />
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    opacity: 0.75,
  },
  memberCard: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginVertical: 5,
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
