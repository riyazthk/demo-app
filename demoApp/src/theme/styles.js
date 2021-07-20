/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {color} from './color';
import {spacing} from './spacing';
import {typography} from './typography';

export const commonStyles = StyleSheet.create({
  navBarHeader: {
    fontSize: 18,
    fontFamily: typography.secondary,
    color: color.palette.black,
    lineHeight: 22,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontFamily: typography.secondary,
    color: color.palette.navy,
    lineHeight: 22,
  },
  menuItemsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  listItemTitleText: {
    fontSize: 14,
    fontFamily: typography.secondary,
    color: color.palette.navyTwo,
    lineHeight: 18,
  },
  headerBackIcon: {marginLeft: 10},
  dialogHeaderText: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    paddingHorizontal: spacing[4],
  },
  nestedTabViewDefault: {flex: 1, height: 0},
});
