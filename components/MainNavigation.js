import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import NavBar from './NavBar';
import Search from '../screens/Search';
class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={true} />
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar main={false} navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name="search"
          component={Search}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar main={false} navigation={navigation} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
