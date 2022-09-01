import React from 'react';
import 'react-native-gesture-handler';
import {View, StatusBar} from 'react-native';

import linking from './linking';
import Navigation from './src/navigation';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Navigation linking={linking} />
    </View>
  );
};

export default App;
