import React, {Component} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';

import Deal from '../../../assets/img/deal.jpg';
import DetailTop from '../../../component/DetailTop';
import {GetSingleNotif} from '../../../config/service/Notification';

export default class NotifDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount = async () => {
    let id = await this.props.navigation.state.params.id;
    await GetSingleNotif(id).then(res => {
      this.setState({data: res});
    });
  };
  render() {
    let title;
    let image;
    let content;
    if (this.state.data.length != 0) {
      let data = this.state.data.data.data;
      title = data.judul;
      image = data.foto;
      content = data.detail;
    }
    return (
      <>
        <DetailTop title={title} />
        <ScrollView>
          <View>
            <Image
              source={{
                uri: 'https://kawankoding.kampungbudaya.com/uploads/' + image,
              }}
              style={{width: '100%', height: 300}}
            />
            <Text style={styles.notifContent}>{content}</Text>
          </View>
        </ScrollView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  notifContent: {
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
