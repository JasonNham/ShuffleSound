import React, {Component} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {List, ListItem, SearchBar, Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var track = new Sound();
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: [],
      refresh: false,
    };
  }

  handleSearch = text => {
    let formattedQuery = text.toLowerCase();
    formattedQuery = encodeURI(formattedQuery);

    const getSearchResults = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken != null) {
          if (formattedQuery.length > 0) {
            const getSearchResultsFromServer = () => {
              const url =
                'https://shufflesound.com/api/search/' +
                accessToken +
                '/' +
                formattedQuery;
              return fetch(url)
                .then(response => response.json())
                .then(json => {
                  let currentResults = [];
                  json.tracks.items.forEach(track => {
                    if (track.preview_url != null) {
                      const song = {
                        id: track.id,
                        title: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        image: track.album.images[0].url,
                        uri: track.uri,
                        songPreview: track.preview_url,
                      };
                      currentResults.push(song);
                    }
                  });
                  this.setState({
                    data: currentResults,
                    refresh: !this.state.refresh,
                  });
                  if (track.isPlaying()) {
                    track.stop();
                    track.release();
                  }
                  return json;
                })
                .catch(error => {
                  console.error(error);
                });
            };
            getSearchResultsFromServer();
          }
        } else {
          this.setState({
            data: [],
            refresh: !this.state.refresh,
          });
          if (track.isPlaying()) {
            track.stop();
            track.release();
          }
        }
      } catch (e) {
        console.log(e);
      }
      this.setState({
        refresh: !this.state.refresh,
      });
    };

    getSearchResults();

    this.setState({
      query: text,
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Song, Artist, Album"
        round
        onChangeText={this.handleSearch}
        value={this.state.query}
        onClear={() => {
          this.setState({
            query: '',
            data: [],
            refresh: !this.state.refresh,
          });
          if (track.isPlaying()) {
            track.stop();
            track.release();
          }
        }}
      />
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          extraData={this.state.refresh}
          renderItem={({item}) => (
            <ListItem
              onPress={() => {
                if (track.isPlaying()) {
                  track.stop();
                  track.release();
                }
                try {
                  track = new Sound(item.songPreview, null, error => {
                    if (error) {
                      console.warn('failed to load the sound', error);
                    } else {
                      track.play();
                    }
                  });
                } catch (e) {
                  console.warn(e);
                }
              }}>
              <Avatar source={{uri: item.image}} />
              <ListItem.Content>
                <ListItem.Title>{`${item.title}`}</ListItem.Title>
                <ListItem.Subtitle>{item.artist}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )}
          keyExtractor={item => item.uri}
          ListHeaderComponent={this.renderHeader}></FlatList>
      </SafeAreaView>
    );
  }
}

export default Search;
