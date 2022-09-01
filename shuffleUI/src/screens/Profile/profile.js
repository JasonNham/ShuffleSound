import React, {Component} from 'react';
import styles from './styles';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {acc} from 'react-native-reanimated';

const newPlaylists = [];

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken != null) {
      return accessToken;
    } else {
    }
  } catch (e) {}
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profileData: [],
      playlists: [],
      likedSongs: [],
      following: [],
      isPlaylist: true,
    };
  }

  async componentDidMount() {
    await Promise.all([this.loadProfileData(), this.loadPlaylistData()]);
    this.setState({loading: false});
  }

  loadProfileData = async () => {
    try {
      const accessToken = await getAccessToken();
      if (accessToken != null) {
        const url = 'https://shufflesound.com/api/profile/' + accessToken;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            //console.warn(json)
            //setTimeout(() => {
            this.setState({
              //loading: false,
              profileData: json,
            });
            //}, 2000);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  loadPlaylistData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken != null) {
        const getPlaylistsFromServer = () => {
          const url =
            'https://shufflesound.com/api/getPlaylists/' + accessToken;
          return fetch(url)
            .then(response => response.json())
            .then(json => {
              //console.warn(json)
              //newPlaylists.length = 0;
              json.forEach(playlist => {
                newPlaylists.push({
                  id: playlist.id,
                  title: playlist.name,
                  description:
                    playlist.description.length > 0
                      ? playlist.description
                      : 'No Description',
                  image:
                    playlist.images.length > 0
                      ? playlist.images[0]
                      : require('../../assets/images/profile.png'),
                  displayName: playlist.display_name,
                  tracks: playlist.tracks,
                });
              });
              this.setState({
                //loading: false,
                playlists: newPlaylists,
              });
              //console.warn(this.state.playlists);
            })
            .catch(error => {
              console.error(error);
            });
        };
        getPlaylistsFromServer();
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  // loadLikedSongsData = async () => {
  //   try {
  //     const accessToken = await getAccessToken();
  //     if(accessToken != null) {
  //       const url = 'https://api.spotify.com/v1/me/playlists/' + accessToken;
  //       return fetch(url)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.setState({playlists: json })
  //         })
  //         .catch( error => {
  //           console.log(error);
  //         })
  //     } else {

  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  render() {
    return (
      <View topLevel style={styles.container}>
        {this.state.loading && (
          <View style={styles.loadingContainer}>
            <Image source={require('../../assets/gifs/loadingGif.gif')}></Image>
          </View>
        )}
        {!this.state.loading && (
          <View profileContainer style={styles.profileContainer}>
            <View profileIcons style={styles.profileIcons}>
              <AntDesign
                name={'adduser'}
                size={40}
                color={'white'}
                style={styles.leftIcon}
              />
              <Entypo
                name={'menu'}
                size={40}
                color={'white'}
                style={styles.rightIcon}
              />
            </View>
            <View profileImageContainer style={styles.profileImageContainer}>
              <Image
                source={{
                  uri:
                    this.state.profileData.images.length > 0
                      ? this.state.profileData.images[0].url
                      : require('../../assets/images/profile.png'),
                }}
                style={styles.profileImage}></Image>
            </View>
            <View userName>
              <Text style={styles.userName}>
                {this.state.profileData.display_name}
              </Text>
            </View>
            <View profileInfo style={styles.profileInfo}>
              <View Friends>
                <Text style={styles.numberText}>63</Text>
                <Text style={styles.text}>Friends</Text>
              </View>
              <View Following>
                <Text style={styles.numberText}>143</Text>
                <Text style={styles.text}>Following</Text>
              </View>
              <View Followers>
                <Text style={styles.numberText}>
                  {this.state.profileData.followers.total}
                </Text>
                <Text style={styles.text}>Followers</Text>
              </View>
            </View>
            <View buttonsContainer style={styles.buttonContainer}>
              <Pressable>
                <Text style={styles.buttonStyle}> Playlists</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.buttonStyle}>Recently Liked</Text>
              </Pressable>
            </View>
          </View>
        )}
        {!this.state.loading && (
          <View playlistAndSongContainer style={styles.dataContainer}>
            <FlatList
              data={this.state.playlists}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View playlist style={styles.playlistStyle}>
                  <Image
                    style={styles.playlistImageStyle}
                    source={{
                      uri: item.image.url,
                    }}></Image>
                  <View playlistInfo>
                    <Text style={styles.playlistTitle}>{item.title}</Text>
                    <Text style={styles.playlistTracks}>
                      {item.tracks.total} songs
                    </Text>
                    <Text style={styles.playlistDescription} numberOfLines={1}>
                      {item.description.length > 45
                        ? item.description.substring(0, 42) + '...'
                        : item.description}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    );
  }
}

export default Profile;
