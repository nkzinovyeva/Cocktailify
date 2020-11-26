import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, Image, Linking, ImageBackground} from 'react-native';
import {  Button} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Input } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";



export default function CocktailsScreen({ navigation }) {
  
  const [allCocktails, setAllCocktails] = useState([]);
  const [popCocktails, setPopCocktails] = useState([]);
  const [name, setName] = useState('');
  const [randDocktails, setRandCocktails] = useState([]);
  const [cocktail, setCocktail] = useState([]);
  
  useEffect(() => {
    //getAllCocktails();
    getPopCocktails();
    getRandomCocktails();
  }, []); 

  
  // get all alco cocktails
  const getAllCocktails = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setAllCocktails(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }; 

// get pop cocktails
const getPopCocktails = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php';
  fetch(url)
  .then((response) => response.json())
  .then((jsondata) => { 
    setPopCocktails(jsondata.drinks);
  })
  .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
};

  //render all coctails
  const Item = ({ item }) => {
    const url = 'https://www.thecocktaildb.com/images/ingredients/' + item.strIngredient1 + '.png'
    return (
      <TouchableOpacity
        style={styles.grid}
        onPress={() =>
            navigation.navigate("CoctailDetails", item.idDrink)
        }
      >
      <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
        <Image source={{uri:item.strDrinkThumb}}  style={{width:120, height:120, marginTop:10, borderRadius:10}} />
          <View style={{alignItems:"center",flex:1}}>
              <Text style={styles.text}>{item.strDrink}</Text>
          </View>
        </View>
     </TouchableOpacity>
    );
  };

  // get 10 random cocktails for carousel
  const getRandomCocktails = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setRandCocktails(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  };

  //render 10 coctails in carousel
  const renderRandItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("CoctailDetails", item.idDrink) }
      >
        <View style={styles.carousel}>
            <Image source={{uri:item.strDrinkThumb}} style={styles.image}></Image>
            <Text style={styles.text}>{item.strDrink }</Text> 
        </View>
      </TouchableOpacity>
    );
  };

  //search by name
  const getCoctail = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=' + name;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setCocktails(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }

  return (
    <View style={{flex: 1, backgroundColor:'white', padding: 10, }} >
        <Text style={{color: "gray",
                        fontSize: 20,
                        fontWeight: "bold", 
                        textAlign: "left",
                        fontWeight: "bold",
                      }} 
          >Random cocktails</Text>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <Carousel layout={'default'}
                      ref={(c) => {_carousel = c; }}
                      data={randDocktails}
                      loop={true}
                      renderItem={renderRandItem}
                      sliderWidth={350}
                      itemWidth={140}/>
        </View>
        <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "flex-start" }}>
          <Input placeholder='BASIC INPUT' value={name} 
          placeholder="find your cocktail" 
          onChangeText={(name) => setName(name)}/>
        <Button title="Find" onPress={getCoctail} />
        <Button title="Cancel" onPress={getAllCocktails} />
        </View>
        
        <View style={{ flex: 2,  }}>
          <Text style={{color: "gray",
                        fontSize: 20,
                        fontWeight: "bold", 
                        textAlign: "left",
                        fontWeight: "bold",
                      }} 
          >Now in trends</Text>
          <FlatList //style={styles.results}
                    data={popCocktails} 
                    keyExtractor={item => item.idDrink} 
                    renderItem={({item}) => <Item item = {item}/>}
                    numColumns={2} />  
        </View>
        
    </View> 
  );
}

const styles = StyleSheet.create({
  //container: {
    //flex: 1,
    //backgroundColor: '#F7F7F7',
  //},
  grid: {
    margin: 10,
    height: 150,
    width: 150,
    shadowColor: "black",
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    fontSize: 18,
    width: 300,
    margin: 10,
    alignSelf: "center",
    backgroundColor:"#FFEFD5",
  },
  bigBlue: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: 10,
  },
  listItem:{
    margin:5,
    padding:5,
    backgroundColor:"#FFF",
    width:"90%",
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },
  carousel: {
    backgroundColor: 'white',
    borderRadius: 5,
    //height: 250,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  image: { 
    width:120, 
    height:120, 
    borderRadius: 20, 
    overlayColor: "tomato",  
    opacity: 0.8, 
    resizeMode: "cover", 
},
text: {
  color: "gray",
  fontSize: 14,
  fontWeight: "bold", 
  textAlign: "left",
}
});  
  
  /*
  
  return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Coctails screen</Text>
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
            />
          </View>
        );
  } 
  */
  