import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import { Header } from 'react-native-elements';
import InboxComponent from '../../components/Inbox/InboxComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';
import ChatWindow from '../../components/Inbox/ChatWindow';
import NewChat from '../../components/Inbox/NewChat';

const StackInbox = createStackNavigator();

const InboxNavigator = () => {
  return(
    <StackInbox.Navigator headerMode='screen'>
      <StackInbox.Screen name="InboxList" component={InboxComponent}
        options={{
          header: ({ route, options }) => {
            return (
              <Header
                title="Inbox"
                containerStyle={{backgroundColor: 'black' }}
                centerComponent={{ text: 'Inbox', style: { color: 'white', fontWeight: 'bold', fontSize: 16} }}
              />
            );
          },
        }}/>
      <StackInbox.Screen name="Chat" component={ChatWindow} options={{headerShown: false}}/>
      <StackInbox.Screen name="NewConversation" component={NewChat} 
        options={{
          header: ({ route, options }) => {
            return (
              <Header
                title="New Conversation"
                containerStyle={{backgroundColor: 'black' }}
                centerComponent={{ text: 'New Conversation', style: { color: 'white', fontWeight: 'bold', fontSize: 16 } }}
              />
            );
          },
        }}/>
    </StackInbox.Navigator>
  )
};



export default InboxNavigator;
