import React, {Component} from 'react';

import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import DetailTop from '../../../component/DetailTop';
import StatusOrderCard from '../../../component/StatusOrderCard';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import shoppingCart from '../../../assets/img/shoppingCart.png';
import {GetDataBarang} from '../../../config/service/Customer';
import {BaseUrlPhoto} from '../../../config/service/Template';

export default class CustomerOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataView: [],
      dataSend: [],
      tabStatus: true,
      customer_id: '8',
    };
  }
  merge_arr = data => {
    let tmp_found = [];
    let res = [];
    data.forEach(element => {
      if (tmp_found.includes(element.barang_id)) {
      } else {
        //MAKE ARRAY
        let tmp_qyt = this.is_exist(element.barang_id, data);

        res.push({barang_id: element.barang_id, qyt: tmp_qyt});
        tmp_found.push(element.barang_id);
      }
    });
    return res;
  };
  is_exist = (find, arr) => {
    let tmp_qyt = 0;
    arr.forEach(element => {
      if (element.barang_id == find) {
        tmp_qyt += element.qyt;
      }
    });
    return tmp_qyt;
  };

  changeTabStatus = bool => {
    this.setState({tabStatus: bool});
  };
  dataSendHandlerCuci = val => {
    this.addDataSend(val);
    this.updateQytDataView('cuci_helm', val);
  };
  dataSendHandlerAksesoris = val => {
    if (this.state.dataSend.length != 0) {
      if (this.isDataAksesorisExist(val)) {
        console.log('masuk exist');
        this.updateDataSend(val);
        this.updateQytDataView('aksesoris', val);
      } else {
        this.addDataSend(val);
        this.updateQytDataView('aksesoris', val);
      }
    } else {
      this.addDataSend(val);
      this.updateQytDataView('aksesoris', val);
    }
  };
  addDataSend = val => {
    let dataSend = this.state.dataSend;

    dataSend.push(val);

    this.setState({dataSend: dataSend});
  };
  updateDataSend = val => {
    let dataSend = this.state.dataSend;
    dataSend.map((res, index) => {
      if (val.barang_id == res.barang_id) {
        dataSend.splice(index, 1);
        this.addDataSend(val);
      }
    });
  };
  isDataAksesorisExist = val => {
    let dataSend = this.state.dataSend;
    let status = false;
    dataSend.map(res => {
      if (val.barang_id == res.barang_id) {
        status = true;
      }
    });
    return status;
  };
  getObjectQyt = val => {
    let dataQyt = [];
    val.map(res => {});
  };
  updateQytDataView = (type, val) => {
    console.log(this.state.dataSend);
    let dataView = this.state.dataView;
    if (type == 'cuci_helm') {
      let dataChange = this.merge_arr(this.state.dataSend);

      dataChange.map((resChange, index) => {
        dataView.cuci_helm.map((res, index) => {
          if (resChange.barang_id == res.id) {
            dataView.cuci_helm[index].qyt = resChange.qyt;
            this.setState({dataView: dataView});
          }
        });
      });
    } else {
      dataView.aksesoris.map((res, index) => {
        if (val.barang_id == res.id) {
          dataView.aksesoris[index].qyt = val.qyt;
          this.setState({dataView: dataView});
        }
      });
    }
  };
  getCount = () => {
    let count = 0;
    if (this.state.dataSend.length != 0) {
      this.state.dataSend.map(res => {
        count += res.qyt;

        // console.log(res.qyt);
      });
    }

    return count;
  };
  cartResult = () => {
    if (this.getCount() == 0) {
      Alert.alert(
        'Maaf',
        'Silahkan pilih barang terlebih dahulu',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      let dataSend = this.state.dataSend;
      let dataView = this.state.dataView;
      dataSend = this.zeroFilter(dataSend);
      console.log(dataSend);
      this.props.navigation.navigate('ShoppingCart', {
        dataView: dataView,
        dataSend: dataSend,
        customer_id: this.state.customer_id,
      });
    }
  };
  zeroFilter = arr => {
    let data = arr;
    arr.map((res, index) => {
      if (res.qyt == 0) {
        data.splice(index, 1);
      }
    });
    return data;
  };
  componentDidMount = async () => {
    await GetDataBarang().then(res => {
      console.log(res.data);
      if (res.data.error) {
        console.log('API error');
      } else {
        this.setState({dataView: res.data.data});
      }
    });
  };
  render() {
    let count;
    if (this.state.dataSend.length != 0) {
      let qyt = this.getCount();
      if (qyt != 0) {
        count = (
          <>
            <View
              style={{
                position: 'absolute',
                right: -5,
                top: -10,
                backgroundColor: 'red',
                width: 22,
                height: 22,
                borderRadius: 50,

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 10}}>{qyt}</Text>
            </View>
          </>
        );
      }
    }
    let serviceCard;
    if (this.state.dataView.length != 0) {
      if (this.state.tabStatus) {
        serviceCard = this.state.dataView.cuci_helm.map(res => {
          return (
            <ServiceCard
              title={res.nama}
              detail={res.detail}
              price={res.harga}
              link={this.props.navigation.navigate}
              page={'CuciHelm'}
              params={res.id}
              key={res.id}
              qyt={res.qyt}
              image={BaseUrlPhoto + res.foto}
              fun={this.dataSendHandlerCuci}
            />
          );
        });
      } else {
        serviceCard = this.state.dataView.aksesoris.map(res => {
          return (
            <ServiceCard
              title={res.nama}
              detail={res.detail}
              price={res.harga}
              link={this.props.navigation.navigate}
              page={'Aksesoris'}
              params={res.id}
              key={res.id}
              qyt={res.qyt}
              image={BaseUrlPhoto + res.foto}
              fun={this.dataSendHandlerAksesoris}
            />
          );
        });
      }
    }

    return (
      <>
        <DetailTop title="ORDER" />
        <StatusOrderCard id={this.state.customer_id} />
        <View style={styles.container}>
          <View>
            <Text style={{fontWeight: 'bold'}}>KIMOCHI SERVICE</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',

              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => this.changeTabStatus(true)}>
                <View
                  style={[
                    styles.orderTab,
                    {marginRight: 5},
                    this.state.tabStatus
                      ? {backgroundColor: '#43Af4A'}
                      : {backgroundColor: 'white'},
                  ]}>
                  <Text
                    style={[
                      {fontSize: 12},
                      this.state.tabStatus
                        ? {color: 'white'}
                        : {color: '#43Af4A'},
                    ]}>
                    Cuci helm
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeTabStatus(false)}>
                <View
                  style={[
                    styles.orderTab,
                    this.state.tabStatus
                      ? {backgroundColor: 'white'}
                      : {backgroundColor: '#43Af4A'},
                  ]}>
                  <Text
                    style={[
                      {fontSize: 12},
                      this.state.tabStatus
                        ? {color: '#43Af4A'}
                        : {color: 'white'},
                    ]}>
                    Aksesoris
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{padding: 20}}
                onPress={() => this.cartResult()}>
                <View style={styles.cardIcon}>
                  {count}
                  <Image source={shoppingCart} style={styles.cartIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{flex: 1}}>{serviceCard}</ScrollView>
        </View>
      </>
    );
  }
}

