import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from '../screens/Search/search';
import MyLikes from '../screens/MyLikes/myLikes';
import Inbox from '../screens/Inbox/inbox';
import Profile from '../screens/Profile/profile';
import AppSettings from '../screens/AppSettings/AppSettings';
import {useScrollToTop} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const HomeButtonTabNavigator = () => {
  const myRef = useRef(null);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'black',
          elevation: 30,
        },
      }}>
      <Tab.Screen
        name="Discover"
        children={() => <Home scrollRef={myRef} />}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
        //add listener if already on this screen to update the algorithm

        listeners={({navigation}) => ({
          tabPress: e => {
            if (navigation.isFocused()) {
              myRef.current.scrollToOffset({
                animated: true,
                offset: 0,
              });
            }
          },
        })}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name="inbox" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={AppSettings}
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeButtonTabNavigator;
