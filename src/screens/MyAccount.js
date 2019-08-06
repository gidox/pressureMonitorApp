import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

export default class MyAccount extends Component {
  static navigationOptions = {
    header: null,
    tabBarColor: '#c51162',
    tabBarIcon: (<Icon name='person' style={{ color: '#FFF'}} />),

  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> MyAccount </Text>
      </View>
    );
  }
}
