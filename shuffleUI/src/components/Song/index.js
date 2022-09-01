import React, {useCallback, useState, useRef} from 'react';

import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AnimatedImage = Animated.createAnimatedComponent(Image);
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontiso from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import TextTicker from 'react-native-text-ticker';
import {Popup} from '../PlaylistPopup/Popup';

const popuplist = [];

const Song = props => {
  let popupRef = React.createRef();

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  const {
    post,
    pauseFunction,
    playFunction,
    isPlaying,
    likeSongFunction,
    unlikeSongFunction,
    songURI,
  } = props;

  const isFocused = useIsFocused();

  if (!isFocused) {
    pauseFunction();
  }

  const doubleTapRef = useRef();

  var scaleHeart = useSharedValue(0);
  var scalePlay = useSharedValue(0);
  var scalePause = useSharedValue(0);

  let shareClicked = false;
  let addPlaylistClicked = false;
  let redirectClicked = false;

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{scale: Math.max(scaleHeart.value, 0)}],
  }));

  const pauseStyle = useAnimatedStyle(() => ({
    transform: [{scale: Math.max(scalePause.value, 0)}],
  }));

  const playStyle = useAnimatedStyle(() => ({
    transform: [{scale: Math.max(scalePlay.value, 0)}],
  }));

  var likedAlready = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken != null) {
        try {
          var checkLikedSongURL =
            'https://shufflesound.com/api/checkLiked/' +
            accessToken +
            '/' +
            songURI;
          const resp = await fetch(checkLikedSongURL);
          const json = await resp.json();

          if (json.liked == true) {
            return true;
          } else {
            return false;
          }
        } catch (err) {
          //invalid token
        }
      }
    } catch (e) {}
  };

  likedAlready().then(function (result) {
    if (result != isLiked) {
      setIsLiked(result);
    }
  });

  const [isLiked, setIsLiked] = useState(false);
  const [visualizerOn, setVisualizer] = useState(true);
  const [likedClicked, setLikeClicked] = useState(false);
  const [isPlayingSong, setIsPlayingSong] = useState(isPlaying());

  const onPlayPausePress = () => {
    if (isPlayingSong) {
      setVisualizer(true);
      playFunction();
      playAnimation();
      setIsPlayingSong(false);
    } else {
      setVisualizer(false);
      pauseFunction();
      pauseAnimation();
      setIsPlayingSong(true);
    }
  };

  const playAnimation = () => {
    scalePlay.value = withSequence(
      withSpring(1),
      withDelay(500, withSpring(0), {overshootClamping: true}),
    );
  };

  const pauseAnimation = () => {
    scalePause.value = withSequence(
      withSpring(1),
      withDelay(500, withSpring(0), {overshootClamping: true}),
    );
  };

  const likeAnimation = () => {
    setIsLiked(true);
    scaleHeart.value = withSequence(
      withSpring(1),
      withDelay(500, withSpring(0), {overshootClamping: true}),
    );
  };

  const onDoubleTap = useCallback(() => {
    likeAnimation();
    likeSongFunction(post.songURI);
  }, []);

  const resetButtonCheck = () => {
    setLikeClicked(false);
    shareClicked = false;
    addPlaylistClicked = false;
    redirectClicked = false;
  };

  //bad code warning - Couldnt get a logic thing to work so here we are
  const onSingleTap = () => {
    if (likedClicked) {
      resetButtonCheck();
      return;
    } else if (shareClicked) {
      resetButtonCheck();
      return;
    } else if (addPlaylistClicked) {
      resetButtonCheck();
      return;
    } else if (redirectClicked) {
      resetButtonCheck();
      return;
    }
    onPlayPausePress();
    resetButtonCheck();
  };

  const getPlaylists = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken != null) {
        const getPlaylistsFromServer = () => {
          const url =
            'https://shufflesound.com/api/getPlaylists/' + accessToken;
          return fetch(url)
            .then(response => response.json())
            .then(json => {
              popuplist.length = 0;
              json.forEach(playlists => {
                popuplist.push({
                  id: playlists.id,
                  title: playlists.name,
                });
              });
              popupRef.show();
              return json;
            })
            .catch(error => {
              console.error(error);
            });
        };
        getPlaylistsFromServer();
      } else {
      }
    } catch (e) {}
  };

  const likeSong = () => {
    setLikeClicked(true);
    if (isLiked) {
      unlikeSongFunction(post.songURI);
    } else {
      likeAnimation();
      //like song code
      likeSongFunction(post.songURI);
      //getAccessToken();
    }
  };

  const redirectSpotify = () => {
    redirectClicked = true;
    pauseFunction();
    Linking.openURL(post.songLink);
  };

  const addToPlaylist = () => {
    addPlaylistClicked = true;
    //fetch data
    //set popuplist
    getPlaylists();
  };

  const shareSong = () => {
    shareClicked = true;
    console.warn('share song');
  };

  return (
    <View style={styles.iconContainer}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          onSingleTap();
        }}>
        <TapGestureHandler
          maxDelayMS={200}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={() => {
            onDoubleTap();
          }}>
          <View>
            <Image
              style={styles.backgroundImage}
              source={{uri: post.albumArt}}
              blurRadius={15}></Image>
            <Image
              style={
                visualizerOn && post.songPreview.length > 0
                  ? styles.visualizerOn
                  : styles.visualizerOff
              }
              source={require('../../assets/gifs/equalizer.gif')}></Image>

            <Animated.View style={styles.alblumContainer}>
              <FastImage
                style={styles.icon}
                source={{
                  uri: (post.albumArt = post.albumArt),
                  priority: FastImage.priority.normal,
                }}
              />

              <AnimatedImage
                source={require('../../assets/images/heart.png')}
                style={[heartStyle, styles.popupIcons]}
                resizeMode={'center'}></AnimatedImage>

              <AnimatedImage
                source={require('../../assets/images/pause.png')}
                style={[pauseStyle, styles.popupIcons]}
                resizeMode={'center'}></AnimatedImage>

              <AnimatedImage
                source={require('../../assets/images/play.png')}
                style={[playStyle, styles.popupIcons]}
                resizeMode={'center'}></AnimatedImage>
            </Animated.View>

            <View style={styles.uiContainer}>
              <TouchableWithoutFeedback onPress={redirectSpotify}>
                <View style={styles.redirectContainer}>
                  <Image
                    style={styles.spotifyRedirect}
                    source={require('../../assets/images/spotifyLogoBlack.png')}></Image>
                  <Text style={styles.redirectText}>Play on Spotify</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.rightContainer}>
                <View style={styles.artistImageContainer}>
                  <TouchableWithoutFeedback onPress={likeSong}>
                    <View style={styles.rightIconsContainer}>
                      <AntDesign
                        name={isLiked ? 'heart' : 'hearto'}
                        size={40}
                        color={'white'}
                        style={styles.rightIcons}
                      />
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={addToPlaylist}>
                    <View style={styles.rightIconsContainer}>
                      <MaterialIcons
                        name={'playlist-add'}
                        size={40}
                        color="white"
                        style={styles.rightIcons}
                      />
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={shareSong}>
                    <View style={styles.rightIconsContainer}>
                      <Fontiso
                        name={'share-a'}
                        size={30}
                        color="white"
                        style={styles.rightIcons}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <View style={styles.songRow}>
                  <Text style={styles.artist}> {post.artist}</Text>
                </View>

                <View style={styles.songRow}>
                  <Entypo name={'beamed-note'} size={30} color="black" />

                  <TextTicker
                    style={styles.songName}
                    duration={5000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={1000}>
                    {post.songName}
                  </TextTicker>
                </View>
              </View>
            </View>
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
      <Popup
        ref={target => (popupRef = target)}
        onTouchOutside={onClosePopup}
        title="Your Playlists"
        data={popuplist}
        songURI={post.songURI}
        songName={post.songName}></Popup>
    </View>
  );
};

export default Song;
