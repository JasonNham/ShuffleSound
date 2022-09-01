import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
    height: Dimensions.get('window').height - 48,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  icon: {
    position: 'absolute',
    top: Dimensions.get('window').height / 4 - 48,
    left: Dimensions.get('window').width / 4 - 48,
    width: 300,
    height: 300,
    //shadow
    borderWidth: 1,
    borderColor: 'black',
  },
  visualizerOn: {
    position: 'absolute',
    top: 500,
    left: 0,
    width: '65%',
    marginLeft: '17.5%',
    height: 450,
    transform: [{rotate: '-180deg'}],
  },
  visualizerOff: {
    position: 'absolute',
    top: 500,
    left: 0,
    width: '65%',
    marginLeft: '17.5%',
    height: 450,
    transform: [{rotate: '-180deg'}],
    opacity: 0,
  },
  redirectContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 4 - 48 - 45,
    left: Dimensions.get('window').width / 4 - 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 300,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  redirectText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  spotifyRedirect: {
    width: 25,
    height: 25,
    marginRight: 25,
  },
  uiContainer: {
    height: '98%',
    justifyContent: 'flex-end',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 80,
    height: 200,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
  },
  artist: {
    marginRight: 'auto',
    fontSize: 20,
    marginBottom: 5,
  },
  songName: {
    fontSize: 30,
    fontWeight: '600',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImageContainer: {
    padding: 5,
    alignItems: 'center',
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 20,
  },
  rightIconsContainer: {
    justifyContent: 'center',
    padding: 15,
    alignItems: 'center',
  },
  rightText: {
    marginTop: 5,
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
  },
  popupIcons: {
    top: 525,
    left: Dimensions.get('window').width / 2 - 50,
    width: 100,
    height: 100,
    position: 'absolute',
  },
  rightIcons: {
    //shadows
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // iOS
    shadowOffset: {
      width: 0, // These can't both be 0
      height: 1, // i.e. the shadow has to be offset in some way
    },
    // Android
    shadowOffset: {
      width: 0, // Same rules apply from above
      height: 1, // Can't both be 0
    },
  },
});

export default styles;
