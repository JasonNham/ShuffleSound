import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeButtonTabNavigator from './homeBottomTabNavigator';
import GenreSelect from '../screens/Signup/GenreSelect';
const Stack = createStackNavigator();
import LoginScreen from '../screens/Login/loginScreen';
import SplashScreen from '../screens/Splash/splash';
import UpdateGenre from '../screens/AppSettings/UpdateGenre';
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} path="Splash" />
        <Stack.Screen name="Genre" component={GenreSelect} path="Genre" />
        <Stack.Screen name="Login" component={LoginScreen} path="Login" />
        <Stack.Screen name="UpdateGenre" component={UpdateGenre} path='UpdateGenre' />

        <Stack.Screen
          name="Main"
          component={HomeButtonTabNavigator}
          path="Main"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
