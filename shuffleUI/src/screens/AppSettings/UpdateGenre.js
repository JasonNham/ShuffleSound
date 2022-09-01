import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import genreData from 'shuffleUI/data/genres.js'
import stylesUpdate from './stylesUpdate';
import LoginScreen from '../Login/loginScreen';

class UpdateGenre extends Component {
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
        <View style={stylesUpdate.welcomeTextContainer}>
          <Text style={stylesUpdate.welcomeText}>
            Select the genres you like to listen to.{'\n'} You can select
            multiple!
          </Text>
        </View>
        <View style={stylesUpdate.container}>
          <View style={stylesUpdate.multiSelectContainer}>
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
        <View style={stylesUpdate.nextButtonContainer}>
          <Button
            title="Next"
            color="white"
            style={stylesUpdate.nextButton}
            onPress={() => {
              if (selectedItems.length > 0) {
                this.props.navigation.push('Main', {
                  selectedItems: this.state.selectedItems,
                });
              } else {
                alert('You must select at least one genre!');
              }
            }}
            component={'Main'}></Button>
        </View>
      </View>
    );
  }
}

export default UpdateGenre;