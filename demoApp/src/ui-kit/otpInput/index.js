/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef, useImperativeHandle} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';

import {equals, flatten, mergeAll} from 'ramda';
import {color, spacing, typography} from '../../theme';

const styles = StyleSheet.create({
  inputStyle: (error, lift, isFocused, last, secured) => ({
    height: 35,
    width: 34,
    // to make text verically center aligned on iOS
    ...Platform.select({
      ios: {lineHeight: secured ? 40 : 22},
      android: {},
    }),

    borderColor: error
      ? color.palette.red
      : isFocused
      ? color.palette.azure
      : color.palette.textInputBorder,
    borderWidth: 1.5,
    borderRadius: 5,
    color: error ? color.palette.red : color.palette.blackTwo,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: typography.secondary,
    ...(lift
      ? {fontSize: 35, paddingBottom: 4}
      : {fontSize: 14, paddingBottom: 7}),
    ...(last && {fontSize: 35}),
  }),
});

const CONTAINER = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-evenly',
};

const WRAPPER = {
  flexDirection: 'column',
};

const ERROR = {
  alignSelf: 'flex-start',
  marginHorizontal: spacing[5] + 2,
  marginTop: 4,
};

const LABEL = {
  marginBottom: 5,
  width: '100%',
};

const enhance = (style, styleOverride) =>
  mergeAll(flatten([style, styleOverride]));

export const OtpInput = React.forwardRef((props, ref) => {
  const {
    callbackOnInput,
    pinCount = 6,
    error,
    errorStyle: errorStyleOverride,
    style: styleOverride,
    labelStyle: labelStyleOverride,
    successStyle: successStyleOverride,
    label,
    required,
    focusOnStart = true,
    secureTextEntry = true,
    keyboardType: keyboardTypeOverride = 'numeric',
    successMsg,
  } = props;

  const default_otp = Array(pinCount).fill('_').join('');

  const inputRef = useRef([]);
  const isKeyboardOpen = useRef(true);

  const [otp, setOtp] = useState(default_otp);
  const [currentFocus, setCurrentFocus] = useState(0);
  let labelStyle = enhance(LABEL, labelStyleOverride);

  useImperativeHandle(ref, () => ({
    clearPin() {
      setOtp(default_otp);
      focusToStart();
    },
  }));

  useEffect(() => {
    if (equals(otp.length, pinCount) && !otp.includes('_')) {
      callbackOnInput(true, otp);
      Keyboard.dismiss();
    } else {
      callbackOnInput(false, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, pinCount]);

  useEffect(() => {
    focusOnStart &&
      setTimeout(() => {
        focusToStart();
      }, 500);
  }, []);

  const focusToStart = () => inputRef.current[0]?.focus();

  const replaceOtpString = (index, val) => {
    let newOtp = otp;
    const newVal =
      newOtp?.substr(0, index) + val + newOtp?.substr(index + 1, newOtp.length);
    setOtp(newVal);
  };

  const focusNext = (index, val) => {
    if (!val.match('^[A-Za-z0-9]*$')) {
      return;
    }
    const nIndex = otp[index] !== '_' ? index + 1 : index;
    if (index < inputRef.current.length - 1 && val) {
      inputRef.current[nIndex + 1]?.focus();
    }
    replaceOtpString(nIndex, val);
  };

  const focusPrevious = (key, index) => {
    if (equals(key, 'Backspace')) {
      if (otp[index] !== '_') {
        replaceOtpString(index, '_');
      } else {
        if (index > 0) {
          inputRef.current[index - 1]?.focus();
          replaceOtpString(index - 1, '_');
        }
      }
    }
  };

  const getText = val =>
    !equals(val, '_') ? (secureTextEntry ? '.' : val) : '';

  const keyboardDidShow = () => {
    isKeyboardOpen.current = true;
  };

  const keyboardDidHide = () => {
    isKeyboardOpen.current = false;
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  return (
    <View style={WRAPPER}>
      {label && (
        <Text variant={'fieldLabel'} style={labelStyle}>
          {label}
          {required && label && <Text variant={'fieldError'}>*</Text>}
        </Text>
      )}
      <View style={[CONTAINER, styleOverride]}>
        {otp.split('').map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            activeOpacity={1}
            onPress={() => {
              let currIndex = otp.indexOf('_');
              let ind = equals(currIndex, -1) ? pinCount - 1 : currIndex;
              inputRef.current[ind]?.blur();
              inputRef.current[ind]?.focus();
            }}>
            <View pointerEvents={'none'}>
              <TextInput
                style={styles.inputStyle(
                  error,
                  !equals(otp[index], '_') && secureTextEntry,
                  equals(index, currentFocus),
                  equals(index, pinCount - 1) && secureTextEntry,
                  secureTextEntry,
                )}
                value={getText(otp[index])}
                onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
                onChangeText={text => text !== '' && focusNext(index, text)}
                ref={_ref => {
                  inputRef.current[index] = _ref;
                }}
                maxLength={1}
                secureTextEntry={false}
                keyboardType={keyboardTypeOverride}
                onFocus={() => setCurrentFocus(index)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {!!error && (
        <Text variant={'fieldError'} style={[ERROR, errorStyleOverride]}>
          {error}
        </Text>
      )}
      {!!successMsg && (
        <Text variant={'success'} style={[ERROR, successStyleOverride]}>
          {successMsg}
        </Text>
      )}
    </View>
  );
});
