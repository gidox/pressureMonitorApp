import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setUserData } from '../actions/user';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  async componentWillMount() {
    const {
      navigation, setUserData
    } = this.props;
    try {
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          "Something went wrong obtaining the users access token"
        );
      }

      // create a new firebase credential with the token
      const credential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await auth()
        .signInWithCredential(credential);

      setUserData(firebaseUserCredential.user.toJSON());

      navigation.navigate('AppDrawer');

    } catch (e) {
      console.error(e);
      navigation.navigate('AppDrawer');

    }
  }


  render() {
    return (
      <View>
        <Text> Splash </Text>
      </View>
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
    setUserData: data => dispatch(setUserData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
