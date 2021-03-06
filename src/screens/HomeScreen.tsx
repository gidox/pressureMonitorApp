import React from 'react';
import { Component } from 'react';
import { View, Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Text, Title, ActivityIndicator, Button, Subheading } from 'react-native-paper';
import { Container, Content, Icon} from 'native-base';
import { firebase } from '@react-native-firebase/firestore';
import { Button as PaperButton, Paragraph, Dialog, Portal } from 'react-native-paper';
import { connect } from 'react-redux';
import SignupSheet from '../components/SignupSheet';
import { setUserData } from '../actions/user';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  AdMobBanner,
  AdMobRewarded,
  AdMobInterstitial,
  PublisherBanner,
} from 'react-native-admob';
import i18n from '../translations/i18n';

const locale = i18n.currentLocale().split('-')[0];
const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height; 

const BannerExample = ({ style, title, children, ...props }) => (
  <View {...props} style={[styles.example, style]}>
    <Text style={styles.title}>{title}</Text>
    <View style={{ alignItems: 'center'}}>
      {children}
    </View>
  </View>
);

const bannerWidths = [200, 250, 320];
const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 30 : 10,
  },
  example: {
    paddingVertical: 3,
  },
  title: {
    margin: 10,
    fontSize: 20,
  },
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
      pulse: '',
      date: '',
      loading: false,
      signupVisible: false,
      modalVisible: false,
      isDateTimePickerVisible: false
    };
    this.ref = firebase.firestore().collection('pressuremeditions');
  }

  async componentDidMount() {
    const querySnapshot = await this.ref.get();

 
  }



  showDateTimePicker = () => {
    console.log("tap")
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ date });
    this.hideDateTimePicker();
  };
  
  addTodo() {
    const { dia, sys, pulse, date } = this.state;
    const { user } = this.props;
    this.setState({ loading: true }, () => { 
      this.ref.add({
        dia,
        sys,
        uid: user.data.uid,
        pulse,
        created_at: !date || date === '' ? moment(new Date).format(): moment(date).format(),
      });
      setTimeout(() => {
        this.setState({
          dia: '',
          sys: '',
          date: '',
          pulse: '',
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
      loading, dia, sys, modalVisible, signupVisible, pulse, date
    } = this.state;
    const { 
      user, setUserData
    } = this.props;
    const widthPad = width / 4;
    const marginTopHeader = 20; 
    const headerWidth =  width / 2 - 40; 

    return (
      <Container>


        <SignupSheet
          isVisible={signupVisible}
          onSwipeComplete={() => this.setState({ signupVisible: false })}
          dismiss={() => this.setState({ signupVisible: false })}
          swipeDirection={['up', 'left', 'right', 'down']}
          setUserData={setUserData}
          createPressure={() => this.addTodo()}
        />
        <DateTimePicker
          mode='datetime'
          locale={locale}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
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

          {user && user.data && user.data.displayName && (
            <Title style={{ textAlign: 'center'}}>{i18n.t('hi')} {user.data.displayName}, {i18n.t('howisyourblood')}</Title>
            
          )}

          {!user || !user.data || !user.data.displayName && (
            <Title style={{ textAlign: 'center'}}>{`${i18n.t('hi')}, ${i18n.t('howisyourblood')}`}</Title>
            
          )}
          {loading && (
             <ActivityIndicator animating={true} />
          )}
          {!loading && (
            <View
            
            >
              <View style={{ marginHorizontal: widthPad, marginTop: marginTopHeader, marginBottom: 15}}>
                <TextInput
                  mode="outlined"
                  label='SYS(MmHg)'
                  value={sys}
                  style={{ fontSize: 30, height: 70, textAlign: 'center' }}
                  dense={true}
                  returnKeyType='next'
                  maxLength={3}
                  keyboardType='phone-pad'
                  onChangeText={text => this.setState({ sys: text })}
                />

              </View>
              <View style={{ marginHorizontal: widthPad, marginTop: 10, marginBottom: 15}}>
                <TextInput
                  mode="outlined"
                  label='DIA(MmHg)'
                  style={{ fontSize: 30, height: 70, textAlign: 'center' }}
                  value={dia}
                  returnKeyType='next'
                  maxLength={3}
                  keyboardType='phone-pad'
                  onChangeText={text => this.setState({ dia: text })}
                />

              </View>
              <View style={{ marginHorizontal: widthPad, marginTop: 10, marginBottom: 15}}>
                <TextInput
                  mode="outlined"
                  label={i18n.t('pulse')}
                  keyboardType='phone-pad'
                  style={{ fontSize: 30, height: 70, textAlign: 'center' }}
                  value={pulse}
                  returnKeyType='done'
                  maxLength={3}
                  onChangeText={text => this.setState({ pulse: text })}
                />

              </View>

              <Button  mode="text" onPress={() => { this.showDateTimePicker()}}>
                {i18n.t('previousDate')}
              </Button>
              


              <View
                style={{ flexDirection: 'row', flex: 5, justifyContent: 'center', marginTop: 30 }}
              >
                <Button 
                  icon="camera" 
                  mode="contained" 
                  onPress={() => {
                    if (!user || !user.data || !user.data.uid) {
                      this.setState({ signupVisible: true });
                    } else {
                      this.addTodo()
                    }
                  }}
                  disabled={sys === '' || dia === ''}
                >
                  {i18n.t('send')}
                </Button>
                              


              </View>
            
              {date && date !== '' ? (
                <View>
                  <Text style={{ textAlign: 'center', fontSize: 16}}>{`Fecha Seleccionada: ${moment(date).format('DD-MM-YYYY hh:mm a')}`}</Text>

                </View>

              ): null}

              <BannerExample>
                <AdMobBanner
                  adSize="banner"
                  adUnitID="ca-app-pub-4138005863181000/4391422023"
                  testDevices={[AdMobBanner.simulatorId]}
                  onAdFailedToLoad={error => console.log(error)}
                  
                />

              </BannerExample>

  
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

