import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';

// to be deleted

const DATA = [
    {
      id: '1',
      sender: 'Test Sender 1',
      recentMessage: 'Message 1'
    },
    {
      id: '2',
      sender: 'Test Sender 2',
      recentMessage: 'Message 2'
    },
    {
      id: '3',
      sender: 'Test Sender 3',
      recentMessage: 'Message 3'
    },
    {
      id: '4',
      sender: 'Test Sender 4',
      recentMessage: 'Message 4'
    },
    {
      id: '5',
      sender: 'Test Sender 5',
      recentMessage: 'Message 5'
    },
    {
      id: '6',
      sender: 'Test Sender 6',
      recentMessage: 'Message 6'
    },
    {
      id: '7',
      sender: 'Test Sender 7',
      recentMessage: 'Message 7'
    },
    {
      id: '8',
      sender: 'Test Sender 8',
      recentMessage: 'Message 8'
    },
    {
      id: '9',
      sender: 'Test Sender 9',
      recentMessage: 'Message 9'
    },
    {
      id: '10',
      sender: 'Test Sender 10',
      recentMessage: 'Message 10'
    },
    {
      id: '11',
      sender: 'Test Sender 11',
      recentMessage: 'Message 11'
    },
    {
      id: '12',
      sender: 'Test Sender 12',
      recentMessage: 'Message 12'
    },
    {
      id: '13',
      sender: 'Test Sender 13',
      recentMessage: 'Message 13'
    }
  ]

class Chat extends Component {
    state = {  }
    

    render() {
        //const DATA = this.props.route.params.history
        return (
            <SafeAreaView>
                <FlatList
                    //contentContainerStyle={styles.container}
                    //ListHeaderComponent={{/* Your Header Component */ }}
                    //ListFooterComponent={{/* Your Footer Component */ }}
                    //scrollEventThrottle={250}
                    data={DATA}
                    /*refreshControl={
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => fetchMessages()} // call getMessages
                        />
                    }*/
                    renderItem = {(item) => (
                        <ListItem>
                            <Text>
                                {item.item.recentMessage}
                            </Text>
                        </ListItem>
                    )}
                /> 
                </SafeAreaView>
        );
    }
}

export default Chat;