import React, {Component} from 'react';
import styles from './styles';
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  AppState,
  Image,
} from 'react-native';
import Song from '../../components/Song';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
var currentSongs = [];
var currentSong = '';
var usedSongUris = [];
var positiveFeedback = new Set();

const updateAlgorithm = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken != null) {
      try {
        if (positiveFeedback.size > 0) {
          let songUris = '';
          positiveFeedback.forEach(function (songURI) {
            songUris += songURI + ',';
          });

          var updateAlgorithmURL =
            'https://shufflesound.com/api/updateUser/' +
            accessToken +
            '/' +
            songUris;
          const resp = await fetch(updateAlgorithmURL);
          const json = await resp.json();
        }
      } catch (err) {
        //invalid token
      }
    }
  } catch (e) {}
};

var track = new Sound();
track.setCategory('Playback');

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  minimumViewTime: 200,
};

const pause = function () {
  track.pause();
};

const play = function () {
  track.play();
};

const isPlaying = function () {
  return track.isPlaying();
};

const handleUserInteraction = function (songURI) {
  if (songURI != '') {
    positiveFeedback.add(songURI);
  }
};

const likeSong = function (songURI) {
  handleUserInteraction(songURI);
  const likeSong = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken != null) {
        try {
          var likeURL =
            'https://shufflesound.com/api/likeSong/' +
            accessToken +
            '/' +
            songURI;
          const resp = await fetch(likeURL);
          const json = await resp.json();
        } catch (err) {
          //invalid token
        }
      }
    } catch (e) {}
  };
  likeSong();
};

const unlikeSong = function (songURI) {
  const unlikeSong = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken != null) {
        try {
          var unlikeURL =
            'https://shufflesound.com/api/unlikeSong/' +
            accessToken +
            '/' +
            songURI;
          const resp = await fetch(unlikeURL);
          const json = await resp.json();
        } catch (err) {
          //invalid token
        }
      }
    } catch (e) {}
  };
  unlikeSong();
};

AppState.addEventListener('change', state => {
  if (state == 'background') {
    track.pause();
    updateAlgorithm();
  } else if (state == 'inactive') {
    track.pause();
    updateAlgorithm();
  } else if (state == 'active') {
    track.play();
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isFetching: false,
      activeTimerId: null,
      activeSeconds: 0,
      refreshing: false,
    };

    appState: AppState.currentState;
  }

  getSongs = async isPull => {
    if (isPull) {
      currentSongs = [];
    }
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken != null) {
        try {
          var getMusicURL =
            'https://shufflesound.com/api/getMusic/' + accessToken;
          const resp = await fetch(getMusicURL);
          const json = await resp.json();
          var tracks = json.tracks;
          tracks.forEach(track => {
            if (track.preview_url != null) {
              let newTrack = {
                artist: track.artists[0].name,
                songName: track.name,
                albumArt: track.album.images[0].url,
                songURI: track.uri,
                songPreview: track.preview_url,
                songLink: track.external_urls.spotify,
              };
              if (!usedSongUris.includes(track.uri)) {
                currentSongs.push(newTrack);
                usedSongUris.push(track.uri);
              }
            }
          });
          setTimeout(() => {
            this.setState({loading: false});
          }, 1000);
        } catch (err) {
          //invalid token
        }
      }
    } catch (e) {}
  };

  componentDidMount() {
    this.getSongs(false);
  }

  startActivityTimer = () => {
    if (!this.state.activeTimerId) {
      this.state.activeTimerId = setInterval(() => {
        this.state.activeSeconds++;
      }, 1000);
    }
  };
  stopTimer = () => {
    this.state.activeSeconds = 0;
  };

  onViewableItemsChanged = ({viewableItems}) => {
    // this is the number of seconds the user listened to the song
    if (this.state.activeSeconds > 6) {
      handleUserInteraction(currentSong);
    }
    this.stopTimer();
    this.startActivityTimer();
    track.stop();
    track.release();
    try {
      track = new Sound(viewableItems[0].item.songPreview, null, e => {
        if (e) {
        } else {
          track.play();
          currentSong = viewableItems[0].item.songURI;
          track.setNumberOfLoops(-1);
        }
      });
    } catch (e) {}
  };

  render() {
    return (
      <View>
        {this.state.loading && (
          <View style={styles.loadingContainer}>
            <Image source={require('../../assets/gifs/loadingGif.gif')}></Image>
          </View>
        )}
        {!this.state.loading && (
          <FlatList
            ref={this.props.scrollRef}
            data={currentSongs}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isFetching}
                onRefresh={() => {
                  this.setState({isFetching: true});
                  updateAlgorithm().then(() => {
                    this.getSongs(true).then(() => {
                      this.setState({isFetching: false});
                    });
                  });
                }}
                title="Pull to refresh"
                tintColor="black"
                titleColor="black"
              />
            }
            renderItem={({item}) => (
              <Song
                post={item}
                pauseFunction={pause}
                playFunction={play}
                isPlaying={isPlaying}
                likeSongFunction={likeSong}
                unlikeSongFunction={unlikeSong}
                songURI={item.songURI}
              />
            )}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            snapToInterval={Dimensions.get('window').height - 48}
            snapToAlignment={'start'}
            decelerationRate={'fast'}
            keyExtractor={item => item.songURI}
            refreshing={this.state.isFetching}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
            onEndReached={() => {
              this.setState({isFetching: true});
              updateAlgorithm().then(() => {
                getSongs(false).then(() => {
                  this.setState({isFetching: false});
                });
              });
            }}
            onEndReachedThreshold={1}
          />
        )}
      </View>
    );
  }
}

export default Home;
