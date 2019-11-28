import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import DetailTop from '../../../component/DetailTop';
import avatar from '../../../assets/img/man.png';
import checked from '../../../assets/img/checked.png';
import cancel from '../../../assets/img/cancel.png';
import {ListBottom, ListTop} from '../../../component/Bill';
import {GetBarangTrId} from '../../../config/service/Barang';
import {SetFinish} from '../../../config/service/Transaction';

import {IndonesiaDate} from '../../../config/utilities/IndonesiaDate';
import KimochiModal from '../../../component/KimochiModal';

let date = IndonesiaDate(new Date());
export default class StatusOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tr_id: this.props.navigation.state.params.tr_id,
      transaction_status: this.props.navigation.state.params.transaction_status,
      process_status: null,
      data: [],
      total: null,
      isModalVisible: false,
    };
  }
  componentDidMount = async () => {
    await GetBarangTrId(this.state.tr_id).then(res => {
      console.log(res.data.data);
      if (res.data.error) {
        console.log(res.data.msg);
      } else {
        console.log(res);
        let price = 0;
        res.data.data.data.map(res => {
          price += Number(res.data_barang.harga);
        });
        this.setState({
          data: res.data.data,
          total: price,
          process_status: res.data.data.dll.status_produksi,
        });
      }
    });
  };
  displayModal = bool => {
    this.setState({isModalVisible: bool});
  };
  confirmBtn = () => {
    this.props.navigation.push('Order');
  };
  saveTransaction = async () => {
    if (this.state.process_status == 'process') {
      await SetFinish(this.state.tr_id).then(res => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.msg);
        } else {
          this.displayModal(true);
        }
      });
    } else {
      this.displayModal(true);
    }
  };
  render() {
    let data;
    let orderList;
    let kimochiModal;
    let saveBtn;

    if (this.state.data.length != 0) {
      data = this.state.data;
      console.log(data);
      let kimochiModal;
      let transaction_status = this.state.transaction_status;
      if (
        data.dll.status_produksi == 'process' &&
        transaction_status == 'unpaid'
      ) {
        kimochiModal = (
          <KimochiModal
            opacity={this.state.isModalVisible}
            hide={this.changeModalVisibility}
            message={
              'Proses cuci helm telah selesai, tetapi customer belum melakukan pembayaran \n\n Silahkan informasikan kepada customer untuk segera melakukan pembayaran'
            }
            icon={checked}
            option={false}
            function={this.confirmBtn}
          />
        );
        saveBtn = (
          <TouchableOpacity onPress={() => this.saveTransaction()}>
            <BtnConfirm title={'Selesai'} />
          </TouchableOpacity>
        );
      }
      if (
        data.dll.status_produksi == 'finish' &&
        transaction_status == 'unpaid'
      ) {
        kimochiModal = (
          <KimochiModal
            opacity={this.state.isModalVisible}
            hide={this.changeModalVisibility}
            message={
              'Customer belum melakukan pembayaran, barang tidak bisa diambil \n\n Silahkan informasikan kepada customer untuk segera melakukan pembayaran'
            }
            icon={cancel}
            option={false}
            function={this.confirmBtn}
          />
        );
        saveBtn = (
          <TouchableOpacity onPress={() => this.saveTransaction()}>
            <BtnConfirm title={'Serah Terima'} />
          </TouchableOpacity>
        );
      }
      if (
        data.dll.status_produksi == 'process' &&
        transaction_status == 'paid'
      ) {
        kimochiModal = (
          <KimochiModal
            opacity={this.state.isModalVisible}
            hide={this.changeModalVisibility}
            message={
              'Proses cuci helm telah selesai\n\nSilahkan informasikan kepada customer untuk segera melakukan pengambilan'
            }
            icon={checked}
            option={false}
            function={this.confirmBtn}
          />
        );
        saveBtn = (
          <TouchableOpacity onPress={() => this.saveTransaction()}>
            <BtnConfirm title={'Selesai'} />
          </TouchableOpacity>
        );
      }
      if (
        data.dll.status_produksi == 'finish' &&
        transaction_status == 'paid'
      ) {
        kimochiModal = (
          <KimochiModal
            opacity={this.state.isModalVisible}
            hide={this.changeModalVisibility}
            message={
              'Anda akan memberikan helm customer yang telah selesai dicuci\n\n Apakah anda yakin?'
            }
            icon={checked}
            option={false}
            function={this.confirmBtn}
          />
        );
        saveBtn = (
          <TouchableOpacity onPress={() => this.saveTransaction()}>
            <BtnConfirm title={'Serah terima'} />
          </TouchableOpacity>
        );
      }
      return (
        <>
          <DetailTop title={'Status Order - Proses'} />
          <StatusOrderCard
            name={data.customer.nama_lengkap}
            number={data.customer.no_telepon}
            history={data.customer.history_transaksi}
            member={data.customer.member}
          />
          <ScrollView>
            <View style={{paddingHorizontal: 20, marginVertical: 20, flex: 1}}>
              <OrderList
                data={data}
                status={this.state.transaction_status}
                tr_id={this.state.tr_id}
                wallet={data.customer.kimochi_wallet}
                total={this.state.total}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              {saveBtn}
            </View>
          </ScrollView>
          {kimochiModal}
        </>
      );
    } else {
      return (
        <>
          <DetailTop title={'Status Order - Proses'} />
        </>
      );
    }
  }
}

