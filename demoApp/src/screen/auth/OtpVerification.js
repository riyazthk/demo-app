/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {equals} from 'ramda';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Routes} from '../../navigation';
import {verifyOtp} from '../../services';
import {color, typography} from '../../theme';
import {OtpInput} from '../../ui-kit/otpInput';
import {generateMd5Encryption} from '../../utils/md5Encryption';

const SALT = 'P@r<@tH!@2020h&*o54ol$%';
export const OtpVerificaiton = ({route}) => {
  const {item} = route?.params ?? {};
  const navigation = useNavigation();
  const [otp, setOtp] = useState();
  const [error, setError] = useState(false);
  const otpRef = React.useRef();

  const handleSubmit = () => {
    let payload = {
      customer_id: item?.parameters?.customer_id,
      otp: otp,
      auth_token: generateMd5Encryption(
        SALT + item?.parameters?.customer_id.toString() + otp.toString(),
      ),
    };
    verifyOtp(payload).then(res => {
      equals(res?.data?.success, true)
        ? navigation.navigate(Routes.INSIDE_STACK, {screen: Routes.DASHBOARD})
        : setError(true);
    });
  };

  return (
    <View style={styles.loginView}>
      <View style={styles.imageView}>
        <Image
          source={require('../../assets/icons/login.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>Enter OTP</Text>
      <Text style={[styles.text, {fontSize: 15}]}>
        We will send you <Text style={styles.boldText}>One Time Password</Text>{' '}
        on Your phone number {item?.parameters?.phone_number}
      </Text>
      <View style={styles.inputView}>
        <OtpInput
          ref={otpRef}
          callbackOnInput={(ready, value) => {
            error && setError('');
            setOtp(value);
          }}
          error={error}
          pinCount={4}
          style={styles.otp}
        />
      </View>
      <View style={styles.submitBtnView}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}>
          <View
            style={[
              styles.imageView,
              {height: 60, width: 60, marginTop: 0, alignSelf: 'center'},
            ]}>
            <Image
              source={require('../../assets/icons/rightArrow.png')}
              style={styles.arrowPng}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={[styles.text, {marginTop: 1}]}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
        <View style={styles.footer}>
          <Text
            style={[
              styles.text,
              {fontSize: 14, color: color.palette.white, marginTop: 15},
            ]}>
            Didn't receive OTP? RESEND CODE
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
    marginTop: 10,
  },
  arrowPng: {
    height: 50,
    width: 50,
  },
  submitBtnView: {
    //flexDirection: 'row',
    //justifyContent: 'center',
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
