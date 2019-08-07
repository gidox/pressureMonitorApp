import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { Button, Title, Paragraph, Card, Avatar } from 'react-native-paper';
import { firebase } from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';

export default class Statistics extends Component {
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
    this.ref = firebase.firestore().collection('pressuremeditions');
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
            <Title>Tus mediciones pasadas:</Title>
          </SafeAreaView>
          <FlatList
            data={pressures}
            renderItem={({item}) => (
              <Card>
                <Card.Title title={moment(item.created_at).format('DD-MM-YYYY')} subtitle={moment(item.created_at).format('hh:mm a')} left={(props) => <Avatar.Icon {...props} icon="folder" />} />
                <Card.Content>
                  <Title>Medicion</Title>
                </Card.Content>
                <Card.Actions>
                  <Button>Cancel</Button>
                  <Button>Ok</Button>
                </Card.Actions>
              </Card>

            )}
          />
        </Content>
      </Container>
    );
  }
}
