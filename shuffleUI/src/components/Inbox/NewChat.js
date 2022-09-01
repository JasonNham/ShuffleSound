import React, { Component } from 'react';
import {SafeAreaView, Text} from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

class NewChat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search: '',
            filteredData: null,
            masterData: null ,
            spotifyID: null,
            authToken: null,
            conversationID: null
        };
    }

    componentDidMount() {
        this.setState({spotifyID: this.props.route.params.spotifyID, authToken: this.props.route.params.authToken}, () => this.setData())
    }

    setData = () => {
        const url = 'https://shufflesound.com/api/getUsers/' + this.state.authToken
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                var data = [];
                for(let i = 0; i < responseJson.length; i++) {
                    if(responseJson[i].spotifyID != this.state.spotifyID) {
                        data.push(responseJson[i])
                    }
                }
                //console.log(data)
                this.setState({filteredData: data})
                this.setState({masterData: data})
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    searchFilterFunction = (text) => {
        const masterData = this.state.masterData
        // Check if searched text is not blank
        if (text) {
          // Filter masterData
          // Update filteredData
          const newData = masterData.filter(function (item) {
            const itemData = item.display_name
              ? item.display_name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }).map(function({display_name, spotifyID}){
              return({display_name, spotifyID})
          });
          this.setState({filteredData: newData})
          this.updateSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterData
          this.setState({filteredData: masterData})
          this.updateSearch(text);
        }
    };

    updateSearch = (search) => {
        this.setState({ search: search });
    };

    postConversation = (receiverId, receiverName) => {
        //console.log(receiverId)
        const url = 'https://shufflesound.com/api/inbox/' + this.state.spotifyID + '/' + receiverId
        fetch(url, {
            method: 'POST',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({conversationID: responseJson._id}, () => this.navigateToChat(receiverId, receiverName));
        })
        .catch((error) => {
            console.error(error);
        });
    }

    navigateToChat = (receiverId, receiverName) => {
        this.props.navigation.navigate('Chat', 
            {
              authToken: this.state.authToken,
              spotifyId: this.state.spotifyID,
              senderId: receiverId, // receiver is considered the other sender
              senderName: receiverName, 
              conversationId: this.state.conversationID
            }
        );
    }

    createNewConversation = (receiverId, receiverName) => {
        this.postConversation(receiverId, receiverName);
    }

    emptyList() {
        return(
            <ListItem>
                <Text>
                    User not found
                </Text>
            </ListItem>
        );
    }

    renderItem = ({item}) => {
        return(
            <ListItem onPress={() => {this.createNewConversation(item.spotifyID, item.display_name)}}>
                <Text>
                {item.display_name}
            </Text>
            </ListItem>
        );
    }

    render() {
        const { search } = this.state;
        return (
            <SafeAreaView>
                <SearchBar
                    placeholder="Type recipient name here..."
                    onChangeText={(text) => this.searchFilterFunction(text)}
                    value={search}
                    containerStyle={{backgroundColor: 'white' }}
                    inputContainerStyle={{backgroundColor: 'white', height: 35, borderRadius: 5}}
                    inputStyle={{fontSize: 15}}
                    searchIcon={<Icon name='md-pencil' type='ionicon' color={'black'}/>}
                />
                <FlatList
                    data={this.state.filteredData}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.emptyList}
                />
            </SafeAreaView>
        );
    }
}

export default NewChat;