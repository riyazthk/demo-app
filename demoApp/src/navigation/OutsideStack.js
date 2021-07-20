/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {Login, OtpVerificaiton} from '../screen';
import {LoginHeader} from '../components';

const Stack = createStackNavigator();
export const OutsideStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.LOGIN}
        component={Login}
        options={{header: () => <LoginHeader title="Login" />}}
      />
      <Stack.Screen
        name={Routes.OTPVERIFICATION}
        component={OtpVerificaiton}
        options={{header: () => <LoginHeader title="Otp Verification" />}}
      />
    </Stack.Navigator>
  );
};
