import React, { useState, useEffect} from 'react';
import { Alert, StyleSheet, Text, View, Pressable} from 'react-native';
import { Icon } from 'react-native-elements'
import UserContext from "../navigation/UserContext"
import MyCarousel from '../components/Carousel_cocktail';
import {keyapi} from './keys.js';
import * as firebase from 'firebase';

export default function CocktailsScreen({navigation}) {

  const user = React.useContext(UserContext);

  const [latestCocktails, setLatestCocktails] = useState([]);
  const [popCocktails, setPopCocktails] = useState([]);
  const [randCocktails, setRandCocktails] = useState([]);
  const key = keyapi(); 
  
  useEffect(() => {
    getRandomCocktails();
    getPopCocktails();
    getLatestCocktails();
  }, []); 

  const logoff = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        firebase.database().ref().off();
        console.log('Sign-out successful');
      })
  }

  //header component
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={logoff}>
          <Icon name='sign-out-alt' type='font-awesome-5' color ='white' marginRight={20}/>
        </Pressable>
      ),
    });
  }, [navigation]);


  // get 10 random cocktails for carousel
  const getRandomCocktails = () => {
    const url = 'https://www.thecocktaildb.com/api/json/'+ key + '/randomselection.php';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setRandCocktails(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  };

// get popular cocktails
  const getPopCocktails = () => {
    const url = 'https://www.thecocktaildb.com/api/json/'+ key + '/popular.php';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setPopCocktails(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  };

  // get latest cocktails
  const getLatestCocktails = () => {
    const url = 'https://www.thecocktaildb.com/api/json/'+ key + '/latest.php';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setLatestCocktails(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  };

return (
    <View style={styles.screen}>
        <Text style={styles.text}>Random cocktails</Text>
          <MyCarousel data = {randCocktails} navigation= {navigation}/>
        <Text style={styles.text}>Now in trends</Text>
          <MyCarousel data = {popCocktails} navigation= {navigation}/>
        <Text style={styles.text}>Latest cocktails</Text>
          <MyCarousel data = {latestCocktails} navigation= {navigation}/>  
    </View> 
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor:'white',
    padding: 10
  },
  text: {
    color: "tomato",
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: "left",
    fontWeight: "bold",
},
});  