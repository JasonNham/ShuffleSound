import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import genreData from '.././../../data/genres';
import styles from './styles';
import LoginScreen from '../Login/loginScreen';

class GenreSelect extends Component {
  state = {
    selectedItems: [],
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  render() {
    const {selectedItems} = this.state;

    return (
      <View>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>
            Select the genres you like to listen to.{'\n'} You can select
            multiple!
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.multiSelectContainer}>
            <MultiSelect
              items={genreData}
              uniqueKey="id"
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="   Select favorite Genres"
              searchInputPlaceholderText="Search Items..."
              tagRemoveIconColor="black"
              tagBorderColor="black"
              tagTextColor="black"
              selectedItemTextColor="grey"
              selectedItemIconColor="black"
              itemTextColor="black"
              displayKey="name"
              searchInputStyle={{color: 'black'}}
              submitButtonColor="black"
              submitButtonText="Done"
            />
          </View>
          <View>
            {this.multiSelect &&
              this.multiSelect.getSelectedItemsExt(selectedItems)}
          </View>
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            title="Next"
            color="white"
            style={styles.nextButton}
            onPress={() => {
              if (selectedItems.length > 0) {
                this.props.navigation.push('Login', {
                  selectedItems: this.state.selectedItems,
                });
              } else {
                alert('You must select at least one genre!');
              }
            }}
            component={LoginScreen}></Button>
        </View>
      </View>
    );
  }
}

export default GenreSelect;
