import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, withNavigation } from 'react-navigation';
import { ThemeProvider, SearchBar } from 'react-native-elements';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

import DeviceTable from './comps/device-table'
import LoginPage from './comps/login'
import MyDevicePage from './comps/my-devices'

class HomeScreen extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <DeviceTable />
      </ThemeProvider>

    );
  }
}

const TabNavigator = createBottomTabNavigator({
  "设备列表": {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon:
        () => {
          return (<Icon name="trash" />)
        }

    }
  },
  "我的设备": {
    screen: MyDevicePage,
    navigationOptions: {
      tabBarIcon:
        () => {
          return (<Icon name="star" />)
        }
    }
  }
});

const HomeStack = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      title: '校园垃圾桶'
    }
  },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      title: '登录页面'
    }
  }
})

export default createAppContainer(HomeStack);