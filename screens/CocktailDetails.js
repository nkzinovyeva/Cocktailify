import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon} from 'react-native-elements';
import {firebaseConfig} from './keys.js';
import * as firebase from 'firebase';
import {keyapi} from './keys.js';


const config = firebaseConfig() ;
  
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default function CocktailDetailsScreen(props) {

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
                 if (key.startsWith("strMeasure") && obj[key] !== null ) {
                    measurements.push({name: obj[key]});
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
        firebase.database().ref("favourites/").push(
          {'id': item.id, 'title': item.title, 'pic': item.url}
        );
    };
    
    //Render Ingredients
    const ItemIngr = ( {item} ) => {
        return (
            <View style={styles.spirits}>
                <Pressable
                    onPress={() =>
                        props.navigation.push("Ingredient Details", item.name)
                    }>
                     <View>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>   
                </Pressable>
            </View>    
        );
    };

    //Render Measurements
    const ItemMeasure = ( {item} ) => {
        return (
            <View style={styles.measures}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
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
                <View style={styles.ingr}>
                    <FlatList
                        data={ingredients} 
                        keyExtractor={(item, index) => index} 
                        renderItem={({item}) => <ItemIngr item = {item}/>} />
                    <FlatList
                        data={measurements} 
                        keyExtractor={(item, index) => index} 
                        renderItem={({item}) => <ItemMeasure item = {item}/>}/>
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
        ingr: {
            flexDirection: "row",
        },
        spirits: {
            alignItems: 'center', 
            borderColor: 'gray', 
            borderStyle: 'dotted', 
            borderRadius: 10, 
            borderWidth: 1, 
            marginLeft: 15 
        },
        measures: {
            alignItems: 'flex-start', 
            borderColor: 'white', 
            borderStyle: 'dotted', 
            borderRadius: 5, 
            borderWidth: 1
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