import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import Modal from 'react-native-modal';
import { Title } from 'react-native-paper';

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
})

export default class SignupSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      isVisible, onSwipeComplete, bottomModal, dismiss
    } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        onSwipeComplete={() => onSwipeComplete()}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.bottomModal}
      >
      <View style={styles.content}>
        <Title style={{ }}>Log In</Title>
        <Button
          onPress={() => dismiss()}
          title="Close"
        />
      </View>
      </Modal>
    );
  }
}
