import React, {Component} from 'react';
import {View, Text, Picker, StyleSheet, TextInput} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import SheetTitle from './SheetTitle';

export default class PaymentSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: '',
      nominal: '',
      kembalian: '',
    };
  }

  render() {
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
          <SheetTitle title="Payment" close={this.props.close} />
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
              padding: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  alignItems: 'flex-start',

                  flex: 1,
                }}>
                <Text style={{fontWeight: 'bold'}}>Method</Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',

                  flex: 1,
                }}>
                <Text style={{fontWeight: 'bold'}}>Tunai / Non Tunai</Text>
              </View>
            </View>
            <Picker
              style={styles.input}
              selectedValue={this.state.method}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({method: itemValue})
              }>
              <Picker.Item label="Tunai" value="Tunai" />
              <Picker.Item label="Non-tunai" value="Non-tunai" />
            </Picker>
            <View>
              <Text style={{fontWeight: 'bold'}}>Nominal</Text>
              <TextInput
                value={this.state.nominal}
                onChangeText={value => this.setState({nominal: value})}
              />
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    borderRadius: 20,
    borderColor: '#cccccc',
    borderWidth: 1,

    paddingHorizontal: 10,
  },
});
