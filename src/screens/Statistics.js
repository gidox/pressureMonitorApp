import React, { Component } from 'react';
import { View,t, SafeAreaView } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { Button, Title, Paragraph, Card, Avatar, Text, Subheading, Menu, Divider } from 'react-native-paper';
import { firebase } from '@react-native-firebase/firestore';
import _ from 'lodash';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import { connect } from 'react-redux';
import Chart from '../components/Chart';

class Statistics extends Component {
  static navigationOptions = {
    header: null,
    tabBarColor: '#c51162',
    tabBarIcon: (<Icon name='ios-stats' type='Ionicons' style={{ color: '#FFF'}} />),

  };
  constructor(props) {
    super(props);
    this.state = {
      pressures: [],
      mode: 'sys',
      visible: false,
    };
    if (props.user.data && props.user.data.uid) {
      this.ref = firebase.firestore().collection('pressuremeditions').where("uid", "==", props.user.data.uid);

    }
  }

  componentDidMount() {
    //if temporal
    const { user } = this.props;
    if (user.data && user.data.uid) {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    
    }
  }
  componentWillReceiveProps() {
    const { user } = this.props;
    if (user.data && user.data.uid) {
      this.ref = firebase.firestore().collection('pressuremeditions').where("uid", "==", user.data.uid);

    }
  }

  _openMenu = () => this.setState({ visible: true });
  _closeMenu = () => this.setState({ visible: false });

  onCollectionUpdate = (querySnapshot) => {
    const pressures = [];
    querySnapshot.forEach((doc) => {
      const { dia, sys, created_at, uid } = doc.data();
      pressures.push({
        key: doc.id,
        dia, // DocumentSnapshot
        sys,
        created_at,
        uid,
      });
    });
    if (!_.isEmpty(pressures)) {
      const sortedArray = _.orderBy(pressures, (o) => {
        return moment(o.created_at).format('YYYYMMDD');
      }, ['asc']);
      this.setState({
        pressures: sortedArray,
        isLoading: false,
      });

    }
  }

  render() {
    console.log(this.state);
    const { pressures, mode } = this.state;
    const { user } = this.props;
    if (user.data && user.data.uid) {
      return (
        <Container>
          <Content padder style={{ backgroundColor: '#eaeaea' }}>
            <SafeAreaView>
              <Title style={{ fontSize: 20, marginBottom: 20, }}>Tus mediciones pasadas:</Title>
            </SafeAreaView>
            <Menu
              visible={this.state.visible}
              onDismiss={this._closeMenu}
              anchor={
                <Button onPress={this._openMenu}>{mode}</Button>
              }
            >
              <Menu.Item onPress={() => this.setState({ mode: 'sys', visible: false })} title="SYS" />
              <Divider />
              <Menu.Item onPress={() => this.setState({ mode: 'dia', visible: false })} title="DIA" />
            </Menu>
            <Chart 
              pressures={pressures}
              mode={mode}
            />
            <Divider />


            {!pressures ||  _.isEmpty(pressures) && (
              <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                <Text>No data found. Please add data</Text>
              </View>

            )}
            {pressures &&  !_.isEmpty(pressures) && (
              <FlatList
                data={pressures}
                ItemSeparatorComponent={() => (<View style={{ marginVertical: 5, marginTop: 10 }} />)}
                renderItem={({item}) => (
                  <Card>
                    <Card.Title title={moment(item.created_at).format('DD-MM-YYYY')} subtitle={moment(item.created_at).format('hh:mm a')} left={(props) => <Avatar.Icon {...props} icon='favorite' style={{ backgroundColor: "#c23616"}} />} />
                    <Card.Content>
                      {/* <Title>Medicion</Title> */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{ alignItems: 'center' }}>
                          <Subheading></Subheading>
                          <Text style={{ fontSize: 24, fontWeight: 'bold', }}>SYS</Text>
                          <Text style={{ fontSize: 24 }}>{item.sys}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Subheading></Subheading>
                          <Text style={{ fontSize: 24, fontWeight: 'bold', }}>DIA</Text>
                          <Text style={{ fontSize: 24 }}>{item.dia}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Subheading></Subheading>
                          <Text style={{ fontSize: 24, fontWeight: 'bold', }}>PULSE</Text>
                          <Text style={{ fontSize: 24 }}>{item.dia}</Text>
                        </View>
                      </View>
                    </Card.Content>
                    <Card.Actions>
                      {/* <Button>Cancel</Button>
                      <Button>Ok</Button> */}
                    </Card.Actions>
                  </Card>

                )}
              />
            )}
          </Content>
        </Container>
      );

    }
    return (
      <Container>
        <Content>
          <SafeAreaView/>
          <Title>Log in for view your pressures.</Title>
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

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);

