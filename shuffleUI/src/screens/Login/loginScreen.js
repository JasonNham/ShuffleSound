import React, {Component} from 'react';
import {View, Button} from 'react-native';

import authHandler from './authenticationHandler';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            authHandler.onLogin().then(result => {
              if (result) {
                const storeData = async value => {
                  try {
                    await AsyncStorage.setItem('newUser', value).then(() => {
                      // store first time experience finished
                      try {
                        const {selectedItems} = route.params;
                        const saveGenres = async () => {
                          try {
                            const accessToken = await AsyncStorage.getItem(
                              'accessToken',
                            );
                            if (accessToken != null) {
                              var selectedCombined = '';
                              selectedItems.forEach(item => {
                                selectedCombined =
                                  selectedCombined + item + ',';
                              });
                              console.log(selectedCombined);
                              selectedCombined = selectedCombined.slice(0, -1);

                              console.log(selectedCombined);
                              const url =
                                'https://shufflesound.com/api/userData/' +
                                accessToken +
                                '/' +
                                selectedCombined;
                              console.log(url);
                              fetch(url).then(response => {
                                response.json().then(json => {
                                  console.log(json);
                                });
                              });

                              return accessToken;
                            } else {
                            }
                          } catch (e) {}
                        };
                        saveGenres();
                      } catch (e) {}
                      navigation.navigate('Main'); // redirect home page
                    });
                  } catch (e) {
                    // saving error
                  }
                };
                storeData('false');
              }
            })
          }
          title="Login with Spotify"
          style={styles.loginButton}
          color="white"
        />
      </View>
    </View>
  );
};

export default LoginScreen;
