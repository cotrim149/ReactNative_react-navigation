import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
  render() {

    let sendParams = {
      itemId: 10,
      otherParam: 'Some param!'
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details',sendParams)}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
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
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}