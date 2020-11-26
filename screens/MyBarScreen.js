
import {  Button} from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, FlatList, Image, Linking} from 'react-native';
import {keyapi} from './keys.js';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";


export default function MyBarScreen({ navigation }) {

  const [allIngr, setAllIngr] = useState([]);
  const key = keyapi();
  
  useEffect(() => {
    getAllIngr();
  }, []); 

  const getAllIngr = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list';
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
      setAllIngr(jsondata.drinks);
    })
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }

  const Item = ({ item }) => {
    const url = 'https://www.thecocktaildb.com/images/ingredients/' + item.strIngredient1 + '.png'
    return (
      <TouchableOpacity
        style={styles.grid}
        onPress={() =>
          props.navigation.navigate({
            routeName: "...",
            params: { ingredientName: item.strIngredient1 },
          })
        }
      >
      <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
        <Image source={{uri: url}}  style={{width:120, height:120, borderRadius:5}} />
          <View style={{alignItems:"center", flex:1}}>
              <Text style={{fontWeight:"bold"}}>{item.strIngredient1}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView>
      <View style={styles.screen} >
        <FlatList 
          style={styles.results}
          data={allIngr} 
          keyExtractor={item => item.id} 
          renderItem={({item}) => <Item item = {item}/>}
          numColumns={2} />  
        </View>
    </ScrollView> 
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
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
  title: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    padding: 10,
    margin: 5,
  },
  text: { 
    fontSize: 15, 
    fontFamily: "roboto"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "space-around",
    alignItems: "center",
  },
  input: {
    height: 45,
    borderColor: "grey",
    borderWidth: 1,
    width: 280,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    fontSize: 12,
  },
  //container: {
    //flex: 1,
    //backgroundColor: '#F7F7F7',
  //},
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
  }
});

  

 /* 


  //// search by ingredient + image 
  const [search, setSearch] = useState('');
  const [ingr, setIngr] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const getIngr = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?i=' + search;
    fetch(url)
    .then((response) => response.json())
    .then((jsondata) => { 
        setIngr(jsondata.ingredients[0]);
    })
    .then(setImageUrl('https://www.thecocktaildb.com/images/ingredients/' + search + '.png'))
    .catch((error) => { 
        Alert.alert('Error', error); 
    }); 
  }

  return (
    <View >
      <View>
        <Text > Please insert ingredients: </Text>
        <TextInput
          style={styles.textInput}
          value={search} 
          placeholder="vodka, gin, etc"
          onChangeText={(search) => setSearch(search)} />
        <Button title="Find" onPress={getIngr} />
        <View >
        <Image source={{uri: imageUrl}}  style={{width:100, height:100, borderRadius:5}} />
              <Text >{ingr.strIngredient}</Text>
              <Text >{ingr.strDescription}</Text>
        </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
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
  }
});
   */ 

/*  
<Image source={{uri: imageUrl}}  style={{width:60, height:60, borderRadius:5}} />

const getAllIngr = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list';
  fetch(url)
  .then((response) => response.json())
  .then((jsondata) => { 
      setAllIngr(jsondata.drinks);
  })
  .catch((error) => { 
      Alert.alert('Error', error); 
  }); 
}

const Item = ({ item }) => {
    const url = item.href
    return (
      <View style={styles.listItem}>
          <Image source={{uri:item.thumbnail}}  style={{width:60, height:60, borderRadius:5}} />
          <View style={{alignItems:"center",flex:1}}>
              <Text style={{fontWeight:"bold"}} onPress={() => Linking.openURL(url)}>{item.title}</Text>
          </View>
        </View>
    );
  }
  
  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>My bar screen</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </View>
      );

      <FlatList 
        style={styles.results}
        data={recipe} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => <Item item={item}/>} />  
      </View>  
}
*/