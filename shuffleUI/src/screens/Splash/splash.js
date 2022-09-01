import React, {useRef, useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useScrollToTop} from '@react-navigation/native';
const SplashScreen = () => {
  const myRef = useRef(null);
  useScrollToTop(myRef);
  const navigation = useNavigation();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('newUser');
      if (value !== null) {
        //home
        // navigation.navigate('Main');
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          if (accessToken != null) {
            //do code with token here !
            try {
              var getMusicURL =
                'https://shufflesound.com/api/getMusic/' + accessToken;
              const resp = await fetch(getMusicURL);

              const json = await resp.json();
              navigation.navigate('Main', {scrollRef: myRef});
            } catch (err) {
              //invalid token
              navigation.navigate('Login');
            }
          }
        } catch (e) {}
      } else {
        //new user
        navigation.navigate('Genre');
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  const onScreenLoad = () => {
    getData();
  };
  useEffect(() => {
    onScreenLoad();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/splash.jpg')}></Image>
    </View>
  );
};

export default SplashScreen;
