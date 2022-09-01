import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import React, {Component} from 'react';

const deviceHeight = Dimensions.get('window').height;
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => this.setState({show: true});

  close = () => this.setState({show: false});

  renderOutsideTouchable(onTouch) {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  renderTitle = () => {
    const {title} = this.props;
    return (
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 15,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  renderContent = () => {
    const {data} = this.props;
    return (
      <View>
        <FlatList
          style={{marginBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        />
      </View>
    );
  };

  renderItem = ({item}) => {
    const {songURI} = this.props;
    const {songName} = this.props;
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            const addThroughServer = async () => {
              try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken != null) {
                  const url =
                    'https://shufflesound.com/api/addToPlaylist/' +
                    accessToken +
                    '/' +
                    item.id +
                    '/' +
                    songURI;

                  Alert.alert(
                    'Added \n"' +
                      songName +
                      '" \nto your \n' +
                      item.title +
                      ' playlist',
                    '',
                    [{text: 'OK', onPress: () => this.setState({show: false})}],
                  );
                  fetch(url);
                  return accessToken;
                } else {
                }
              } catch (e) {
                console.log(e);
              }
            };
            addThroughServer();
          }}>
          <Text style={styles.playlistTitle}>{item.title}</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderSeparator = () => {
    <View
      style={{
        opacity: 0.1,
        backgroundColor: '#182F44',
        height: 1,
      }}></View>;
  };

  render() {
    let {show} = this.state;
    const {onTouchOutside, title} = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={this.close}>
        <View style={styles.container}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.4,
              shadowRadius: 10,
              shadowOpacity: 0.3,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}>
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}
