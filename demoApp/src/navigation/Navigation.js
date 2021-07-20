/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {OutsideStack} from './OutsideStack';
import { InsideStack } from './InsideStack';

const Stack = createStackNavigator();

export const Navigaiton = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.OUTSIDE_STACK} component={OutsideStack} />
      <Stack.Screen name={Routes.INSIDE_STACK} component={InsideStack} />
    </Stack.Navigator>
  );
};
