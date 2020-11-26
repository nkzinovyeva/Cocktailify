import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, FlatList, ListItem } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from "react-native-gesture-handler";

export default function CoctailDetailsScreen({route}) {

    const coctailId = route.params;
    const [measurements, setMeas] = useState([]);
    const [ingredients, setIngr] = useState([]);
    
    const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + coctailId;
    const [cocktail, setCoctail] = useState({
        title: "",
        instructions: "",
        glass: "",
        picture: "",
        tag: "",
        category: ""
    });

    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((jsondata) => {
            setCoctail({
              title: jsondata.drinks[0].strDrink,
              instructions: jsondata.drinks[0].strInstructions,
              glass: jsondata.drinks[0].strGlass,
              picture: jsondata.drinks[0].strDrinkThumb,
              tag: jsondata.drinks[0].strIBA,
              category: jsondata.drinks[0].strCategory,
            });
            
            let obj = jsondata.drinks[0];
            for (let key in obj) {
                if (key.startsWith("strIngredient") && obj[key] !== null ) {
                    ingredients.push({name: obj[key]});
                }
            } 
            for (let key in obj) {
                 if (key.startsWith("strMeasure") && obj[key] !== null ) {
                    measurements.push({name: obj[key]});
                }
            }
            //receipt = ingredients.reduce((acc, n, i) => (ingredients[n] = measurements[i], acc), {})
            //console.log(receipt);
          })
          .catch((error) => console.log(error));
      }, []);
      
      const Item = ( {item} ) => {
        return (
              <View style={{alignItems:"center", flex:1}}>
                  <Text style={styles.text}>{item.name}</Text>
              </View>
        );
      };

      return (
        <ScrollView>
            <View style={styles.screen}>
                <ImageBackground source={{ uri: cocktail.picture }} style={styles.bgImage}>
                    <Text style={styles.title}>{cocktail.title}</Text>
                </ImageBackground>   
                <View style={styles.container}>
                    <Text style={styles.text}>{cocktail.instructions}</Text>
                </View>
                <Text style={styles.text}>Ingredients:</Text>
                <View style={styles.ingr}>
                    <FlatList style={styles.results}
                        data={ingredients} 
                        keyExtractor={(item) => item} 
                        renderItem={({item}) => <Item item = {item}/>} />
                    <FlatList style={styles.results}
                        data={measurements} 
                        keyExtractor={(item) => item} 
                        renderItem={({item}) => <Item item = {item}/>} />
                </View>   
            </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      ingr: {
        flexDirection: "row"
      },
        screen: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
      },
      text: {
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: 20,
        color: "gray",
      },
      bgImage: {
        width: "100%",
        height: 400,
        justifyContent: "flex-end",
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
      container: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
      },
    });

