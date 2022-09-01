import { Chat, MessageType, defaultTheme } from '@flyerhq/react-native-chat-ui'
import React, { useEffect, useState } from 'react'
import { Header, Icon } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import axios from 'axios';

const ChatWindow = ({route, navigation}) => {
  const { authToken, spotifyId, senderId, senderName, conversationId } = route.params;

  const [messages, setMessages] = useState<MessageType.Any[]>([])
  const [updated, setUpdated] = useState(false)
  const user = { id: spotifyId }

  // message key
  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.floor(Math.random() * 16)
      const v = c === 'x' ? r : (r % 4) + 8
      return v.toString(16)
    })
  }

  // load messages and save to state
  const getMessages = () => {
    const url = 'https://shufflesound.com/api/directMessage/' + conversationId;
    let history: MessageType.Any[]= [];
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        for (let i = json.length - 1; i >= 0; i--) {
          const author = { id : json[i].spotifyID }
          const textMessage: MessageType.Text = {
            author: author,
            createdAt: json[i].createdAt,
            id: uuidv4(), //use spotify id
            text: json[i].message,
            type: 'text',
          }
          history.push(textMessage) 
          //setMessages([textMessage, ...messages])
        }
        setMessages(history)
      })
      .catch((error) => {
        console.error(error);
      });
    setUpdated(true)
    return history
  }

  // call getMessages() if the chat has not been updated
  useEffect(() => {
    if (!updated) {
      getMessages()
    }
  })

  // post message to server and save to database
  const sendMessage = (message: MessageType.Text) => {
    const url = 'https://shufflesound.com/api/directMessage/' + authToken;
    const params = JSON.stringify({ 
          spotifyID: message.author.id,
          conversationID: conversationId,
          displayName: "",
          songURI: "",
          message: message.text,
    });
    axios.post(url, params, {
      "headers": {
        "content-type": "application/json",
      },
    })
    .then(function(response) {
      //console.log("message posted")
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // add message to messages array and post message
  const addMessage = (message: MessageType.Text) => {
    setMessages([message, ...messages])
    sendMessage(message)
  }
  
  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(), //use spotify id
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }
  
  return (
    // Remove this provider if already registered elsewhere
    // or you have React Navigation set up
    <SafeAreaProvider>
      <Header
        leftComponent={<Icon name='ios-chevron-back' type='ionicon' color={'white'} onPress={() => navigation.navigate('InboxList')}/>}
        centerComponent={{ text: senderName, style: { color: 'white', fontWeight: 'bold', fontSize: 16 } }}
        containerStyle={{backgroundColor: 'black'}}
      />
      <Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
        theme={{
          ...defaultTheme,
          colors: { ...defaultTheme.colors, 
            primary: 'black',
            receivedMessageDocumentIcon: 'black',},
        }}
      />
    </SafeAreaProvider>
  )
}

export default ChatWindow