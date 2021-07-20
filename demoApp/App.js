/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Navigaiton} from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Navigaiton />
    </NavigationContainer>
  );
};

export default App;
