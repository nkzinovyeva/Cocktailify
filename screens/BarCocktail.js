import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {firebaseConfig} from './keys.js';
import * as firebase from 'firebase';
import SelectMultiple from 'react-native-select-multiple';
import {keyapi} from './keys.js';


const config = firebaseConfig() ;
  
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default function BarCocktail({navigation}) {
  
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const key = keyapi();

  // Load the full build.
  const _ = require("lodash");

  useEffect(() => {
    firebase
        .database()
        .ref("bar/")
        .on("value", (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
              const values = Object.values(data);
              console.log(values);
              setItems(_.map(values, 'name'));
            } else {
              setItems([]);
            }
        });
  }, []);

  //Render Items for the checkbox
  const Item = ({item}) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.text}>
        <Text >{item}</Text>
      </View>
    </View>
    );
  };

  //Render Items 
  const ItemCoctail = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("Cocktail Details", item.idDrink)
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

  const getCoctails = () => {
    const values = Object.values(selected);
    const multiIngr = (_.map(values, 'value')).join();
    console.log(multiIngr)
    if (multiIngr.length > 0) {
      const url = 'https://www.thecocktaildb.com/api/json/' + key + '/filter.php?i=' + multiIngr;
      fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        if (jsondata.drinks !== "None Found") {
          setCocktails(jsondata.drinks);
      }})
      .then(setCocktails([]))
      .catch((error) => { 
          Alert.alert('Error', error); 
      });
    } else {
      setCocktails([]);
    }
  }

  //Selection handler
  const onSelectionsChange = (selected) => {
    setSelected(selected);
    console.log(selected)
  }

  //Button
  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>
          <Text style={styles.header} >My Bar</Text>
          {items.length === 0 &&
          <Text style={styles.replacement}>You haven't added anything to your Bar yet</Text>
          }
          <View>
            <SelectMultiple
              items={items}
              selectedItems={selected}
              renderLabel={(item) => <Item item = {item}/>}
              onSelectionsChange={onSelectionsChange}
            /> 
            <AppButton title="Cheers!" onPress={getCoctails}/>
          </View>
          {cocktails.length === 0 &&
            <Text style={styles.replacement}>No coctails found, try different combinations!</Text>
          }
          <View style={{ flex: 2, justifyContent: 'center', }}>
            <FlatList 
              data={cocktails}
              keyExtractor={(item, index) => index} 
              renderItem={({item}) => <ItemCoctail item = {item}/>}
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
    padding: 10
  },
  header: { 
    color: "gray",
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: "left",
    fontWeight: "bold",
    padding: 10
  },
  replacement: {
    color: "lightgray",
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: "center",
    fontWeight: "bold",
    margin:5
  },
  text: {
    color: "gray",
    marginHorizontal: 20,
},
appButtonContainer: {
  elevation: 15,
  backgroundColor: "tomato",
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  margin: 10,
},
appButtonText: {
  fontSize: 15,
  color: "#fff",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
}
});