const ServiceCard = props => {
  return (
    <>
      <View style={styles.serviceCard}>
        <View
          style={{
            flex: 1,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.serviceCardImage}>
            <Image source={{uri: props.image}} style={styles.serviceCardIcon} />
          </View>
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>
              {props.title}
            </Text>
            <Text style={{fontSize: 12, marginVertical: 5}}>
              {props.detail}
            </Text>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#fB5516'}}>
              RP. {props.price}
            </Text>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() =>
                props.link(props.page, {
                  barang_id: props.params,
                  qyt: props.qyt,
                  jenis_helm: props.title,
                  fun: props.fun,
                  title: props.title,
                  detail: props.detail,
                  image: props.image,
                  price: props.price,
                })
              }>
              <View style={styles.serviceCardBtn}>
                <Text
                  style={{color: '#43Af4A', fontSize: 11, fontWeight: 'bold'}}>
                  {props.qyt == 0 ? 'Order' : props.qyt}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
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
  orderTab: {
    width: 100,
    borderColor: '#43Af4A',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    padding: 3,
  },
  cardIcon: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  cartIcon: {
    width: 22,
    height: 19,
  },
  serviceCard: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 5,
  },
  serviceCardImage: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceCardIcon: {
    width: 90,
    height: 90,
  },
  serviceCardBtn: {
    padding: 3,
    borderWidth: 1,
    borderColor: '#43Af4A',
    borderRadius: 10,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
