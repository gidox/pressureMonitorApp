import React, { Component } from 'react';
import { View,t, SafeAreaView } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { Button, Title, Paragraph, Card, Avatar, Text, Subheading } from 'react-native-paper';
import { firebase } from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import { connect } from 'react-redux';

class Statistics extends Component {
  static navigationOptions = {
    header: null,
    tabBarColor: '#c51162',
    tabBarIcon: (<Icon name='ios-stats' type='Ionicons' style={{ color: '#FFF'}} />),

  };
  constructor(props) {
    super(props);
    this.state = {
      pressures: []
    };
    this.ref = firebase.firestore().collection('pressuremeditions').where("uid", "==", props.user.data.uid);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
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
    this.setState({
      pressures,
      isLoading: false,
   });
  }

  render() {
    console.log(this.state);
    const { pressures } = this.state;
    return (
      <Container>
        <Content padder style={{ backgroundColor: '#eaeaea' }}>
          <SafeAreaView>
            <Title style={{ fontSize: 20, marginBottom: 20, }}>Tus mediciones pasadas:</Title>
          </SafeAreaView>
          <FlatList
            data={pressures}
            ItemSeparatorComponent={() => (<View style={{ marginVertical: 5 }} />)}
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

