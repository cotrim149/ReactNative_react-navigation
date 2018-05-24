import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import Image1 from './assets/spiro.png';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={Image1}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      // title: 'Home',
      // If you want to put a image in place of title, uncomment line bellow
      headerTitle: <LogoTitle />,
      headerBackTitle: 'Voltar',
      headerRight: (
        <Button onPress={params.increaseCount} title="+1" color="#fff" />
      ),
    };
  };

  state = {
    count: 0,
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // static configuration to single header
  // static navigationOptions = {
    // title: 'Home',
    // If you want to put a image in place of title, uncomment line bellow
    // headerTitle: <LogoTitle />,
    // headerRight: (
    //   <Button
    //     onPress={() => alert('This is a button!')}
    //     title="Info"
    //     color="#fff"
    //   />
    // ),
    // configure one screen without root configuration for all routes
    // headerStyle: {
    //   backgroundColor: '#f4511e',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
  // };

  render() {

    let sendParams = {
      itemId: 10,
      otherParam: 'Some param!'
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen - {this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details',sendParams)}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
      headerBackImage: LogoTitle,
    };
  };

  render() {

    /* Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

        <Text>Sent Navigation Values</Text>
        <Text>Item id: {JSON.stringify(itemId)}</Text>
        <Text>Other Param: {JSON.stringify(otherParam)}</Text>

        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
        />

        <Text style = {{fontSize: 20}}>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Text>Navigate command: used to show that screen. If you are in called screen and press the button again, nothing will happens</Text>
        <Button
          title="Go to Details... NOW"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Text>Push command: Used to put a new screen in stack of navigation.</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Text>Navigate command: In multiple screens, just use it and back to the screen reference. If the screen reference exists in stack, then will back to it. If not, then the screen will be added in stack.</Text>
        <Button
          title="Just go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>Go back command: Screen back.</Text>
        <Button
          title="Back to top"
          onPress={() => this.props.navigation.popToTop()}
        />
        <Text>Pop To Top command: Go to root screen.</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    // RouteName: ResourceScreen
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here and configure all screens route */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}