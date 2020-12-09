import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity, Pressable, Image, SafeAreaView } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import MyCarousel from '../components/Carousel_ingredient'
import { Button } from 'react-native-paper';
import MySearchBar from '../components/SearchBar';
import {firebaseConfig} from './keys.js';
import * as firebase from 'firebase';
import {keyapi} from './keys.js';

const config = firebaseConfig() ;
  
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default function MyBarScreen({ navigation }) {

  const [allIngr, setAllIngr] = useState([]);
  const [filteredIngr, setFilteredIngr] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [myBar, setMyBar] = useState([]);
  const [fullData, setFullData] = useState([]);
  const key = keyapi();

  // Load the full build.
  const _ = require("lodash");

  useEffect(() => {
    getAllIngr();
  }, []);

  //Set up DB and get all items
  useEffect(() => {
    let mounted = true;
    firebase
      .database()
      .ref("bar/")
      .on("value", (snapshot) => {
        if(mounted){
          const data = snapshot.val();
          if (data !== null) {
            const keys = Object.keys(data);
            const values = Object.values(data);
            const result = {};
            keys.forEach((key, i) => result[key] = values[i]);
            setMyBar(values);
            setFullData(result); 
        }} else {
          setMyBar([]);
          setFullData([]);
        }
        return () => mounted = false;
      });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Cocktailify", myBar)}>
          <Image 
            source={require('../components/cocktails.png')}
            //<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            style={{ width: 40, height: 40, marginRight: 20 }}/>
        </Pressable>
      ),
    });
  }, [navigation]);


  //Delete Item from My Bar
  const deleteData = (item) => {
    const key = _.findKey(fullData, item);
    firebase.database().ref("bar/").child(key).remove();
  };

  //Get all possible ingredients
  const getAllIngr = () => {
    const url = 'https://www.thecocktaildb.com/api/json/'+ key + '/list.php?i=list';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setAllIngr(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  };
  
  //Render Items 
  const Item = ({ item }) => {
    const url = 'https://www.thecocktaildb.com/images/ingredients/' + item.strIngredient1 + '.png'
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Ingredient Details", item.strIngredient1)
      }>
        <ListItem bottomDivider>
          <Avatar source={{uri:url}} />
          <ListItem.Content>
            <ListItem.Title>{item.strIngredient1}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }

  //search feature
  const search = (searchText) => {
    setSearchText(searchText);
  
    let filteredIngr = allIngr.filter(function (item) {
      return item.strIngredient1.includes(searchText);
    });
  
    setFilteredIngr(filteredIngr);
  };

  return (
    <SafeAreaView style={styles.screen}>
        <MySearchBar onChangeText={search} value={searchText} placeholder={'Search ingredients...'}/>
        <Text style={styles.header}>My bar</Text>
        {myBar.length === 0 &&
          <Text style={styles.replacement}>You haven't added anything to your Bar yet </Text>
        }
        <View style={{ flex: 1, flexDirection:'row' }}>
          <MyCarousel data = {myBar} navigation = {navigation} deleteData = {deleteData}/>
        </View>
        <Text style={styles.header}>Ingredients</Text>
        <View style={{ flex: 2}}>
          <FlatList 
              data={filteredIngr && filteredIngr.length > 0 ? filteredIngr : allIngr}
              keyExtractor={(item, index) => (item, index)} 
              renderItem={({item}) => <Item item = {item}/>}
              />  
        </View>
    </SafeAreaView> 
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor:'white',
  },
  header: { 
    color: "gray",
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: "left",
    fontWeight: "bold",
    padding: 10,
  },
  replacement: {
    color: "lightgray",
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: "center",
    fontWeight: "bold",
    margin:5
  }
});