/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, FlatList, Button, Image} from 'react-native';
import {Card} from 'react-native-elements/dist/card/Card';
import {LoginHeader} from '../../../components';
import {color} from '../../../theme';
import {books} from './books';

export const LandingScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: props => (

      // ),
      headerLeft: props => <LoginHeader title="RA Products" />,
    });
  });

  const renderItem = booksitem => {
    return (
      <View>
        <TouchableOpacity>
          <View
            style={{
              width: 170,
              justifyContent: 'space-between',
            }}>
            <View>
              <Image
                source={booksitem.item.imageUrl}
                style={{
                  resizeMode: 'contain',
                  height: 170,
                  position: 'relative',
                  right: 24,
                }}
              />
            </View>
            <View style={{width: '110%'}}>
              <Text style={{color: color.palette.azureTwo, fontSize: 15}}>
                {booksitem.item.title}
              </Text>
              <Text style={{color: 'grey', fontSize: 12}}>
                {booksitem.item.Author}
              </Text>
              <Text style={{fontSize: 20}}>price:{booksitem.item.price}</Text>
            </View>
            <View style={{flexDirection: 'column', paddingTop: 5}}>
              <View style={{padding: 5}}>
                <Button title="ADD To Bag" color={color.palette.azureThree} />
              </View>
              <View style={{padding: 5}}>
                <Button title="WhishList" color={color.palette.azureThree} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        marginHorizontal: 10,
        paddingTop: 20,
        flex: 1,
        backgroundColor: color.palette.white,
      }}>
      <FlatList
        data={books}
        renderItem={renderItem}
        contentContainerStyle={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};
