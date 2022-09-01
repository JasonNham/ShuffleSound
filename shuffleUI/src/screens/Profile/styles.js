import {StyleSheet, Dimensions} from 'react-native';
import {withTheme} from 'react-native-elements';

const styles = StyleSheet.create({
  ////////////////////////Outer container style
  container: {
    flex: 1,
    backgroundColor: '#333842',
  },
  profileIcons: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  leftIcon: {
    flex: 3,
    marginTop: '12%',
    marginLeft: '10%',
  },

  rightIcon: {
    marginTop: '12%',
    marginRight: '10%',
  },

  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    // marginTop: "3%",
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },

  userName: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '5%',
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },

  ////////////////////////For friends, followers, and following
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },

  ////////////////////////Labels of friends, followers, and following
  text: {
    color: 'white',
    fontSize: 16,
    paddingLeft: '2%',
    paddingRight: '2%',
  },

  ////////////////////////For playlist and recently liked buttons
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyle: {
    color: 'white',
    paddingVertical: '10%',
    paddingLeft: '7%',
    paddingRight: '7%',
    fontSize: 18,
  },

  ////////////////////////Container for flatlisty
  dataContainer: {
    marginTop: '3%',
    flex: 0.6,
  },

  ////////////////////////Playlist styles
  playlistStyle: {
    flexDirection: 'row',
    marginLeft: '3%',
    marginTop: '3%',
  },

  playlistImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },

  playlistTitle: {
    marginLeft: '2%',
    fontSize: 16,
    color: 'white',
  },

  playlistTracks: {
    marginLeft: '2%',
    fontSize: 13,
    color: 'white',
  },

  playlistDescription: {
    marginLeft: '2%',
    fontSize: 12,
    color: '#A9B1BD',
    overflow: 'hidden',
    marginRight: '2%',
  },

  ////////////////////////End of my styles

  textCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'dimgrey',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileInfoContainer: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 25,
    fontWeight: '400',
    color: '#fff',
  },
  button: {
    marginTop: '5%',
    marginHorizontal: '5%',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'white',
    elevation: 5,
  },
  followerInfo: {
    marginTop: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  likedSongInfo: {
    marginTop: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
