import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

import DetailTop from '../../../component/DetailTop';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Discount from '../../../assets/img/discount.png';
import Voucher from '../../../assets/img/voucher.png';
import Bill from '../../../assets/img/bill.png';
import Money from '../../../assets/img/money.png';
import Checked from '../../../assets/img/checked.png';
import {GetBarangTrId} from '../../../config/service/Barang';
import {GetItem} from '../../../config/service/Storage';
import {
  savePayment,
  SavePayment,
  SetPayment,
} from '../../../config/service/Transaction';

import KimochiModal from '../../../component/KimochiModal';

export default class CashierPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tr_id: this.props.navigation.state.params.tr_id,
      data: [],
      total: 0,
      totalAwal: 0,
      kembalian: 0,
      discountVisible: false,
      discountChoosen: false,
      discountValue: null,
      discountId: null,
      discountCardText: '',
      couponVisible: false,
      couponChoosen: false,
      couponValue: 0,
      couponCardText: '',
      paymentVisible: false,
      paymentChoosen: false,
      paymentValue: null,
      paymentCardText: [],
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

  changeDiscountVisibility = visible => {
    this.setState({discountVisible: visible});
  };
  chooseDiscount = (visible, discountValue, discountCardText, discountId) => {
    let total = this.state.totalAwal;
    if (discountValue < 1) {
      total = this.state.totalAwal - discountValue * this.state.totalAwal;
    } else {
      total -= discountValue;
    }
    this.setState({
      discountChoosen: visible,
      discountValue: discountValue,
      discountCardText: discountCardText,
      discountId: discountId,
      total: total,
    });
    this.props.navigation.pop();
  };
  changeCouponVisibility = visible => {
    this.setState({couponVisible: visible});
  };
  chooseCoupon = (visible, couponValue, couponCardText) => {
    this.setState({
      couponChoosen: visible,
      couponValue: couponValue,
      couponCardText: couponCardText,
    });
    this.props.navigation.pop();
  };
  changePaymentVisibility = visible => {
    this.setState({
      paymentChoosen: visible,
      paymentValue: discountValue,
      paymentCardText: discountCardText,
    });
  };
  choosePayment = (visible, paymentValue, paymentCardText) => {
    this.setState({
      paymentChoosen: visible,
      paymentValue: paymentValue,
      paymentCardText: paymentCardText,
      kembalian: paymentCardText.kembalian,
    });
    this.props.navigation.pop();
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
  savePayment = async () => {
    let tr_id = this.state.tr_id;
    let metode_pembayaran_id = this.state.paymentCardText.id;
    let diskon_id = this.state.discountId;
    let nominal_discount;
    if (this.state.discountValue < 1) {
      nominal_discount =
        this.state.totalAwal - this.state.discountValue * this.state.totalAwal;
    } else {
      nominal_discount = this.state.totalAwal - this.state.discountValue;
    }
    let data_metode_pembayaran = {
      media: this.state.paymentCardText.media,
      no_rek: this.state.paymentCardText.no_rek,
    };
    let nominal = this.state.total;

    let dataSend = [];
    if (diskon_id == null) {
      let payment = {
        metode_pembayaran_id: metode_pembayaran_id,
        diskon_id: '0',
        data_metode_pembayaran: data_metode_pembayaran,
        nominal: nominal,
      };
      dataSend.push(payment);
    } else {
      let discount = {
        metode_pembayaran_id: '50',
        diskon_id: diskon_id,
        nominal: nominal_discount,
      };
      let payment = {
        metode_pembayaran_id: metode_pembayaran_id,
        diskon_id: '0',
        data_metode_pembayaran: data_metode_pembayaran,
        nominal: nominal,
      };
      dataSend.push(discount);
      dataSend.push(payment);
    }

    await SavePayment(tr_id, dataSend).then(async res => {
      if (res.data.error) {
        console.log(res.data);
        Alert.alert(
          'Maaf',
          'Saldo tidak mencukupi',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        console.log(res);
        let cabang_id = await GetItem('cabang_id');
        let responsible_id = await GetItem('id_responsible');

        await SetPayment(
          tr_id,
          cabang_id,
          this.state.data.customer.id,
          responsible_id,
          this.state.data.total_kimochi_wallet,
        ).then(async res => {
          if (res.data.error) {
            console.log(res.data.msg);
            Alert.alert(
              'Maaf',
              'Error sistem, silahkan hubungi Pak Wike (Nine Cloud)',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          } else {
            console.log(res);
            this.changeModalVisibility(true);
          }
        });
      }
    });
  };
  componentDidMount = async () => {
    await GetBarangTrId(this.state.tr_id).then(res => {
      if (res.data.error) {
        console.log(res.data.msg);
      } else {
        let price = 0;
        res.data.data.data.map(res => {
          price += Number(Number(res.data_barang.harga) * res.qyt);
        });
        this.setState({
          data: res.data.data,
          totalAwal: price,
          total: price,
        });
      }
    });
  };
  render() {
    let data = this.state.data;
    let discountValue = 'Discount';
    let discountCardText = '';
    if (this.state.discountChoosen) {
      if (this.state.discountValue > 1) {
        discountValue = 'Rp. ' + this.state.discountValue;
      } else {
        discountValue = this.state.discountValue * this.state.totalAwal;
      }

      discountCardText = this.state.discountCardText;
    }
    let couponValue = 'Coupon';
    let couponCardText = '';

    let paymentValue = 'Payment';
    let paymentCardText;
    if (this.state.paymentCardText.length != 0) {
      if (this.state.paymentCardText.type == 'NON-TUNAI') {
        paymentValue = 'NON-TUNAI';
        paymentCardText = (
          <View
            style={{
              flex: 1,
              backgroundColor: '#b4debb',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#cccccc',
              padding: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text>Bank</Text>
              </View>
              <View style={{flex: 2}}>
                <Text>: {this.state.paymentCardText.media}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text>No Rekening</Text>
              </View>
              <View style={{flex: 2}}>
                <Text>: {this.state.paymentCardText.no_rek}</Text>
              </View>
            </View>
          </View>
        );
      }
      if (this.state.paymentCardText.type == 'TUNAI') {
        paymentValue = 'TUNAI';
        paymentCardText = (
          <View
            style={{
              flex: 1,
              backgroundColor: '#b4debb',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#cccccc',
              padding: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text>Cash</Text>
              </View>
              <View style={{flex: 2}}>
                <Text>: Rp.{this.state.paymentCardText.nominal}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text>Kembalian</Text>
              </View>
              <View style={{flex: 2}}>
                <Text>: Rp.{this.state.kembalian}</Text>
              </View>
            </View>
          </View>
        );
      }
    }
    let memberCard;
    let bonusCard = <PaymentCard image={Money} type={'Bonus'} />;
    if (this.state.data != 0) {
      memberCard = (
        <MemberCard
          tr_id={this.state.tr_id}
          total={this.state.totalAwal}
          nama={data.customer.nama_lengkap}
          cst_id={data.customer.id}
          no_hp={data.customer.no_telepon}
          member={data.customer.member}
          kimochi_wallet={data.customer.kimochi_wallet}
        />
      );
      bonusCard = (
        <>
          <PaymentCard
            image={Money}
            type={'Rp.' + this.state.data.total_kimochi_wallet}
          />
          <Text style={{fontSize: 12, color: 'purple'}}>
            Bonus Kimochi Wallet
          </Text>
        </>
      );
    }
    return (
      <>
        {/* <View
          style={[
            {display: this.state.overlayVisible ? 'flex' : 'none', zIndex: 2},
          ]}>
          <View style={[styles.overlay, {zIndex: 2}]}></View>
        </View> */}

        <DetailTop title="Cashier-Payment" />
        <View style={{padding: 10, flex: 1, zIndex: 1}}>
          <ScrollView style={{flex: 1}}>
            {memberCard}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DiscountSheet', {
                  fun: this.chooseDiscount,
                })
              }>
              <PaymentCard image={Discount} type={discountValue} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                color: 'purple',
                display: this.state.discountChoosen ? 'flex' : 'none',
              }}>
              {discountCardText}
            </Text>
            {/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CouponSheet', {
                  function: this.chooseCoupon,
                })
              }>
              <PaymentCard image={Voucher} type={couponValue} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PaymentSheet', {
                  fun: this.choosePayment,
                  total: this.state.total,
                })
              }>
              <PaymentCard image={Bill} type={paymentValue} />
            </TouchableOpacity>
            {paymentCardText}
            {bonusCard}
          </ScrollView>
        </View>

        <PaymentBtn
          total={this.state.total}
          kembalian={this.state.kembalian}
          function={this.savePayment}
        />

        {/* <View
          style={{
            display: this.state.couponVisible ? 'flex' : 'none',
            position: 'relative',
            zIndex: 100,
          }}>
          <CouponSheet function={this.chooseCoupon} close={this.closeOverlay} />
        </View> */}
        <KimochiModal
          opacity={this.state.isModalVisible}
          hide={() => this.changeModalVisibility}
          message={
            'Pembayaran telah berhasil dilakukan \n\n Tolong ingatkan customer untuk mengambil barang'
          }
          icon={Checked}
          option={true}
          function={this.props.navigation.navigate}
          page={'Home'}
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
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={{color: 'purple', fontWeight: 'bold'}}>
              Rp.{props.kimochi_wallet}
            </Text>
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
  } else if (props.type == 'Coupon') {
    bgPayment.backgroundColor = 'purple';
  } else if (props.type == 'Payment') {
    bgPayment.backgroundColor = 'green';
  } else if (props.type == 'Bonus') {
    bgPayment.backgroundColor = 'orange';
  } else if (props.type == 'TUNAI') {
    bgPayment.backgroundColor = 'green';
  } else if (props.type == 'NON-TUNAI') {
    bgPayment.backgroundColor = 'green';
  } else {
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
