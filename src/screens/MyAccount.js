import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View } from 'react-native'
import { Icon, Container, Content } from 'native-base';
import { Button, Avatar, Title } from 'react-native-paper';
import {  LoginManager } from "react-native-fbsdk";
import { logout } from '../actions/user';


class MyAccount extends Component {
  static navigationOptions = {
    header: null,
    tabBarColor: '#c23616',
    tabBarIcon: (<Icon name='person' style={{ color: '#FFF'}} />),

  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  logout = () => {
    const { logout } = this.props;
    logout();
    LoginManager.logOut();
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        <Content>
          <SafeAreaView/> 
          {!user.data || !user.data.uid && (
            <View>
              <Title>Log in for view your pressures.</Title>


            </View>

          )}
          
          {user.data && user.data.uid && (
            <View>
              <View style={{ alignItems: 'center', }}>
                <Avatar.Image size={200} source={{ uri: user.data.fbPic}} />
                <Title>Hola {user.data.displayName}</Title>
                                

              </View>
                              
                              
              <Button onPress={() => this.logout()}>
                logout
              </Button>

            </View>

          )}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.default.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: data => dispatch(logout(data)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
