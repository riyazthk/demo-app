/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {color, spacing, typography} from '../../theme';
import {mergeAll, flatten} from 'ramda';

// the base styling for the container
const CONTAINER = {};

// the base styling for the TextInput
const INPUT = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 43,
  fontSize: 19,
  backgroundColor: color.palette.white,
  paddingLeft: 11,
  paddingRight: 40,
  flexDirection: 'row',
  flex: 1,
  paddingVertical: 0,
};

// Currently no variations
const VARIATIONS = {
  bordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.textInputBorder,
    borderRadius: 10,
  },
  underline: {
    //borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.textInputBorder,
  },
  danger: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    borderRadius: 10,
  },
  disabled: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.textInputBorder,
    borderRadius: 10,
    backgroundColor: color.palette.inputDisabled,
  },
};

const LABEL = {
  marginBottom: 8,
  fontSize: 14,
};

const ERROR = {
  borderColor: color.palette.red,
};

const RIGHT_CONTAINER = {
  height: '100%',
  aspectRatio: 0.5,
  justifyContent: 'center',
  position: 'absolute',
  right: 5,
};

const ICON = {
  width: 15,
  height: 15,
};

const ERROR_CONTAINER = {
  marginTop: 5,
  fontSize: 12,
  color: color.palette.red,
};

const RIGHT_PADDING = {
  paddingRight: spacing[4],
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

export function PhoneInput(props) {
  const {
    value,
    placeholder,
    variant = 'underline',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    iconStyle: iconStyleOverride,
    errorStyle: errorStyleOver,
    forwardedRef,
    errorMessage,
    onIconPress = () => {},
    icon,
    label,
    disabled,
    labelStyle: labelStyleOverride,
    required,
    loading,
    autoCompleteOff = true,
    ...rest
  } = props;

  let containerStyle = CONTAINER;

  let errorStyleOverride = errorMessage ? ERROR : {};

  containerStyle = enhance(containerStyle, styleOverride);

  let inputStyle = enhance(
    {...INPUT, ...VARIATIONS[variant]},
    inputStyleOverride,
  );

  inputStyle = enhance(inputStyle, errorStyleOverride);

  let iconStyle = enhance(ICON, iconStyleOverride);

  let labelStyle = enhance(LABEL, labelStyleOverride);

  let errorStyle = enhance(ERROR_CONTAINER, errorStyleOver);

  let isRightPaddingRequired = icon || loading;

  return (
    <View style={containerStyle}>
      {label && (
        <Text variant={'fieldLabel'} style={labelStyle}>
          {label}
          {required && label && <Text variant={'fieldError'}>*</Text>}
        </Text>
      )}
      <View style={styles.borderLine}>
        <Text style={styles.text}>+91 | </Text>
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={color.palette.brownGrey2}
          underlineColorAndroid={color.transparent}
          {...rest}
          editable={!disabled}
          style={[inputStyle, !isRightPaddingRequired && RIGHT_PADDING]}
          ref={forwardedRef}
          autoCorrect={false}
          {...(autoCompleteOff && {autoCompleteType: 'off'})}
        />
        {!loading ? (
          icon && (
            <TouchableOpacity
              style={RIGHT_CONTAINER}
              activeOpacity={0.8}
              hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
              onPress={onIconPress}>
              <Image source={icon} style={iconStyle} resizeMode={'contain'} />
            </TouchableOpacity>
          )
        ) : (
          <View style={RIGHT_CONTAINER}>
            <ActivityIndicator color={color.primary} size={'small'} />
          </View>
        )}
      </View>
      {!!errorMessage && (
        <Text variant="fieldError" style={errorStyle}>
          {errorMessage.includes('server') || errorMessage.includes('undefined')
            ? null
            : errorMessage}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  borderLine: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.black,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
});
