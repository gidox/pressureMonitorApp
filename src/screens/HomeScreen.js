import React, { Component } from 'react';
import { View, Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Text, Title, ActivityIndicator, Button } from 'react-native-paper';
import { Container, Content, Icon} from 'native-base';
import { firebase } from '@react-native-firebase/firestore';
import { Button as PaperButton, Paragraph, Dialog, Portal } from 'react-native-paper';
import SignupSheet from '../components/SignupSheet';
const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height; 

const styles = StyleSheet.create({

})

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarColor: '#694fad',
    tabBarIcon: (<Icon name='home' style={{ color: '#FFF'}} />),

  };
  constructor(props) {
    super(props);
    this.state = {
      dia: '',
      sys: '',
      loading: false,
      signupVisible: false,
      modalVisible: false,
    };
    this.ref = firebase.firestore().collection('pressuremeditions');
  }
    bs = React.createRef()
  async componentDidMount() {
    const querySnapshot = await firebase.firestore()
      .collection('users')
      .get();
      
    console.log('Total users', querySnapshot.size);
    console.log('User Documents', querySnapshot.docs);
  }

  addTodo() {
    this.setState({ loading: true }, () => { 
      this.ref.add({
        dia: this.state.dia,
        sys: this.state.sys,
      });
      setTimeout(() => {
        this.setState({
          dia: '',
          sys: '',
          loading: false,
          modalVisible: true
        });

      }, 4000)

    });
  }

  _hideDialog = () => {
    this.setState({ modalVisible: false })
  }
  renderInner = () => (
    <View >
      <Text >San Francisco Airport</Text>
      <Text >
        International Airport - 40 miles away
      </Text>
      <View >
        <Text >Directions</Text>
      </View>
      <View >
        <Text >Search Nearby</Text>
      </View>

    </View>
  )

  renderHeader = () => (
    <View >
      <View >
        <View  />
      </View>
    </View>
  )
  render() {
    const {
      loading, dia, sys, modalVisible, signupVisible
    } = this.state;
    const widthPad = width / 4;
    const marginTopHeader = height / 18; 
    const headerWidth =  width / 2; 

    return (
      <Container>
        <SignupSheet
          isVisible={signupVisible}
          onSwipeComplete={() => this.setState({ signupVisible: false })}
          dismiss={() => this.setState({ signupVisible: false })}
          swipeDirection={['up', 'left', 'right', 'down']}
        />


        <Content padder>
          <Portal>
            <Dialog
              visible={modalVisible}
              onDismiss={this._hideDialog}>
              <Dialog.Title>Success</Dialog.Title>
              <Dialog.Content>
                <Paragraph>pressure saved</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton onPress={this._hideDialog}>Done</PaperButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
         
          <SafeAreaView style={{ alignItems: 'center'}}>

            <Image resizeMode='contain' source={require('../../assets/logo.png')} style={{ width:headerWidth  }}/>

          </SafeAreaView>

          <Title style={{ textAlign: 'center'}}>Como esta tu presion hoy? </Title>
          {loading && (
             <ActivityIndicator animating={true} />
          )}
          {!loading && (
            <View
            
            >
              <View style={{ marginHorizontal: widthPad, marginTop: marginTopHeader, marginBottom: 30}}>
                <TextInput
                  mode="outlined"
                  label='SYS(MmHg'
                  value={sys}
                  style={{ fontSize: 30, height: 80, textAlign: 'center' }}
                  dense={true}
                  onChangeText={text => this.setState({ sys: text })}
                />

              </View>
              <View style={{ marginHorizontal: widthPad, marginTop: 10, marginBottom: 30}}>
                <TextInput
                  mode="outlined"
                  label='DIA(MmHg)'
                  style={{ fontSize: 30, height: 80, textAlign: 'center' }}
                  value={dia}
                  onChangeText={text => this.setState({ dia: text })}
                />

              </View>
              <View
                style={{ flexDirection: 'row', flex: 5, justifyContent: 'center'}}
              >
                <Button 
                  icon="camera" 
                  mode="contained" 
                  style={{ paddingVertical: 10}} 
                  onPress={() => {
                    this.setState({ signupVisible: true });
                    // this.bs.current.snapTo(0)
                    // this.addTodo()
                  }}
                  disabled={sys === '' || dia === ''}
                >
                  Enviar
                </Button>

              </View>
            

            </View>

          

          )}
        </Content>

      </Container>

    );
  }
}
