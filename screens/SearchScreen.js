import React, { useState, useEffect } from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import { Alert, StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import {keyapi} from './keys.js';
import MySearchBar from '../components/SearchBar'


export default function SearchScreen({navigation}) {

  const [allCocktails, setAllCocktails] = useState([]);
  const [filteredcocktails, setFilteredCocktails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const key = keyapi();
 
  useEffect(() => {
    getAllCocktails();
  }, []); 

  // get all alco cocktails
  const getAllCocktails = () => {
    const url = 'https://www.thecocktaildb.com/api/json/'+ key + '/filter.php?a=Alcoholic';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setAllCocktails(jsondata.drinks);
      setFilteredCocktails(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }; 

  //search feature
  const search = (searchText) => {
    setSearchText(searchText);
  
    let filteredcocktails = allCocktails.filter(function (item) {
      return item.strDrink.includes(searchText);
    });
    setFilteredCocktails(filteredcocktails);
  };

  //Render Items 
  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Cocktail Details", item.idDrink)
      }
      >
        <ListItem bottomDivider>
          <Avatar source={{uri: item.strDrinkThumb}} />
          <ListItem.Content>
            <ListItem.Title>{item.strDrink}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <MySearchBar onChangeText={search} value={searchText} placeholder={'Search by name...'}/>
        <View style={{ flex: 2}}>
          <FlatList 
            data={filteredcocktails && filteredcocktails.length > 0 ? filteredcocktails : allCocktails}
            keyExtractor={(item, index) => item + index} 
            renderItem={({item}) => <Item item = {item}/>}
            />  
        </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: 'white',
  },
});