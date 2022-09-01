import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Dimensions.get('window').height * 0.1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  multiSelectContainer: {
    height: Dimensions.get('window').height * 0.3,
    width: '80%',
  },
  nextButton: {
    backgroundColor: '#CCC',
    padding: 10,
    marginTop: 20,
    width: '80%',
    color: 'white',
  },
  nextButtonContainer: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height * 0.625,
    marginLeft: Dimensions.get('window').width * 0.1,
  },
  lowerContainer: {
    alignItems: 'center',
  },
  welcomeTextContainer: {
    marginTop: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});

export default styles;
