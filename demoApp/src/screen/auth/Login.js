/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {equals} from 'ramda';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Routes} from '../../navigation';
import {getUserLogin} from '../../services';
import {color, typography} from '../../theme';
import {PhoneInput} from '../../ui-kit/phoneInput';
import {generateMd5Encryption} from '../../utils/md5Encryption';
import Toast, {BaseToast} from 'react-native-toast-message';

const SALT = 'P@r<@tH!@2020h&*o54ol$%';
export const Login = () => {
  const navigation = useNavigation();
  const numberValidation = new RegExp(/^[0-9]{1,10}$/);
  const errorMsg = ['Invalid Number', 'Please Enter a Number'];
  const [number, setNumber] = useState();
  const [showMsg, setShowMsg] = useState(null);

  const handleChange = text => {
    if (numberValidation.test(text)) {
      setNumber(text);
      setShowMsg(null);
    } else {
      console.log('entry');
      setShowMsg(errorMsg[0]);
    }
  };
  const handleSubmit = () => {
    !number?.length ? setShowMsg(errorMsg[1]) : null;
    if (number?.length === 10) {
      let payload = {
        phone_number: number,
        auth_token: generateMd5Encryption(SALT + number.toString()),
      };
      getUserLogin(payload)
        .then(res => {
          equals(res?.data?.success, true) ? (
            navigation.navigate(Routes.OTPVERIFICATION, {item: res?.data})
          ) : (
            <BaseToast style={{borderRadius: 9, backgroundColor: 'pink'}} />
          );
        })
        .catch(e => {
          console.log('catch', e);
        });
    }
  };
  return (
    <View style={styles.loginView}>
      <View style={styles.imageView}>
        <Image
          source={require('../../assets/icons/login.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>Login</Text>
      <Text style={[styles.text, {fontSize: 15}]}>
        We will send you <Text style={styles.boldText}>One Time Password</Text>{' '}
        on Your phone
      </Text>
      <View style={styles.inputView}>
        <PhoneInput
          value={number}
          onChangeText={handleChange}
          label={'Mobile Number'}
          labelStyle={styles.labelStyle}
          placeholder={'Enter your mobile number'}
          inputStyle={styles.inputStyle}
          keyboardType={'number-pad'}
          errorMessage={showMsg}
        />
      </View>
      <View style={styles.submitBtnView}>
        <Text style={[styles.text, {marginTop: 40}]}>Lets Go</Text>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}>
          <View style={[styles.imageView, {height: 60, width: 60}]}>
            <Image
              source={require('../../assets/icons/rightArrow.png')}
              style={styles.arrowPng}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.subTitle}>View product as guest</Text>
      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
        <View style={styles.footer}>
          <Text
            style={[
              styles.text,
              {fontSize: 14, color: color.palette.white, marginTop: 15},
            ]}>
            Don't have an account? REGISTER NOW
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.palette.white,
  },
  imageView: {
    height: 100,
    width: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: color.palette.silver,
    marginTop: 30,
  },
  image: {
    tintColor: color.palette.azure,
  },
  text: {
    fontSize: 25,
    marginVertical: 10,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  boldText: {
    fontFamily: typography.secondary,
    fontSize: 20,
  },
  inputStyle: {
    minHeight: 36,
    height: 36,
    fontSize: 14,
    borderRadius: 5,
    borderColor: color.palette.textInputBorder,
    paddingVertical: 0,
    paddingRight: 0,
  },
  labelStyle: {
    fontFamily: typography.primary,
    textAlign: 'left',
    color: color.palette.black,
  },
  inputView: {
    height: 80,
    width: '100%',
    paddingHorizontal: 16,
  },
  arrowPng: {
    height: 50,
    width: 50,
  },
  submitBtnView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginRight: 30,
  },
  subTitle: {
    fontSize: 14,
    color: color.palette.azureTwo,
  },
  footer: {
    // flex: 1,
    height: 50,

    backgroundColor: color.palette.twilightBlue,
  },
});
