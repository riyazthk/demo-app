/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {
  AccountScreen,
  AdminScreen,
  InvestScreen,
  LandingScreen,
  PortfolioOverView,
} from '../screen';

import {Routes} from './routes';
import {LoginHeader} from '../components';

const BottomTabs = createBottomTabNavigator();

export const BottomStack = () => {
  return (
    <BottomTabs.Navigator
      backBehavior={'none'}
      initialRouteName={Routes.LANDINGSCREEN}
      screenOptions={{headerShown: false}}
      >

      <BottomTabs.Screen
        name={Routes.INVEST}
        component={InvestScreen}
        options={{
          unmountOnBlur: true,
          title: 'Invest',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/dashboard-active.png')
                  : require('../assets/icons/dashboard-inactive.png')
              }
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name={Routes.ACCOUNT}
        component={AccountScreen}
        options={{
          unmountOnBlur: true,
          title: 'Accounts',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/portfolio-active.png')
                  : require('../assets/icons/portfolio-inactive.png')
              }
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name={Routes.LANDINGSCREEN}
        component={LandingScreen}
        options={{
          unmountOnBlur: true,
          title: 'Invest',

          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/invest-active.png')
                  : require('../assets/icons/invest-inactive.png')
              }
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name={Routes.PORTFOLIO}
        component={PortfolioOverView}
        options={{
          unmountOnBlur: true,
          title: 'Reports',

          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/account-active.png')
                  : require('../assets/icons/account-inactive.png')
              }
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name={Routes.ADMIN}
        component={AdminScreen}
        options={{
          unmountOnBlur: true,
          title: 'Admin',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/admin-active.png')
                  : require('../assets/icons/admin-inactive.png')
              }
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};
