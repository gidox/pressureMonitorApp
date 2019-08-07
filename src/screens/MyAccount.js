import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { Button } from 'react-native-paper';
import {  LoginManager } from "react-native-fbsdk";

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
  logout = () => {
    LoginManager.logOut();
  }

  render() {
    return (
      <Container>
        <Content>
                          <Button 
                  icon="camera" 
                  mode="contained" 
                  style={{ paddingVertical: 10}} 
onPress={() => this.logout()}
                >
                  Enviar
                </Button>
          <Button onPress={() => this.logout()}>
            logout
          </Button>
        </Content>
      </Container>
    );
  }
}
