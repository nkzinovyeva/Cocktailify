import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, SafeAreaView } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import {  Icon, ListItem, Avatar} from 'react-native-elements';
import UserContext from "../navigation/UserContext"
import * as firebase from 'firebase';
import {keyapi} from './keys.js';

export default function CocktailDetailsScreen({route, navigation}) {

  const user = React.useContext(UserContext);
  const ingrName = route.params;
  const key = keyapi();
  const [allCocktails, setAllCocktails] = useState([]);
  const url = "https://www.thecocktaildb.com/api/json/" + key + "/search.php?i=" + ingrName;
  const [ingredient, setIngredient] = useState({
        id: "",  
        title: "",
        description: "",
        abv: "",
        url: "."
  });
    
    //ingredient info
    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((jsondata) => {
            setIngredient({
              id: jsondata.ingredients[0].idIngredient,
              title: jsondata.ingredients[0].strIngredient,
              description: jsondata.ingredients[0].strDescription,
              abv: jsondata.ingredients[0].strABV,
              url: 'https://www.thecocktaildb.com/images/ingredients/' + jsondata.ingredients[0].strIngredient + '.png'
            });
          })
          .catch((error) => console.log(error));
    }, []);

    //available cocktails from the ingredient
    useEffect(() => {
        const url2 = 'https://www.thecocktaildb.com/api/json/' + key + '/filter.php?i=' + ingrName;
        fetch(url2)
        .then((response) => response.json())
        .then((jsondata) => { 
          setAllCocktails(jsondata.drinks);
        })
        .catch((error) => console.log(error));
    }, []);

    //Save ingredient to MyBar
    const saveMyBar = (item) => {
      firebase.database().ref("bar/" + user).push(
        {'id': item.id, 'name': item.title});
    };

    //Save ingredient to ShoppingList
    const saveToShop = (item) => {
      firebase.database().ref("shoppings/" + user).push(
        {'id': item.id, 'title': item.title, 'pic': item.url}
        );
    };

    //Render cocktails
    const Item = ({ item }) => {
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
    }
      
    return (
      <SafeAreaView style={styles.screen}>
        <View>
          <FlatList
              data={allCocktails}
              keyExtractor={(item) => item.idDrink} 
              renderItem={({item}) => <Item item = {item}/>}
              ListHeaderComponent={
                <View>
                  <ImageBackground source={{uri: ingredient.url}} style={styles.bgImage}>
                    <View style={styles.buttons}>
                      <Icon raised name='wine-bottle' type='font-awesome-5' color='tomato' size={30} onPress={() => {saveMyBar(ingredient)}} />
                      <Icon raised name='receipt' type='font-awesome-5' color='tomato' size={30} onPress={() => {saveToShop(ingredient)}} /> 
                    </View>
                    <Text style={styles.title}>{ingredient.title}</Text>
                  </ImageBackground>   
                  <View >
                    <Text style={styles.headers}>Strength: {ingredient.abv} %</Text>
                    <Text style={styles.headers} >Description:</Text>
                    <Text style={styles.text}>{ingredient.description}</Text>
                    <Text style={styles.headers}>Available cocktails:</Text>
                  </View>
                </View>
              } />
          </View>
      </SafeAreaView>
    );
  };
    
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white'
    },
    buttons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    bgImage: {
        width: "100%",
        height: 400,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: "center",
    },
    headers: {
        color: "tomato",
        fontSize: 20,
        fontWeight: "bold", 
        textAlign: "left",
        fontWeight: "bold",
        margin: 15
    },
    text: {
        fontSize: 18,
        marginHorizontal: 20,
        color: "gray",
    },
});