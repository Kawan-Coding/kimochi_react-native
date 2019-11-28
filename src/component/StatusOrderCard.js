import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import avatar from '../assets/img/man.png';
import {GetCustomer} from '../config/service/Customer';
import {BaseUrlPhoto} from '../config/service/Template';
export class StatusOrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      data: [],
    };
  }
  componentDidMount = async () => {
    await GetCustomer(this.state.id).then(res => {
      if (res.data.error) {
        console.log(res.data.msg);
      }
      this.setState({data: res.data.data});
    });
  };
  render() {
    let data;
    let foto = 'cia';
    if (this.state.data.length == 0) {
      data = {
        nama_lengkap: '',
        foto: 'cia',
        no_telepon: '',
        history_transaksi: '',
        member: '',
      };
    } else {
      data = this.state.data;

      foto = BaseUrlPhoto + data.foto;
    }

    return (
      <>
        <View style={styles.cardWrap}>
          <View style={styles.statusCard}>
            <View style={styles.headerItemsRound}>
              <Image source={{uri: foto}} style={styles.avatar} />
            </View>
            <View style={styles.cardContent}>
              <Text style={{color: 'white', fontSize: 18}}>
                {data.nama_lengkap}
              </Text>
              <Text style={{color: 'white'}}>{data.no_telepon}</Text>
              <View style={styles.contentInner}>
                <View style={{flex: 1}}>
                  <Text style={{color: 'black'}}>History Transaksi</Text>
                  <Text style={styles.textContent}>
                    {data.history_transaksi}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{color: 'black'}}>Status Member</Text>
                  <Text style={styles.textContent}>{data.member}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

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
export default StatusOrderCard;
