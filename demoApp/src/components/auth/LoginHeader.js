/* eslint-disable prettier/prettier */
import {equals} from 'ramda';
import React from 'react';
import {View, Text, StyleSheet, ColorPropType, Image} from 'react-native';
import {color} from '../../theme';
export const LoginHeader = ({title}) => {
  return (
    <View style={styles.headerView}>
      {equals(title, 'Otp Verification') ? (
        <Image
          source={require('../../assets/icons/leftArrow.png')}
          style={{height: 50, width: 50, marginTop: 10}}
        />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      <Image
        source={require('../../assets/icons/logo.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
  },
  image: {
    tintColor: color.palette.azure,
  },
});
