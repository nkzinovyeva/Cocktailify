import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem } from 'react-native-elements';
import { Icon} from 'react-native-elements';
import UserContext from "../navigation/UserContext";
import * as firebase from 'firebase';
import {keyapi} from './keys.js';


export default function CocktailDetailsScreen(props) {
    
    // Load the full build.
  const _ = require("lodash");

    const user = React.useContext(UserContext);
    const cocktailId = props.route.params;
    const key = keyapi();
    const [measurements, setMeas] = useState([]);
    const [ingredients, setIngr] = useState([]);
    const url = "https://www.thecocktaildb.com/api/json/" + key + "/lookup.php?i=" + cocktailId;
    const [cocktail, setCocktail] = useState({
        title: "",
        instructions: "",
        glass: "",
        url: ".",
        category: "",
        type: "",
        id: ""
    });

    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((jsondata) => {
            let obj = jsondata.drinks[0];
            for (let key in obj) {
                if (key.startsWith("strIngredient") && obj[key] !== null && obj[key].length > 0) {
                    ingredients.push({name: obj[key]});
                }
            } 
            for (let key in obj) {
                 if (key.startsWith("strMeasure") && obj[key] !== null && obj[key].length > 0 ) {
                    measurements.push({dose: obj[key]});
                }
            }
            setCocktail({
              title: obj.strDrink,
              instructions: obj.strInstructions,
              glass: obj.strGlass,
              url: obj.strDrinkThumb,
              category: obj.strCategory,
              type: obj.strAlcoholic,
              id: obj.idDrink,
            });
          })
          .catch((error) => console.log(error));
    }, []);

    //Save cocktail to Favorites
    const saveToFav = (item) => {
        firebase.database().ref("favourites/" + user).push(
          {'id': item.id, 'title': item.title, 'pic': item.url}
        );
    };
    
    //Render Ingredients
    const ItemIngr = ( {item} ) => {
        return (
            <View >
                <Pressable
                    onPress={() =>
                        props.navigation.push("Ingredient Details", item.name)
                    }>
                    <ListItem>
                        <ListItem.Content>
                        <ListItem.Subtitle style={styles.ingr}>{item.name}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>    
                </Pressable>
            </View>    
        );
    };

    //Render Measurements
    const ItemMeasure = ( {item} ) => {
        return (
            <ListItem >
              <ListItem.Content>
                <ListItem.Subtitle style={styles.ingr}>{item.dose}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
        );
    };

    return (
        <ScrollView style={styles.screen} >
            <ImageBackground source={{ uri: cocktail.url }} style={styles.bgImage}>
                <View style={styles.buttons}> 
                    <Icon
                        raised
                        name='star' 
                        type='font-awesome-5' 
                        color='tomato' 
                        size={30} 
                        onPress={() => {saveToFav(cocktail)}} /> 
                </View>
                <Text style={styles.title}>{cocktail.title}</Text>
            </ImageBackground> 
            <View>
                <Text style={styles.headers}>Ingredients and servings:</Text>
                <View style={styles.servings}>
                    <FlatList 
                        style={{width: '40%'}}
                        data={measurements} 
                        keyExtractor={(item, index) => item+index} 
                        renderItem={({item}) => <ItemMeasure  item = {item}/>}/>
                    <FlatList 
                        style={{width: '60%'}}
                        data={ingredients} 
                        keyExtractor={(item, index) => item+index} 
                        renderItem={({item}) => <ItemIngr item = {item}/>} />   
                </View> 
                <Text style={styles.headers}>How to mix:</Text>
                <Text style={styles.text}>{cocktail.instructions}</Text>
                <Text style={styles.headers}>Serving glass:</Text>
                <Text style={styles.text}>{cocktail.glass}</Text>
                <Text style={styles.headers}>Tags:</Text>
                <Text style={styles.text}>{cocktail.category}, {cocktail.type}</Text>
            </View>
        </ScrollView>
    );
};
    
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
    },
    buttons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'flex-end'
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
    servings: {
        flexDirection: "row",
    },
    ingr: {
        fontSize: 14,
        color: "gray",
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
        color: "gray",
        marginHorizontal: 20,
    },
});