const StatusOrderCard = props => {
  return (
    <>
      <View style={styles.cardWrap}>
        <View style={styles.statusCard}>
          <View style={styles.headerItemsRound}>
            <Image source={avatar} style={styles.avatar} />
          </View>
          <View style={styles.cardContent}>
            <Text style={{color: 'white', fontSize: 18}}>{props.name}</Text>
            <Text style={{color: 'white'}}>{props.number}</Text>
            <View style={styles.contentInner}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>History Transaksi</Text>
                <Text style={styles.textContent}>{props.history}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>Status Member</Text>
                <Text style={styles.textContent}>{props.member}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const OrderList = props => {
  let status;
  if (props.status == 'unpaid') {
    status = (
      <Text style={[styles.status, {flex: 1, backgroundColor: 'red'}]}>
        Unpaid
      </Text>
    );
  } else {
    status = (
      <Text style={[styles.status, {flex: 1, backgroundColor: '#43Af4A'}]}>
        Paid
      </Text>
    );
  }
  let date = IndonesiaDate(new Date(props.data.dll.create_at));
  let data = props.data;
  let listBarang;

  listBarang = data.data.map((res, index) => {
    return (
      <>
        <ListBottom
          title={res.data_barang.nama}
          amount={res.qyt}
          price={res.data_barang.harga}
          key={index + 's'}
        />
      </>
    );
  });
  let data_customer = data.customer;
  return (
    <>
      <View style={styles.listTop}>
        <Text style={{flex: 2, fontWeight: 'bold'}}>ORDER LIST</Text>
        {status}
      </View>
      <View
        style={[styles.cardWrap, {borderStyle: 'dotted', paddingBottom: 15}]}>
        <ListTop
          title={'' + date.tanggal + ' ' + date.bulan + ' ' + date.tahun}
          content={props.tr_id}
        />
        <ListTop
          title={data_customer.nama_lengkap}
          content={data_customer.no_telepon}
        />
        <ListTop title={data_customer.email} content={data_customer.member} />

        <ListTop title={'Kimochi Wallet -- ' + props.wallet} />
      </View>
      <View style={[styles.cardWrap, {paddingVertical: 15}]}>
        {listBarang}
        <ListBottom title={'Sub total'} price={props.total} bold={true} />
      </View>
    </>
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
  cardWrap: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  statusCard: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#43Af4A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  listTop: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  status: {
    paddingHorizontal: 2,
    paddingVertical: 4,
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 12,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  headerItemsRound: {
    borderRadius: 40,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  avatar: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  contentInner: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  textContent: {
    color: '#fB5516',
    fontWeight: 'bold',
  },
});
