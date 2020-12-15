import { SearchBar } from 'react-native-elements';
import React from 'react';

export default function MySearchBar(props) {
    return(
        <SearchBar
          round={true}
          lightTheme={true}
          placeholder={props.placeholder}
          autoCapitalize="words"
          containerStyle={{backgroundColor: 'white'}}
          inputContainerStyle = {{backgroundColor: 'tomato'}}
          inputStyle={{backgroundColor: 'white'}}
          searchIcon={{color: 'white'}}
          clearIcon={{color: 'white'}}
          autoCorrect={false}
          onChangeText={props.onChangeText}
          value={props.value}
        />
    )
}