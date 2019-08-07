import React, { Component } from 'react';
import { View, Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Text, Title, ActivityIndicator, Button } from 'react-native-paper';
import { Container, Content, Icon} from 'native-base';
import { firebase } from '@react-native-firebase/firestore';
import { Button as PaperButton, Paragraph, Dialog, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import SignupSheet from '../components/SignupSheet';
import { setUserData } from '../actions/user';
import moment from 'moment';

const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height; 

const styles = StyleSheet.create({

})
class HomeScreen extends Component {
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

  async componentDidMount() {
    const querySnapshot = await this.ref.get();
      
    console.log('Total users', querySnapshot.size);
    console.log('User Documents', querySnapshot.docs);
    console.log('User Documents2', querySnapshot.data);

  }

  addTodo() {
    const { dia, sys } = this.state;
    const { user } = this.props;
    this.setState({ loading: true }, () => { 
      this.ref.add({
        dia,
        sys,
        uid: user.data.uid,
        created_at: moment(new Date).format(),
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

  render() {
    const {
      loading, dia, sys, modalVisible, signupVisible
    } = this.state;
    const { 
      user, setUserData
    } = this.props;
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
          setUserData={setUserData}
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

          {user && user.data && (
            <Title style={{ textAlign: 'center'}}>Hola {user.data.displayName}, como esta tu presion hoy?</Title>
            
          )}

          {!user || !user.data && (
            <Title style={{ textAlign: 'center'}}>Como esta tu presion hoy?</Title>
            
          )}
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
                    if (!user || !user.data || !user.data.uid) {
                      this.setState({ signupVisible: true });
                    } else {
                      this.addTodo()
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

