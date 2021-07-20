/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {Login, OtpVerificaiton} from '../screen';
import {LoginHeader} from '../components';
import {LandingScreen} from '../screen/dashboard/landingPage/LandingScreen';
import {BottomStack} from './BottomStack';

const Stack = createStackNavigator();
export const InsideStack = () => {
  return (
    <Stack.Navigator title={'Dashboard'}>
      <Stack.Screen name={Routes.BOTTOM_TAB_STACKS} component={BottomStack} />
    </Stack.Navigator>
  );
};
