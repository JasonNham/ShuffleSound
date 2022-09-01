import React, { Component } from 'react';
import { FlatList, StyleSheet, RefreshControl, Text, SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatPreview from './ChatPreview';
import { ListItem, FAB, Icon } from 'react-native-elements';

// get spotify id (string)
const getSpotifyId = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken != null) {
      const url = 'https://shufflesound.com/api/profile/' + accessToken;
      try {
        const response = await fetch(url);
        const json = await response.json();
        return json.id;
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// get conversation ids (array)
const getConversationIds = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const spotifyId = await getSpotifyId();
    if (accessToken != null) {
      const url = 'https://shufflesound.com/api/inbox/' + spotifyId;
      try {
        const response = (await fetch(url));
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// get all user display names (array)
const getNames = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken != null) {
      const url = 'https://shufflesound.com/api/getUsers/' + accessToken;
      try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}


class InboxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      authToken: null,
      spotifyId: null,
      conversationIds: null,
      senderNames: null,
      refreshing: false
    };
  }

  // call methods to load data to state when component is mounted
  async componentDidMount() {
    await Promise.all([this.loadConversationIds(), this.loadSpotifyId(), this.loadNames(), this.loadAuthToken()])
  }

  loadAuthToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    this.setState({authToken: token});
  }

  // refresh conversation ids if user pulls down on screen to refresh
  refreshConversationIds = () => {
    this.setState({refreshing: true}, () => this.loadConversationIds());
  }

  loadConversationIds = async () => {
    const conIds = await getConversationIds();
    this.setState({refreshing: false});
    this.setState({conversationIds: conIds});
  }

  loadSpotifyId = async () => {
    const id = await getSpotifyId();
    this.setState({spotifyId : id});
  }

  loadNames = async () => {
    const names = await getNames();
    this.setState({senderNames: names})
  }

  loadSenderId(members) {
    const id = this.state.spotifyId;
    if (members[0] == id) {
        return members[1];
    } else {
        return members[0];
    }
  }

  loadSenderName(id) {
    const names = this.state.senderNames
    if (names === null) {
      return this.loadSenderName(id)
    } else {
      for (let i = 0; i < names.length; i++) {
        if (names[i].spotifyID == id) {
            if (names[i].display_name != null) {
                // console.log(names[i])
                return names[i].display_name;
            } else {
                return 'Unknown';
            }
            break;
        }
      }
    }
  }

  // list item separator
  separator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#dcdcdc',
        }}
      />
    );
  };


  // render inbox list and new conversation button
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
            //contentContainerStyle={styles.container}
            //ListHeaderComponent={{/* Your Header Component */ }}
            //ListFooterComponent={{/* Your Footer Component */ }}
            //scrollEventThrottle={250}
            data={this.state.conversationIds}
            keyExtractor={(item) => item._id}
            refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refreshConversationIds} // call getMessages
                />
            }
            ItemSeparatorComponent={this.separator}
            renderItem = {(item) => (
                <ListItem onPress={() => this.props.navigation.navigate('Chat', 
                  {
                    authToken: this.state.authToken,
                    spotifyId: this.state.spotifyId,
                    senderId: this.loadSenderId(item.item.members), 
                    senderName: this.loadSenderName(this.loadSenderId(item.item.members)), 
                    conversationId: item.item._id
                  })}>
                  <ChatPreview 
                    conversationId={item.item._id}
                    senderName={this.loadSenderName(this.loadSenderId(item.item.members))}
                  />
                </ListItem>
            )}
        /> 
        <FAB
          color='black'
          placement='right'
          onPress={() => 
            this.props.navigation.navigate('NewConversation', 
              {
                authToken: this.state.authToken, 
                spotifyID: this.state.spotifyId
              })}
          style={styles.fab}
          icon={<Icon name='new-message' type='entypo' color={'white'}/>}
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    fab: {
      position: 'absolute',
      bottom: 5,
      right: 5
    }
});


export default InboxComponent;