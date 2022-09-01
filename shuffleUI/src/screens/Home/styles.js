import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: Dimensions.get('window').height / 2,
  },
});
export default styles;
